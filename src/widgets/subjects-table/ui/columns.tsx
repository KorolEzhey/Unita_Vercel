import { createColumnHelper, type Row } from "@tanstack/react-table";

import type { SubjectResponse } from "@/entities/subject";
import Trash from "@/shared/icons/Trash.svg";

import {
    handleDeleteSubject,
    handleSubjectNameUpdate,
} from "../model/handlers";
import s from "./SubjectsTable.module.scss";

const columnHelper = createColumnHelper<SubjectResponse>();

export const getColumns = (t: (key: string) => string) => [
    columnHelper.accessor("name", {
        header: t("dive_table.subject"),
        cell: ({ row }: { row: Row<SubjectResponse> }) => {
            const { handleKeyDown } = handleSubjectNameUpdate(
                row.original.subjectId,
                row.original.name
            );
            return (
                <input
                    className={s.input}
                    defaultValue={row.original.name}
                    onKeyDown={handleKeyDown}
                />
            );
        },
    }),
    columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }: { row: Row<SubjectResponse> }) => (
            <button
                className={s.actionCell}
                type="button"
                onClick={() => handleDeleteSubject(row.original.subjectId)}
            >
                <Trash />
            </button>
        ),
    }),
    columnHelper.display({
        id: "separator",
        header: "",
        cell: () => null,
    }),
];
