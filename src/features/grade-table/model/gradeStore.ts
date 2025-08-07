import { makeAutoObservable } from "mobx";
import { Grade } from "./types";

export class GradeStore {
    tableData: Grade[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setTableData(data: Grade[]) {
        this.tableData = data;
    }

    updateGrade(studentId: number, week: number, newGrade: number) {
        const updated = this.tableData.map((student) => {
            if (student.studentId !== studentId) return student;

            const updatedGrades = [...student.grades];
            const gradeIndex = updatedGrades.findIndex((g) => g.week === week);

            if (gradeIndex !== -1) {
                updatedGrades[gradeIndex] = {
                    ...updatedGrades[gradeIndex],
                    grade: newGrade,
                };
            } else {
                updatedGrades.push({ week, grade: newGrade });
            }

            return {
                ...student,
                grades: updatedGrades,
            };
        });

        this.setTableData(updated);
    }
}

export const gradeStore = new GradeStore();
