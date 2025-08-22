import { createColumnHelper, type Row } from "@tanstack/react-table";

import type { ClassResponse } from "@/entities/class";
import Trash from "@/shared/icons/Trash.svg";

import { handleClassNameUpdate, handleDeleteClass } from "../model/handlers";
import s from "./ClassesTable.module.scss";

const columnHelper = createColumnHelper<ClassResponse>();

export const getColumns = (t: (key: string) => string) => [
    columnHelper.accessor("name", {
        header: t("dive_table.class"),
        cell: ({ row }: { row: Row<ClassResponse> }) => {
            const { handleKeyDown } = handleClassNameUpdate(
                row.original.classId,
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
        cell: ({ row }: { row: Row<ClassResponse> }) => (
            <button
                className={s.actionCell}
                type="button"
                onClick={() => handleDeleteClass(row.original.classId)}
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
