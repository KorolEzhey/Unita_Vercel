import s from "./AttendanceTable.module.scss";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { FC, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getColumns } from "./columns";
import { Attendance } from "../model/types";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { attendanceStore } from "../model/attendanceStore";
import { observer } from "mobx-react-lite";

type AttendanceTableProps = {
    data: Attendance[];
    subjectsByDay: {
        date: Date;
        subjects: { subject: string; hours: number }[];
    }[];
    selectedClass: string;
};

export const AttendanceTable: FC<AttendanceTableProps> = observer(
    ({ data, subjectsByDay, selectedClass }) => {
        const t = useTranslations("dive_table");

        useEffect(() => {
            attendanceStore.setTableData(data);
        }, [data]);

        const table = useReactTable({
            data: attendanceStore.tableData,
            columns: getColumns(
                subjectsByDay,
                attendanceStore.updateAttendance.bind(attendanceStore),
                t
            ),
            getCoreRowModel: getCoreRowModel(),
        });

        return (
            <table className={s.table}>
                <thead>
                    <TableHeader
                        subjectsByDay={subjectsByDay}
                        selectedClass={selectedClass}
                    />
                </thead>
                <tbody>
                    <TableBody table={table} />
                </tbody>
            </table>
        );
    }
);
