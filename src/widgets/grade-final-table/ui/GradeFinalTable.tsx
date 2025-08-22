import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";

import {
    GenericGradeTable,
    getGenericColumns,
} from "@/shared/ui/generic-grade-table";

import { gradeFinalStore } from "../model/gradeFinalStore";
import type { FinalGrade } from "../model/types";
import s from "./GradeFinalTable.module.scss";

export const GradeFinalTable = observer(
    ({
        data,
        subjects,
        selectedClass,
    }: {
        data: FinalGrade[];
        subjects: string[];
        selectedClass: string;
    }) => {
        const t = useTranslations("dive_table");

        const handleUpdateGrade = (
            studentId: number,
            key: number | string,
            newGrade: number
        ) => {
            if (typeof key === "string") {
                gradeFinalStore.updateGrade(studentId, key, newGrade);
            }
        };

        const columns = getGenericColumns<FinalGrade>(
            { mode: "subject", items: subjects },
            handleUpdateGrade,
            t
        );

        return (
            <GenericGradeTable
                data={data}
                columns={columns}
                selectedClass={selectedClass}
                store={gradeFinalStore}
                t={t}
                extraHeaders={
                    <>
                        <tr>
                            <th
                                colSpan={2}
                                rowSpan={1}
                                className={clsx(s.classHeader, s.sticky1)}
                            >
                                {t("class")}: {selectedClass}
                            </th>
                            <th colSpan={1} className={s.sticky2} />
                            {subjects.map((subject) => (
                                <th
                                    key={subject}
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
