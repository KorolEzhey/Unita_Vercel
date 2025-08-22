import toast from "react-hot-toast";
import { errorToastStyle, successToastStyle } from "toastConfig";
import z from "zod";

import { type NewSubject, subjectStore } from "@/entities/subject";
import { KEY_NAMES } from "@/shared/lib/constants";

export const subjectNameSchema = z.string().nonempty("Заполните поле предмет");

export const handleSubjectNameUpdate = (id: number, originalValue: string) => {
    const save = async (value: string) => {
        const result = subjectNameSchema.safeParse(value.trim());
        if (!result.success) {
            toast.error(result.error.issues[0].message, errorToastStyle);
            return;
        }
        if (value.trim() !== originalValue.trim()) {
            try {
                await subjectStore.updateSubjectName(id, value.trim());
                toast.success(
                    "Название предмета успешно обновлено",
                    successToastStyle
                );
            } catch (error) {
                toast.error(subjectStore.error, errorToastStyle);
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

export const handleDeleteSubject = async (id: number) => {
    try {
        await subjectStore.deleteSubject(id);
        toast.success("Предмет успешно удален", successToastStyle);
    } catch (error) {
        toast.error(subjectStore.error, errorToastStyle);
    }
};

export const handleAddSubject = async (
    newSubject: NewSubject,
    onSuccess?: () => void
) => {
    const result = subjectNameSchema.safeParse(newSubject.name);
    if (!result.success) {
        toast.error(result.error.issues[0].message, errorToastStyle);
        return;
    }

    try {
        await subjectStore.addSubject({
            ...newSubject,
            name: newSubject.name.trim(),
        });
        toast.success("Предмет успешно добавлен", successToastStyle);
        onSuccess?.();
    } catch (error) {
        toast.error(subjectStore.error, errorToastStyle);
    }
};
