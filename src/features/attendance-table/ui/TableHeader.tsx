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
                <th colSpan={2} rowSpan={4} className={s.classHeader}>
                    {t("class")}: {selectedClass}
                </th>
                <th colSpan={1} style={{ borderRight: "none" }} />
                {Array.from(
                    monthsMap.entries() as Iterable<
                        [number, { name: string; colspan: number }]
                    >
                ).map(([month, { name, colspan }]) => (
                    <th key={month} colSpan={colspan} className={s.month}>
                        {name}
                    </th>
                ))}
            </tr>

            <tr>
                <th colSpan={1} className={s.dateColumn}>
                    {t("date")}
                </th>
                {subjectsByDay.map((day) => (
                    <th
                        key={day.date.toISOString()}
                        colSpan={day.subjects.length}
                        className={s.date}
                    >
                        {day.date.getDate()}
                    </th>
                ))}
            </tr>

            <tr>
                <th colSpan={1} className={s.subjectColumn}>
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
                <th colSpan={1} />
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
                <th className={s.indexColumn}>№</th>
                <th className={s.nameColumn}>{t("full-name")}</th>
                <th className={s.standardColumn}>{t("standard")}</th>
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
