import { parse } from "date-fns";
import type { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { errorToastStyle, successToastStyle } from "toastConfig";
import z from "zod";

import type { NewLesson } from "@/entities/lesson";
import { lessonStore } from "@/entities/lesson/model/lesson.store";

export const newLessonSchema = z.object({
    classID: z.number().min(1, "Выберите класс"),
    subjectID: z.number().min(1, "Выберите предмет"),
    teacherID: z.number().min(1, "Выберите учителя"),
    startTime: z.string().nonempty("Заполните поле начальное время"),
    endTime: z.string().nonempty("Заполните поле конечное время"),
});

export const handleSubmit = async (
    onClose: () => void,
    lessonForm: ReturnType<typeof useForm<NewLesson>>,
    dateRef: React.RefObject<HTMLInputElement> | null,
    startTimeRef: React.RefObject<HTMLInputElement> | null,
    endTimeRef: React.RefObject<HTMLInputElement> | null,
    lessonID?: number,
    selectedTeacher?: number
) => {
    const dateStr = dateRef!.current?.value;
    const startTimeStr = startTimeRef!.current?.value;
    const endTimeStr = endTimeRef!.current?.value;

    if (!dateStr) {
        toast.error("Заполните поле дата", errorToastStyle);
        return;
    } else if (!startTimeStr) {
        toast.error("Заполните поле начальное время", errorToastStyle);
        return;
    } else if (!endTimeStr) {
        toast.error("Заполните поле конечное время", errorToastStyle);
        return;
    }

    const startDate = parse(
        `${dateStr} ${startTimeStr}`,
        "yyyy-MM-dd HH:mm",
        new Date()
    );
    const endDate = parse(
        `${dateStr} ${endTimeStr}`,
        "yyyy-MM-dd HH:mm",
        new Date()
    );

    lessonForm.setValue("startTime", startDate.toISOString());
    lessonForm.setValue("endTime", endDate.toISOString());
    if (selectedTeacher) {
        lessonForm.setValue("teacherID", selectedTeacher);
    }

    const result = newLessonSchema.safeParse(lessonForm.getValues());
    if (!result.success) {
        toast.error(result.error.issues[0].message, errorToastStyle);
        console.log(result.error.issues);
        return;
    }

    try {
        if (lessonID) {
            await lessonStore.updateLessonbyAdmin(
                lessonID,
                lessonForm.getValues()
            );
            onClose();
            toast.success("Урок успешно обновлен", successToastStyle);
        } else {
            await lessonStore.addLesson(lessonForm.getValues());
            onClose();
            toast.success("Урок успешно добавлен", successToastStyle);
        }
    } catch (_error) {
        console.error("Ошибка при создании урока:", _error);
        throw _error;
    }
};

export const handleDelete = async (lessonID: number) => {
    try {
        await lessonStore.deleteLesson(lessonID);
        toast.success("Урок успешно удален", successToastStyle);
    } catch (_error) {
        console.error("Ошибка при удалении урока:", _error);
        throw _error;
    }
};

export const handleUpdateLessonByTeacher = async (
    onClose: () => void,
    lessonForm: ReturnType<typeof useForm<NewLesson>>,
    lessonID: number
) => {
    try {
        await lessonStore.updateLessonbyTeacher(
            lessonID,
            lessonForm.getValues("theme"),
            lessonForm.getValues("description")
        );
        onClose();
        toast.success("Урок успешно обновлен", successToastStyle);
    } catch (_error) {
        console.error("Ошибка при обновлении урока:", _error);
        throw _error;
    }
};
