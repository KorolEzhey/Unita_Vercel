import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";

import {
    GenericGradeTable,
    getGenericColumns,
} from "@/shared/ui/generic-grade-table";

import { gradeStore } from "../model/gradeStore";
import type { Grade } from "../model/types";
import s from "./GradeTable.module.scss";

export const GradeTable = observer(
    ({
        data,
        subjectsByWeek,
        selectedClass,
    }: {
        data: Grade[];
        subjectsByWeek: { week: number; subject: string }[];
        selectedClass: string;
    }) => {
        const t = useTranslations("dive_table");

        const handleUpdateGrade = (
            studentId: number,
            key: number | string,
            newGrade: number
        ) => {
            if (typeof key === "number") {
                gradeStore.updateGrade(studentId, key, newGrade);
            }
        };

        const columns = getGenericColumns<Grade>(
            { mode: "week", items: subjectsByWeek },
            handleUpdateGrade,
            t
        );

        return (
            <GenericGradeTable
                data={data}
                columns={columns}
                selectedClass={selectedClass}
                store={gradeStore}
                t={t}
                extraHeaders={
                    <>
                        <tr>
                            <th
                                colSpan={2}
                                rowSpan={2}
                                className={clsx(s.classHeader, s.sticky1)}
                            >
                                {t("class")}: {selectedClass}
                            </th>
                            <th
                                colSpan={1}
                                className={clsx(s.weekNumber, s.stickyWeek)}
                            >
                                {t("week")}
                            </th>
                            {subjectsByWeek.map(({ week }) => (
                                <th key={week} className={s.weekHeader}>
                                    {week}
                                </th>
                            ))}
                        </tr>

                        <tr>
                            <th colSpan={1} className={s.sticky2} />
                            {subjectsByWeek.map(({ week, subject }) => (
                                <th
                                    key={`subject-${week}`}
                                    rowSpan={2}
                                    className={s.subjectWrapper}
                                >
                                    <span className={s.subjectName}>
                                        {subject}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </>
                }
            />
        );
    }
);
