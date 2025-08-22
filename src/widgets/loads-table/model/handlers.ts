import toast from "react-hot-toast";
import { errorToastStyle, successToastStyle } from "toastConfig";
import z from "zod";

import { fileStore } from "@/entities/file/model/fileStore";

const addLoadSchema = z.object({
    teacherId: z.number({
        message: "Выберите преподавателя",
    }),
    file: z
        .instanceof(File, { message: "Выберите файл" })
        .refine((f) => f.size > 0, "Файл не должен быть пустым"),
});

export const handleLoadAdd = async (
    params: { teacherId: number; file: File | null },
    onSuccess?: () => void
) => {
    const result = addLoadSchema.safeParse({
        teacherId: params.teacherId,
        file: params.file,
    });

    if (!result.success) {
        toast.error(result.error.issues[0].message, errorToastStyle);
        return;
    }

    try {
        await fileStore.uploadTeacherFileById(
            result.data.teacherId,
            result.data.file
        );
        toast.success("Нагрузка успешно загружена", successToastStyle);
        onSuccess?.();
    } catch (_error) {
        console.error("Ошибка при создании нагрузки:", _error);
        throw _error;
    }
};

export const handleLoadDelete = async (fileName: string) => {
    try {
        await fileStore.deleteFile(fileName);
        toast.success("Файл успешно удален", successToastStyle);
    } catch (_error) {
        console.error("Ошибка при обновлении нагрузки:", _error);
        throw _error;
    }
};
