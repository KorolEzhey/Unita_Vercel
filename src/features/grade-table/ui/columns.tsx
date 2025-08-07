import { createColumnHelper, Row } from "@tanstack/react-table";
import s from "./GradeTable.module.scss";
import { Grade } from "../model/types";

const columnHelper = createColumnHelper<Grade>();

export const getColumns = (
    subjectsByWeek: { week: number; subject: string }[],
    updateGrade: (studentId: number, week: number, newGrade: number) => void,
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
    ...subjectsByWeek.map(({ week, subject }) => ({
        id: `week-${week}`,
        header: subject,
        cell: ({ row }: { row: Row<Grade> }) => {
            const grade = row.original.grades.find(
                (g: { week: number; grade: number }) => g.week === week
            )?.grade;
            const studentId = row.original.studentId;

            return (
                <input
                    type="number"
                    defaultValue={grade}
                    onBlur={(e) =>
                        updateGrade(studentId, week, Number(e.target.value))
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            updateGrade(
                                studentId,
                                week,
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
