import toast from "react-hot-toast";
import { errorToastStyle, successToastStyle } from "toastConfig";
import z from "zod";

import { type NewStudent, studentStore } from "@/entities/student";
import { type NewTeacher, teacherStore } from "@/entities/teacher";
import { KEY_NAMES } from "@/shared/lib/constants";

export const loginSchema = z
    .string()
    .nonempty("Заполните поле логин")
    .min(3, "Логин слишком короткий (минимум 3 символа)")
    .max(20, "Логин слишком длинный (максимум 20 символов)")
    .regex(
        /^[A-Za-z\d@$!%*#?&.]+$/,
        "Логин может содержать латинские буквы, цифры и спецсимволы (@$!%*#?&.)"
    );

export const passwordSchema = z
    .string()
    .nonempty("Заполните поле пароль")
    .min(6, "Пароль слишком короткий (минимум 6 символов)")
    .max(30, "Пароль слишком длинный (максимум 30 символов)")
    .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
        "Пароль должен содержать латинские буквы, минимум одну цифру, и может содержать спецсимволы (@$!%*#?&)"
    );

export const newStudentSchema = z.object({
    login: loginSchema,
    password: passwordSchema,
    fullName: z.string().nonempty("Заполните поле ФИО"),
    classId: z.number("Выберите класс"),
});

export const newTeacherSchema = z.object({
    login: loginSchema,
    password: passwordSchema,
    fullName: z.string().nonempty("Заполните поле ФИО"),
});

export const handleFullNameUpdate = (
    id: number,
    originalValue: string,
    updateFn: (id: number, value: string) => Promise<void>,
    errorMessage: string | null
) => {
    const save = async (value: string) => {
        if (!value) {
            toast.error("Поле не должно быть пустым", errorToastStyle);
            return;
        }
        if (value.trim() !== originalValue.trim()) {
            try {
                await updateFn(id, value.trim());
                toast.success("Имя успешно обновлено", successToastStyle);
            } catch (error) {
                toast.error(errorMessage, errorToastStyle);
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

export const handleClassChange = (studentId: number, originalValue: number) => {
    const handleChange = async (newClassId: number) => {
        if (newClassId !== originalValue) {
            try {
                await studentStore.updateStudentClass(studentId, newClassId);
                toast.success(
                    "Класс ученика успешно обновлен",
                    successToastStyle
                );
            } catch (error) {
                toast.error(studentStore.error, errorToastStyle);
            }
        }
    };

    return { handleChange };
};

export const handleLoginUpdate = (
    id: number,
    originalValue: string,
    updateFn: (id: number, value: string) => Promise<void>,
    errorMessage: string | null
) => {
    const save = async (value: string) => {
        const result = loginSchema.safeParse(value.trim());
        if (!result.success) {
            toast.error(result.error.issues[0].message, errorToastStyle);
            return;
        }
        if (value.trim() !== originalValue.trim()) {
            try {
                await updateFn(id, value.trim());
                toast.success("Логин успешно обновлен", successToastStyle);
            } catch (error) {
                toast.error(errorMessage, errorToastStyle);
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

export const handlePasswordUpdate = (
    id: number,
    updateFn: (id: number, value: string) => Promise<void>,
    errorMessage: string | null
) => {
    const save = async (value: string) => {
        const result = passwordSchema.safeParse(value.trim());
        if (!result.success) {
            toast.error(result.error.issues[0].message, errorToastStyle);
            return;
        }
        try {
            await updateFn(id, value.trim());
            toast.success("Пароль успешно обновлен", successToastStyle);
        } catch (error) {
            toast.error(errorMessage, errorToastStyle);
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

export const handleDelete = async (
    id: number,
    deleteFn: (id: number) => Promise<void>,
    errorMessage: string | null
) => {
    try {
        await deleteFn(id);
        toast.success("Удаление прошло успешно", successToastStyle);
    } catch (error) {
        toast.error(errorMessage, errorToastStyle);
    }
};

export const handleStudentAdd = async (
    newStudent: NewStudent,
    onSuccess?: () => void
) => {
    const result = newStudentSchema.safeParse(newStudent);
    if (!result.success) {
        toast.error(result.error.issues[0].message, errorToastStyle);
        return;
    }

    try {
        await studentStore.addStudent({
            ...newStudent,
            login: newStudent.login.trim(),
            password: newStudent.password.trim(),
            fullName: newStudent.fullName.trim(),
        });
        toast.success("Ученик успешно добавлен", successToastStyle);
        onSuccess?.();
    } catch (error) {
        toast.error(studentStore.error, errorToastStyle);
    }
};

export const handleTeacherAdd = async (
    newTeacher: NewTeacher,
    onSuccess?: () => void
) => {
    const result = newTeacherSchema.safeParse(newTeacher);
    if (!result.success) {
        toast.error(result.error.issues[0].message, errorToastStyle);
        return;
    }

    try {
        await teacherStore.addTeacher({
            ...newTeacher,
            login: newTeacher.login.trim(),
            password: newTeacher.password.trim(),
            fullName: newTeacher.fullName.trim(),
        });
        toast.success("Учитель успешно добавлен", successToastStyle);
        onSuccess?.();
    } catch (error) {
        toast.error(teacherStore.error, errorToastStyle);
    }
};
