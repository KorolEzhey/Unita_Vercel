import { createColumnHelper, type Row } from "@tanstack/react-table";

import Trash from "@/shared/icons/Trash.svg";

import type { Plan } from "../model/types";
import s from "./PlansTable.module.scss";

const columnHelper = createColumnHelper<Plan>();

export const getColumns = (
    t: (key: string) => string,
    onDelete: (plan: Plan) => void
) => [
    columnHelper.accessor("className", {
        header: t("dive_table.class"),
        cell: ({ row }: { row: Row<Plan> }) => row.original.className,
    }),
    columnHelper.accessor("fileName", {
        header: t("dive_table.file"),
        cell: ({ row }: { row: Row<Plan> }) => (
            <div className={s.file}>{row.original.fileName}</div>
        ),
    }),
    columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }: { row: Row<Plan> }) => (
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
