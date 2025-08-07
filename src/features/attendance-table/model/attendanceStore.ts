import { makeAutoObservable } from "mobx";

import type { Attendance } from "./types";

export class AttendanceStore {
    tableData: Attendance[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setTableData(data: Attendance[]) {
        this.tableData = data;
    }

    updateAttendance({
        studentId,
        date,
        subject,
        newAttendance,
    }: {
        studentId: number;
        date: Date;
        subject: string;
        newAttendance: number;
    }) {
        const updated = this.tableData.map((student) => {
            if (student.studentId !== studentId) return student;

            const updatedAttendance = [...student.attendance];
            const attendanceIndex = updatedAttendance.findIndex(
                (a) => a.date === date && a.subject === subject
            );

            if (attendanceIndex !== -1) {
                updatedAttendance[attendanceIndex] = {
                    ...updatedAttendance[attendanceIndex],
                    hours: newAttendance,
                };
            } else {
                updatedAttendance.push({ date, subject, hours: newAttendance });
            }

            return { ...student, attendance: updatedAttendance };
        });

        this.setTableData(updated);
    }
}

export const attendanceStore = new AttendanceStore();
