import { createColumnHelper } from "@tanstack/react-table";
import type { Row } from "@tanstack/react-table";

import type { FinalGrade } from "../model/types";
import s from "./GradeFinalTable.module.scss";

const columnHelper = createColumnHelper<FinalGrade>();

export const getColumns = (
    subjects: string[],
    updateGrade: (studentId: number, subject: string, newGrade: number) => void,
    t: (key: string) => string
) => [
    columnHelper.display({
        id: "index",
        header: "№",
        cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("studentName", {
        header: t("full-name"),
    }),
    columnHelper.accessor("avarageScore", {
        header: t("average"),
    }),
    ...subjects.map((subject) => ({
        id: `subject-${subject}`,
        header: subject,
        cell: ({ row }: { row: Row<FinalGrade> }) => {
            const grade = row.original.grades.find(
                (g) => g.subject === subject
            )?.grade;
            const studentId = row.original.studentId;

            return (
                <input
                    type="number"
                    defaultValue={grade}
                    onBlur={(e) => {
                        const newGrade = Number(e.target.value);
                        updateGrade(studentId, subject, newGrade);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            updateGrade(
                                studentId,
                                subject,
                                Number(e.currentTarget.value)
                            );
                        }
                    }}
                    className={s.input}
                />
            );
        },
    })),
];
