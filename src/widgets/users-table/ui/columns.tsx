import { createColumnHelper, type Row } from "@tanstack/react-table";

import type { ClassResponse } from "@/entities/class";
import { type StudentResponse, studentStore } from "@/entities/student";
import { type TeacherResponse, teacherStore } from "@/entities/teacher";
import Trash from "@/shared/icons/Trash.svg";
import { Select as SelectClass } from "@/shared/ui/select";

import {
    handleClassChange,
    handleDelete,
    handleFullNameUpdate,
    handleLoginUpdate,
    handlePasswordUpdate,
} from "../model/handlers";
import s from "./UsersTable.module.scss";

type TeacherOrStudent = StudentResponse | TeacherResponse;

const columnHelper = createColumnHelper<TeacherOrStudent>();

function isStudent(row: TeacherOrStudent): row is StudentResponse {
    return "studentId" in row;
}

export const getColumns = (
    t: (key: string) => string,
    classes?: ClassResponse[],
    isStudentsTable?: boolean
) => [
    columnHelper.display({
        id: "index",
        header: "№",
        cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("login", {
        header: t("auth.login"),
        cell: ({ row }) => {
            const { handleKeyDown } = isStudent(row.original)
                ? handleLoginUpdate(
                      row.original.studentId,
                      row.original.login,
                      (id, value) => studentStore.updateStudentLogin(id, value),
                      studentStore.error
                  )
                : handleLoginUpdate(
                      row.original.teacherId,
                      row.original.login,
                      (id, value) => teacherStore.updateTeacherLogin(id, value),
                      teacherStore.error
                  );
            return (
                <input
                    className={s.input}
                    defaultValue={row.original.login}
                    onKeyDown={handleKeyDown}
                />
            );
        },
    }),
    columnHelper.display({
        id: "password",
        header: t("auth.password"),
        cell: ({ row }) => {
            const { handleKeyDown } = isStudent(row.original)
                ? handlePasswordUpdate(
                      row.original.studentId,
                      (id, value) =>
                          studentStore.updateStudentPassword(id, value),
                      studentStore.error
                  )
                : handlePasswordUpdate(
                      row.original.teacherId,
                      (id, value) =>
                          teacherStore.updateTeacherPassword(id, value),
                      teacherStore.error
                  );
            return (
                <input
                    className={s.input}
                    defaultValue="******"
                    onKeyDown={handleKeyDown}
                />
            );
        },
    }),
    columnHelper.accessor("fullName", {
        header: t("dive_table.full-name"),
        cell: ({ row }) => {
            const { handleKeyDown } = isStudent(row.original)
                ? handleFullNameUpdate(
                      row.original.studentId,
                      row.original.fullName,
                      (id, value) =>
                          studentStore.updateStudentFullName(id, value),
                      studentStore.error
                  )
                : handleFullNameUpdate(
                      row.original.teacherId,
                      row.original.fullName,
                      (id, value) =>
                          teacherStore.updateTeacherFullName(id, value),
                      teacherStore.error
                  );
            return (
                <input
                    className={s.input}
                    defaultValue={row.original.fullName}
                    onKeyDown={handleKeyDown}
                />
            );
        },
    }),
    ...(isStudentsTable && classes
        ? [
              columnHelper.accessor("className", {
                  header: t("dive_table.class"),
                  cell: ({ row }: { row: Row<TeacherOrStudent> }) => {
                      if (isStudent(row.original)) {
                          const { handleChange } = handleClassChange(
                              row.original.studentId,
                              row.original.classId
                          );
                          return (
                              <SelectClass
                                  selected={row.original.classId}
                                  setSelected={handleChange}
                                  array={classes}
                                  variant="table"
                                  getLabel={(cls) => cls.name}
                                  getValue={(cls) => cls.classId}
                              />
                          );
                      }
                      return null;
                  },
              }),
          ]
        : []),
    columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => {
            const onClick = () => {
                if (isStudent(row.original)) {
                    handleDelete(
                        row.original.studentId,
                        (id) => studentStore.deleteStudent(id),
                        studentStore.error
                    );
                } else {
                    handleDelete(
                        row.original.teacherId,
                        (id) => teacherStore.deleteTeacher(id),
                        teacherStore.error
                    );
                }
            };
            return (
                <button
                    type="button"
                    onClick={onClick}
                    className={s.actionCell}
                >
                    <Trash />
                </button>
            );
        },
    }),
    columnHelper.display({
        id: "separator",
        header: "",
        cell: () => null,
    }),
];
