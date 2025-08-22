import { gradeApi, type NewGrade, type UpdateGrade } from "@/entities/grade";

export class GradeBookApi {
    async getAllGrades() {
        return gradeApi.getAll();
    }

    async createGrade(newGrade: NewGrade) {
        return gradeApi.createGrade(newGrade);
    }

    async updateGrade(gradeId: number, data: UpdateGrade) {
        return gradeApi.updateGrade({ id: gradeId, data });
    }

    async deleteGrade(gradeId: number) {
        return gradeApi.deleteGrade({ id: gradeId });
    }

    async getStudentModuleGrades(studentId: number, moduleId: number) {
        return gradeApi.getStudentModuleGrades({ studentId, moduleId });
    }

    async getStudentModuleAverage(studentId: number) {
        return gradeApi.getStudentModuleAverage({ studentId });
    }
}

export const gradeBookApi = new GradeBookApi();
