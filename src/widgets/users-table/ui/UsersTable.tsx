import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

import type { ClassResponse } from "@/entities/class";
import type { NewStudent, StudentResponse } from "@/entities/student";
import type { NewTeacher, TeacherResponse } from "@/entities/teacher";
import Plus from "@/shared/icons/Plus.svg";
import { Select as SelectClass } from "@/shared/ui/select";
import { Table } from "@/shared/ui/table";

import { handleStudentAdd, handleTeacherAdd } from "../model/handlers";
import { getColumns } from "./columns";
import s from "./UsersTable.module.scss";

type TeacherOrStudent = StudentResponse | TeacherResponse;

type Props = {
    data: TeacherOrStudent[];
    classes?: ClassResponse[];
    isStudentsTable?: boolean;
};

export const UsersTable = ({ data, classes, isStudentsTable }: Props) => {
    const studentForm = useForm<NewStudent>({
        defaultValues: {
            login: "",
            password: "",
            fullName: "",
            classId: classes?.[0]?.classId ?? 0,
        },
    });

    const teacherForm = useForm<NewTeacher>({
        defaultValues: {
            login: "",
            password: "",
            fullName: "",
        },
    });

    const onClick = () =>
        (isStudentsTable
            ? studentForm.handleSubmit((data) =>
                  handleStudentAdd(data, () => studentForm.reset())
              )
            : teacherForm.handleSubmit((data) =>
                  handleTeacherAdd(data, () => teacherForm.reset())
              ))();

    const headerClasses: Record<string, string> = {
        index: s.index,
        login: s.login,
        password: s.password,
        fullName: s.fullName,
        className: s.className,
        actions: s.action,
    };
    const t = useTranslations();

    return (
        <Table
            data={data}
            columns={getColumns(t, classes, isStudentsTable)}
            headerClassName={(id) => headerClasses[id] ?? ""}
            cellClassName={(id) => (id === "index" ? s.indexCell : "")}
            renderExtraRowTop={() => (
                <tr className={s.line}>
                    <td />
                    <td>
                        <input
                            placeholder="Login"
                            className={s.input}
                            autoComplete="off"
                            {...(isStudentsTable
                                ? studentForm.register("login")
                                : teacherForm.register("login"))}
                        />
                    </td>
                    <td>
                        <input
                            placeholder="Password"
                            className={s.input}
                            {...(isStudentsTable
                                ? studentForm.register("password")
                                : teacherForm.register("password"))}
                        />
                    </td>
                    <td>
                        <input
                            placeholder="Full name"
                            className={s.input}
                            {...(isStudentsTable
                                ? studentForm.register("fullName")
                                : teacherForm.register("fullName"))}
                        />
                    </td>
                    {isStudentsTable && classes && (
                        <td>
                            <SelectClass
                                selected={studentForm.watch("classId")}
                                setSelected={(val) =>
                                    studentForm.setValue("classId", val)
                                }
                                array={classes}
                                variant="table"
                                getLabel={(item) => item.name}
                                getValue={(item) => item.classId}
                            />
                        </td>
                    )}
                    <td>
                        <button
                            type="button"
                            className={s.actionCell}
                            onClick={onClick}
                        >
                            <Plus />
                        </button>
                    </td>
                    <td />
                </tr>
            )}
            renderEmptyRow
        />
    );
};
