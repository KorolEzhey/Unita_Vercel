import clsx from "clsx";
import { useTranslations } from "next-intl";
import React from "react";

import s from "./AttendanceTable.module.scss";
import { getMonthsMap } from "./utils";

type Props = {
    subjectsByDay: {
        date: Date;
        subjects: { subject: string; hours: number }[];
    }[];
    selectedClass: string;
};

export const TableHeader: React.FC<Props> = ({
    subjectsByDay,
    selectedClass,
}) => {
    const t = useTranslations("dive_table");
    const m = useTranslations("calendar.months.long");

    const monthsMap = getMonthsMap(subjectsByDay, m);

    return (
        <>
            <tr>
                <th
                    colSpan={2}
                    rowSpan={4}
                    className={clsx(s.classHeader, s.sticky1)}
                >
                    {t("class")}: {selectedClass}
                </th>
                <th
                    colSpan={1}
                    style={{ borderRight: "none" }}
                    className={s.sticky3}
                />
                {Array.from(monthsMap.entries()).map(([month, { cells }]) =>
                    cells.map((cell, index) => (
                        <th
                            key={`${month}-${index}`}
                            colSpan={cell.colspan}
                            className={
                                cell.isLabel
                                    ? clsx(s.month, s.sticky4)
                                    : undefined
                            }
                            style={{ borderRight: "none" }}
                        >
                            {cell.isLabel && <span>{cell.name}</span>}
                        </th>
                    ))
                )}
            </tr>

            <tr>
                <th colSpan={1} className={clsx(s.dateColumn, s.stickyDate)}>
                    {t("date")}
                </th>
                {subjectsByDay.map((day) => (
                    <th
                        key={day.date.toISOString()}
                        colSpan={day.subjects.length}
                        className={s.date}
                    >
                        <span>{day.date.getDate()}</span>
                    </th>
                ))}
            </tr>

            <tr>
                <th colSpan={1} className={clsx(s.subjectColumn, s.sticky3)}>
                    {t("lesson")}
                </th>
                {subjectsByDay.map((day, dayIndex) =>
                    day.subjects.map((_, subjectIndex) => (
                        <th
                            key={`${dayIndex}-${subjectIndex}`}
                            className={clsx(s.subjectNumber, {
                                [s.cellBackground]: dayIndex % 2 === 0,
                            })}
                        >
                            {subjectIndex + 1}
                        </th>
                    ))
                )}
            </tr>

            <tr>
                <th colSpan={1} className={s.sticky3} />
                {subjectsByDay.map((day, dayIndex) =>
                    day.subjects.map((subject, subjectIndex) => (
                        <th
                            key={`${dayIndex}-${subjectIndex}`}
                            className={clsx(s.subjectHeader, {
                                [s.cellBackground]: dayIndex % 2 === 0,
                            })}
                        >
                            <span className={s.rotatedText}>
                                {subject.subject}
                            </span>
                        </th>
                    ))
                )}
            </tr>

            <tr>
                <th className={clsx(s.indexColumn, s.sticky1)}>№</th>
                <th className={clsx(s.nameColumn, s.sticky2)}>
                    {t("full-name")}
                </th>
                <th className={clsx(s.standardColumn, s.sticky3)}>
                    {t("standard")}
                </th>
                {subjectsByDay.map((day, dayIndex) =>
                    day.subjects.map((subject, subjectIndex) => (
                        <th
                            key={`${dayIndex}-${subjectIndex}`}
                            className={clsx(s.standard, {
                                [s.cellBackground]: dayIndex % 2 === 0,
                            })}
                        >
                            {subject.hours}
                        </th>
                    ))
                )}
            </tr>
        </>
    );
};
