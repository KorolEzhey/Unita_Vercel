import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { getGradeClass } from "@/shared/lib/getGradeClass";

import s from "./GenericGradeTable.module.scss";

type GenericGradeTableProps<T> = {
    data: T[];
    columns: any[];
    selectedClass: string;
    extraHeaders?: React.ReactNode;
    store: { tableData: T[]; setTableData: (data: T[]) => void };
    t: (key: string) => string;
};

export const GenericGradeTable = observer(
    <T extends { grades: any[] }>({
        data,
        columns,
        selectedClass: _selectedClass,
        extraHeaders,
        store,
        t,
    }: GenericGradeTableProps<T>) => {
        useEffect(() => {
            store.setTableData(data);
        }, [data, store]);

        const table = useReactTable({
            data: store.tableData,
            columns,
            getCoreRowModel: getCoreRowModel(),
        });

        return (
            <table className={s.table}>
                <thead>
                    {extraHeaders}
                    <tr>
                        <th className={clsx(s.indexColumn, s.sticky1)}>№</th>
                        <th className={clsx(s.nameColumn, s.sticky2)}>
                            {t("full-name")}
                        </th>
                        <th className={clsx(s.averageColumn, s.sticky3)}>
                            {t("average")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {table.getRowModel().rows?.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                let grade: number | undefined;
                                if (cell.column.id.startsWith("week-")) {
                                    const week = Number(
                                        cell.column.id.replace("week-", "")
                                    );
                                    grade = row.original.grades.find(
                                        (g) => g.week === week
                                    )?.grade;
                                } else if (
                                    cell.column.id.startsWith("subject-")
                                ) {
                                    const subject = cell.column.id.replace(
                                        "subject-",
                                        ""
                                    );
                                    grade = row.original.grades.find(
                                        (g) => g.subject === subject
                                    )?.grade;
                                }

                                return (
                                    <td
                                        key={cell.id}
                                        className={clsx(
                                            s.cell,
                                            cell.column.id ===
                                                "studentName" && [
                                                s.cellLeft,
                                                s.sticky2,
                                            ],
                                            cell.column.id ===
                                                "avarageScore" && [
                                                s.cellBold,
                                                s.sticky3,
                                            ],
                                            cell.column.id === "index" &&
                                                s.sticky1,
                                            s[getGradeClass(grade) as string]
                                        )}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    )) || null}
                </tbody>
            </table>
        );
    }
);
