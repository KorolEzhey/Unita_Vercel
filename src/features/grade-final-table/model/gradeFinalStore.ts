import { makeAutoObservable } from "mobx";

import type { FinalGrade } from "./types";

export class GradeFinalStore {
    tableData: FinalGrade[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setTableData(data: FinalGrade[]) {
        this.tableData = data;
    }

    updateGrade(studentId: number, subject: string, newGrade: number) {
        const updated = this.tableData.map((student) => {
            if (student.studentId !== studentId) return student;

            const updatedGrades = [...student.grades];
            const gradeIndex = updatedGrades.findIndex(
                (g) => g.subject === subject
            );

            if (gradeIndex !== -1) {
                updatedGrades[gradeIndex] = {
                    ...updatedGrades[gradeIndex],
                    grade: newGrade,
                };
            } else {
                updatedGrades.push({ subject, grade: newGrade });
            }

            return { ...student, grades: updatedGrades };
        });

        this.setTableData(updated);
    }
}

export const gradeFinalStore = new GradeFinalStore();
