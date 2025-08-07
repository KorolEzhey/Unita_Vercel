import s from "./GradeFinalTable.module.scss";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FinalGrade } from "../model/types";
import { getColumns } from "./columns";
import { getGradeClass } from "@/shared/lib/getGradeClass";
import { observer } from "mobx-react-lite";
import { gradeFinalStore } from "../model/gradeFinalStore";

type GradeFinalTableProps = {
    data: FinalGrade[];
    subjects: string[];
    selectedClass: string;
};

export const GradeFinalTable: FC<GradeFinalTableProps> = observer(
    ({ data, subjects, selectedClass }) => {
        const t = useTranslations("dive_table");

        useEffect(() => {
            gradeFinalStore.setTableData(data);
        }, [data]);

        const table = useReactTable({
            data: gradeFinalStore.tableData,
            columns: getColumns(
                subjects,
                gradeFinalStore.updateGrade.bind(gradeFinalStore),
                t
            ),
            getCoreRowModel: getCoreRowModel(),
        });

        return (
            <table className={s.table}>
                <thead>
                    <tr>
                        <th colSpan={2} rowSpan={1} className={s.classHeader}>
                            {t("class")}: {selectedClass}
                        </th>
                        <th colSpan={1}></th>
                        {subjects.map((subject) => (
                            <th
                                key={subject}
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

                                if (cell.column.id.startsWith("subject-")) {
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
