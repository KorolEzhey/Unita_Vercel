import { z } from "zod";

import { diveStore } from "@/entities/dive";
import { moduleStore } from "@/entities/module";

import type { DiveFormData, ModuleFormData } from "./types";

const diveSchema = z.object({
    name: z.string().min(1, "Название обязательно"),
    startTime: z.string().min(1, "Время начала обязательно"),
    endTime: z.string().min(1, "Время окончания обязательно"),
    subjectID: z.number().min(1, "Предмет обязателен"),
});

const moduleSchema = z.object({
    name: z.string().min(1, "Название модуля обязательно"),
    classID: z.number().min(1, "Класс обязателен"),
    dives: z
        .array(diveSchema)
        .length(5, "Модуль должен содержать ровно 5 дайвов"),
});

export const handleModuleCreate = async (
    params: ModuleFormData,
    onSuccess?: () => void
) => {
    const result = moduleSchema.safeParse(params);
    if (!result.success) {
        throw new Error(result.error.issues[0]?.message || "Ошибка валидации");
    }

    // Создаем модуль
    const _createdModule = await moduleStore.createModule({
        name: params.name,
        classID: params.classID,
    });

    // Создаем дайвы для этого модуля через обычный API дайвов
    for (const dive of params.dives) {
        try {
            await diveStore.createDive(dive);
        } catch (error) {
            console.error("Ошибка создания дайва:", error);
            throw error;
        }
    }

    onSuccess?.();
};

export const handleModuleDelete = async (
    moduleId: number,
    onSuccess?: () => void
) => {
    try {
        // Сначала получаем модуль, чтобы узнать его дайвы
        const moduleData = moduleStore.modules.find(
            (m) => m.moduleID === moduleId
        );

        if (moduleData?.dives) {
            // Удаляем все дайвы модуля
            console.log(
                `Удаляем ${moduleData.dives.length} дайвов модуля ${moduleId}`
            );
            for (const dive of moduleData.dives) {
                try {
                    await diveStore.deleteDive(dive.diveID);
                    console.log(`Дайв ${dive.diveID} удален`);
                } catch (error) {
                    console.error(
                        `Ошибка удаления дайва ${dive.diveID}:`,
                        error
                    );
                    // Продолжаем удаление других дайвов
                }
            }
        }

        // Теперь удаляем сам модуль
        await moduleStore.deleteModule(moduleId);
        console.log(`Модуль ${moduleId} удален`);

        onSuccess?.();
    } catch (error) {
        console.error("Ошибка удаления модуля:", error);
        throw error;
    }
};

export const handleDiveUpdate = async (
    diveId: number,
    data: Partial<DiveFormData>,
    onSuccess?: () => void
) => {
    await diveStore.updateDive(diveId, data);
    onSuccess?.();
};

export const handleDiveDelete = async (
    diveId: number,
    onSuccess?: () => void
) => {
    await diveStore.deleteDive(diveId);
    onSuccess?.();
};
