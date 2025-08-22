import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { type FC } from "react";

import {
    type DiveTableData,
    type DiveTableRow,
    GRADE_THRESHOLDS,
} from "@/shared/lib/constants";

import styles from "./DiveTable.module.scss";

const getGradeClass = (grade: number) => {
    if (grade === -1) return ""; // Не применяем стили к прочеркам
    if (grade < GRADE_THRESHOLDS.UNSATISFACTORY) return styles["grade-red"];
    if (grade < GRADE_THRESHOLDS.SATISFACTORY) return styles["grade-orange"];
    if (grade < GRADE_THRESHOLDS.GOOD) return styles["grade-yellow"];
    return styles["grade-green"];
};

const columnHelper = createColumnHelper<DiveTableRow>();

type DiveTableProps = {
    data: DiveTableData;
    isFinalMode?: boolean;
};

export const DiveTable: FC<DiveTableProps> = ({
    data,
    isFinalMode = false,
}) => {
    const t = useTranslations("dive_table");

    const columns = [
        columnHelper.accessor("week", {
            header: isFinalMode ? "Модуль" : t("week"),
            size: isFinalMode ? 151 : undefined, // В режиме итога фиксированная ширина как у предмета
        }),
        ...(isFinalMode
            ? []
            : [
                  columnHelper.accessor("subject", {
                      header: t("subject"),
                  }),
              ]),
        columnHelper.accessor("mark", {
            header: isFinalMode ? "Балл" : t("mark"),
            size: 51, // Фиксированная ширина как в других таблицах
            cell: (info) => {
                const value = info.getValue();
                const displayValue = value === -1 ? "-" : value;
                return (
                    <span className={clsx(styles.mark)}>{displayValue}</span>
                );
            },
        }),
        // В режиме итога добавляем пустой столбец для растягивания
        ...(isFinalMode
            ? [
                  columnHelper.accessor("actions", {
                      header: "",
                      size: 0, // 0 означает "занять всё доступное пространство"
                  }),
              ]
            : [
                  columnHelper.accessor("actions", {
                      header: "",
                  }),
              ]),
    ];

    const calculateAverageGrade = () => {
        const grades = data
            .map((row) => row.mark)
            .filter((grade) => typeof grade === "number" && grade >= 0);
        if (grades.length === 0) return 0;
        return (
            Math.round(
                (grades.reduce((a, b) => a + b, 0) / grades.length) * 10
            ) / 10
        );
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const averageGrade = calculateAverageGrade();

    return (
        <table className={styles.table}>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className={styles.header}>
                        {headerGroup.headers.map((header, _index) => {
                            let headerClassName = "";
                            if (isFinalMode) {
                                if (header.column.id === "week") {
                                    headerClassName = styles["module-header"];
                                } else if (header.column.id === "mark") {
                                    headerClassName = styles["score-header"];
                                }
                            } else {
                                if (header.column.id === "week") {
                                    headerClassName = styles["week-header"];
                                }
                            }
                            return (
                                <th key={header.id} className={headerClassName}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className={styles.row}>
                        {row.getVisibleCells().map((cell) => {
                            const isMark = cell.column.id === "mark";
                            const isWeek = cell.column.id === "week";
                            const cellValue = cell.getValue() as number;

                            let className = "";

                            if (isMark) {
                                className = clsx(
                                    getGradeClass(cellValue),
                                    isFinalMode && styles["score-cell"]
                                );
                            } else if (isWeek && isFinalMode) {
                                // В режиме итога первая колонка содержит названия модулей
                                className = styles["module-name"];
                            }

                            return (
                                <td key={cell.id} className={className}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                <tr className={clsx(styles.row, styles["average-row"])}>
                    <td className={isFinalMode ? styles["module-name"] : ""}>
                        {t("average")}
                    </td>
                    {!isFinalMode && <td />}
                    <td
                        className={clsx(
                            getGradeClass(averageGrade),
                            isFinalMode && styles["score-cell"]
                        )}
                    >
                        {averageGrade}
                    </td>
                    <td />
                </tr>
            </tbody>
        </table>
    );
};
