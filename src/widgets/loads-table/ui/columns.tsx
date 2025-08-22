import { createColumnHelper, type Row } from "@tanstack/react-table";

import Trash from "@/shared/icons/Trash.svg";

import type { Load } from "../model/types";
import s from "./LoadsTable.module.scss";

const columnHelper = createColumnHelper<Load>();

export const getColumns = (
    t: (key: string) => string,
    onDelete: (load: Load) => void
) => [
    columnHelper.accessor("teacherName", {
        header: t("roles.teacher"),
        cell: ({ row }: { row: Row<Load> }) => row.original.teacherName,
    }),
    columnHelper.accessor("fileName", {
        header: t("dive_table.file"),
        cell: ({ row }: { row: Row<Load> }) => (
            <div className={s.file}>{row.original.fileName}</div>
        ),
    }),
    columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }: { row: Row<Load> }) => (
            <button
                type="button"
                className={s.actionCell}
                onClick={() => onDelete(row.original)}
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
