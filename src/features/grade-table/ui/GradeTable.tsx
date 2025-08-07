import s from "./GradeTable.module.scss";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getColumns } from "./columns";
import { Grade } from "../model/types";
import { getGradeClass } from "@/shared/lib/getGradeClass";
import { observer } from "mobx-react-lite";
import { gradeStore } from "../model/gradeStore";

type GradeTableProps = {
    data: Grade[];
    subjectsByWeek: { week: number; subject: string }[];
    selectedClass: string;
};

export const GradeTable: FC<GradeTableProps> = observer(
    ({ data, subjectsByWeek, selectedClass }) => {
        const t = useTranslations("dive_table");

        useEffect(() => {
            gradeStore.setTableData(data);
        }, [data]);

        const table = useReactTable({
            data: gradeStore.tableData,
            columns: getColumns(
                subjectsByWeek,
                gradeStore.updateGrade.bind(gradeStore),
                t
            ),
            getCoreRowModel: getCoreRowModel(),
        });

        return (
            <table className={s.table}>
                <thead>
                    <tr>
                        <th colSpan={2} rowSpan={2} className={s.classHeader}>
                            {t("class")}: {selectedClass}
                        </th>
                        <th colSpan={1} className={s.weekNumber}>
                            {t("week")}
                        </th>
                        {subjectsByWeek.map(({ week }) => (
                            <th key={week} className={s.weekHeader}>
                                {week}
                            </th>
                        ))}
                    </tr>

                    <tr>
                        <th colSpan={1}></th>
                        {subjectsByWeek.map(({ week, subject }) => (
                            <th
                                key={`subject-${week}`}
                                rowSpan={2}
                                className={s.subjectHeader}
                            >
                                {subject}
                            </th>
                        ))}
                    </tr>

                    <tr>
                        <th className={s.indexColumn}>№</th>
                        <th className={s.nameColumn}>{t("full-name")}</th>
                        <th className={s.averageColumn}>{t("average")}</th>
                    </tr>
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                let grade: number | undefined;

                                if (cell.column.id.startsWith("week-")) {
                                    const week = Number(
                                        cell.column.id.replace("week-", "")
                                    );
                                    grade = row.original.grades.find(
                                        (g: { week: number; grade: number }) =>
                                            g.week === week
                                    )?.grade;
                                }

                                return (
                                    <td
                                        key={cell.id}
                                        className={clsx(
                                            s.cell,
                                            {
                                                [s.cellLeft]:
                                                    cell.column.id ===
                                                    "studentName",
                                                [s.cellBold]:
                                                    cell.column.id ===
                                                    "avarageScore",
                                            },
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
                    ))}
                </tbody>
            </table>
        );
    }
);
