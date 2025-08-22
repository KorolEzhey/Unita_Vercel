import toast from "react-hot-toast";
import { errorToastStyle, successToastStyle } from "toastConfig";
import z from "zod";

import { classStore, type NewClass } from "@/entities/class";
import { KEY_NAMES } from "@/shared/lib/constants";

export const classNameSchema = z
    .string()
    .nonempty("Заполните поле класс")
    .max(32, "Название класса слишком длинное (максимум 32 символа)");

export const handleClassNameUpdate = (id: number, originalValue: string) => {
    const save = async (value: string) => {
        const result = classNameSchema.safeParse(value.trim());
        if (!result.success) {
            toast.error(result.error.issues[0].message, errorToastStyle);
            return;
        }
        if (value.trim() !== originalValue.trim()) {
            try {
                await classStore.updateClassName(id, value.trim());
                toast.success(
                    "Название класса успешно обновлено",
                    successToastStyle
                );
            } catch (_error) {
                console.error("Ошибка при обновлении класса:", _error);
                throw _error;
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KEY_NAMES.ENTER) {
            save((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).blur();
        }
    };

    return { handleKeyDown };
};

export const handleDeleteClass = async (id: number) => {
    try {
        await classStore.deleteClass(id);
        toast.success("Класс успешно удален", successToastStyle);
    } catch (_error) {
        console.error("Ошибка при удалении класса:", _error);
        throw _error;
    }
};

export const handleAddClass = async (
    newClass: NewClass,
    onSuccess?: () => void
) => {
    const result = classNameSchema.safeParse(newClass.name);
    if (!result.success) {
        toast.error(result.error.issues[0].message, errorToastStyle);
        return;
    }

    try {
        await classStore.addClass({
            ...newClass,
            name: newClass.name.trim(),
        });
        toast.success("Класс успешно добавлен", successToastStyle);
        onSuccess?.();
    } catch (_error) {
        console.error("Ошибка при создании класса:", _error);
        throw _error;
    }
};
