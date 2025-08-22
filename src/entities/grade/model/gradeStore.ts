import { makeAutoObservable } from "mobx";

import { getErrorMessage } from "@/shared/lib/getErrorMessage";

import { gradeApi } from "../api/grade";
import type {
    GradeResponse,
    NewGrade,
    StudentDiveGrade,
    StudentModulesAverageResponse,
    UpdateGrade,
} from "./types";

class GradeStore {
    grades: GradeResponse[] = [];
    studentDiveGrades: StudentDiveGrade[] = [];
    studentModulesAverage: StudentModulesAverageResponse | null = null;
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    private setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    private setError(error: string | null) {
        this.error = error;
    }

    private setGrades(grades: GradeResponse[]) {
        this.grades = grades;
    }

    private setStudentDiveGrades(grades: StudentDiveGrade[]) {
        this.studentDiveGrades = grades;
    }

    async fetchAll() {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await gradeApi.getAll();
            this.setGrades(response.data);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async createGrade(newGrade: NewGrade) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await gradeApi.createGrade(newGrade);
            this.grades = [...this.grades, response.data];
            return response.data;
        } catch (error) {
            console.error("GradeStore: ошибка создания оценки", error);
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateGrade(gradeId: number, data: UpdateGrade) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await gradeApi.updateGrade({ id: gradeId, data });
            this.grades = this.grades.map((g) =>
                g.gradeID === gradeId ? response.data : g
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteGrade(gradeId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            await gradeApi.deleteGrade({ id: gradeId });
            this.grades = this.grades.filter((g) => g.gradeID !== gradeId);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async getStudentModuleGrades(studentId: number, moduleId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await gradeApi.getStudentModuleGrades({
                studentId,
                moduleId,
            });
            return response.data;
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async getStudentModuleAverage(studentId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await gradeApi.getStudentModuleAverage({
                studentId,
            });
            this.studentModulesAverage = response.data;
            return response.data;
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async getStudentDiveGrades(studentId: number, moduleId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await gradeApi.getStudentDiveGrades({
                studentId,
                moduleId,
            });
            this.setStudentDiveGrades(response.data);
            return response.data;
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    getGradesByDive(diveId: number) {
        return this.grades.filter((grade) => grade.diveID === diveId);
    }

    getGradesByStudent(userId: number) {
        return this.grades.filter((grade) => grade.userID === userId);
    }

    getGradeById(gradeId: number) {
        return this.grades.find((grade) => grade.gradeID === gradeId);
    }
}

export const gradeStore = new GradeStore();
