import toast from "react-hot-toast";
import { errorToastStyle, successToastStyle } from "toastConfig";
import z from "zod";

import { fileStore } from "@/entities/file/model/fileStore";

const addPlanSchema = z.object({
    classId: z.number({
        message: "Выберите класс",
    }),
    file: z
        .instanceof(File, { message: "Выберите файл" })
        .refine((f) => f.size > 0, "Файл не должен быть пустым"),
});

export const handlePlanAdd = async (
    params: { classId: number; file: File | null },
    onSuccess?: () => void
) => {
    const result = addPlanSchema.safeParse({
        classId: params.classId,
        file: params.file,
    });

    if (!result.success) {
        toast.error(result.error.issues[0].message, errorToastStyle);
        return;
    }

    try {
        await fileStore.uploadClassFile(result.data.classId, result.data.file);
        toast.success("План успешно загружен", successToastStyle);
        onSuccess?.();
    } catch (error) {
        toast.error("Не удалось загрузить план", errorToastStyle);
    }
};

export const handlePlanDelete = async (fileName: string) => {
    try {
        await fileStore.deleteFile(fileName);
        toast.success("Файл успешно удален", successToastStyle);
    } catch (_error) {
        toast.error("Не удалось удалить файл", errorToastStyle);
    }
};
