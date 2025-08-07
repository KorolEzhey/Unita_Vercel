import type { Row } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";

import type { Attendance } from "../model/types";
import s from "./AttendanceTable.module.scss";

const columnHelper = createColumnHelper<Attendance>();

export const getColumns = (
    subjectsByDay: {
        date: Date;
        subjects: { subject: string; hours: number }[];
    }[],
    updateAttendance: ({
        studentId,
        date,
        subject,
        newAttendance,
    }: {
        studentId: number;
        date: Date;
        subject: string;
        newAttendance: number;
    }) => void,
    t: (key: string) => string
) => {
    return [
        columnHelper.display({
            id: "index",
            header: "№",
            cell: ({ row }) => row.index + 1,
        }),
        columnHelper.accessor("studentName", {
            header: t("full-name"),
        }),
        columnHelper.display({
            id: "separator",
            header: "",
            cell: () => null,
        }),
        ...subjectsByDay.flatMap(({ date, subjects }, dateIndex) =>
            subjects.map(({ subject }, subjectIndex) => ({
                id: `${date.toISOString()}-${subjectIndex}`,
                header: `${date.getDate()}.${date.getMonth() + 1} — ${subject}`,
                cell: ({ row }: { row: Row<Attendance> }) => {
                    const studentId = row.original.studentId;

                    const record = row.original.attendance.find(
                        (a: { date: Date; subject: string }) =>
                            new Date(a.date).toDateString() ===
                                date.toDateString() && a.subject === subject
                    );

                    const value = record?.hours ?? "";

                    const isStriped = dateIndex % 2 === 0;

                    return (
                        <input
                            type="number"
                            className={s.input}
                            style={{
                                backgroundColor: isStriped
                                    ? "#ededed"
                                    : "transparent",
                            }}
                            defaultValue={value}
                            min={0}
                            max={10}
                            onBlur={(e) =>
                                updateAttendance({
                                    studentId,
                                    date,
                                    subject,
                                    newAttendance: Number(e.target.value),
                                })
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    const input = e.target as HTMLInputElement;
                                    updateAttendance({
                                        studentId,
                                        date,
                                        subject,
                                        newAttendance: Number(input.value),
                                    });
                                }
                            }}
                        />
                    );
                },
            }))
        ),
    ];
};
