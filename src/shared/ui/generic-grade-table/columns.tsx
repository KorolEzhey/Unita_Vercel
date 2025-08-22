import { createColumnHelper, type Row } from "@tanstack/react-table";

import { KEY_NAMES } from "@/shared/lib/constants";

import s from "./GenericGradeTable.module.scss";

export type BaseGrade = {
    studentId: number;
    studentName: string;
    avarageScore: number;
    grades: { week?: number; subject?: string; grade: number }[];
};

export type ColumnConfig =
    | { mode: "week"; items: { week: number; subject: string }[] }
    | { mode: "subject"; items: string[] };

export function getGenericColumns<T extends BaseGrade>(
    config: ColumnConfig,
    updateGrade: (
        studentId: number,
        key: number | string,
        newGrade: number
    ) => void,
    t: (key: string) => string
) {
    const columnHelper = createColumnHelper<T>();

    function createCell<T extends BaseGrade>(
        key: number | string,
        getGrade: (grades: T["grades"]) => number | undefined,
        updateGrade: (
            studentId: number,
            key: number | string,
            newGrade: number
        ) => void
    ) {
        return ({ row }: { row: Row<T> }) => {
            const grade = getGrade(row.original.grades);
            return (
                <input
                    type="number"
                    defaultValue={grade}
                    onBlur={(e) =>
                        updateGrade(
                            row.original.studentId,
                            key,
                            Number(e.target.value)
                        )
                    }
                    onKeyDown={(e) => {
                        if (e.key === KEY_NAMES.ENTER) {
                            e.preventDefault();
                            updateGrade(
                                row.original.studentId,
                                key,
                                Number(e.currentTarget.value)
                            );
                            e.currentTarget.blur();
                        }
                    }}
                    className={s.input}
                />
            );
        };
    }

    return [
        columnHelper.display({
            id: "index",
            header: "",
            cell: ({ row }) => row.index + 1,
        }),
        columnHelper.accessor((row) => row.studentName, {
            id: "studentName",
            header: t("full-name"),
        }),
        columnHelper.accessor((row) => row.avarageScore, {
            id: "avarageScore",
            header: t("average"),
        }),

        ...(config.mode === "week"
            ? config.items.map(({ week, subject }) => ({
                  id: `week-${week}`,
                  header: subject,
                  cell: createCell<T>(
                      week,
                      (grades) => grades.find((g) => g.week === week)?.grade,
                      updateGrade
                  ),
              }))
            : config.items.map((subject) => ({
                  id: `subject-${subject}`,
                  header: subject,
                  cell: createCell<T>(
                      subject,
                      (grades) =>
                          grades.find((g) => g.subject === subject)?.grade,
                      updateGrade
                  ),
              }))),
    ];
}
