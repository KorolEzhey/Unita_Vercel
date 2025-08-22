import { makeAutoObservable } from "mobx";

import type { GradeResponse, NewGrade, UpdateGrade } from "@/entities/grade";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";

import { gradeBookApi } from "../../../pages/grade-book-desktop/api/gradeBook";

export class GradeBookTableStore {
    grades: GradeResponse[] = [];
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

    async fetchAllGrades() {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await gradeBookApi.getAllGrades();
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

            const response = await gradeBookApi.createGrade(newGrade);
            this.grades = [...this.grades, response.data];
            return response.data;
        } catch (error) {
            console.error("GradeBookTableStore: ошибка создания оценки", error);
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

            const response = await gradeBookApi.updateGrade(gradeId, data);
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

            await gradeBookApi.deleteGrade(gradeId);
            this.grades = this.grades.filter((g) => g.gradeID !== gradeId);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    getGradesByStudent(studentId: number): GradeResponse[] {
        return this.grades.filter((grade) => grade.userID === studentId);
    }

    getGradesByDive(diveId: number): GradeResponse[] {
        return this.grades.filter((grade) => grade.diveID === diveId);
    }

    getGrade(studentId: number, diveId: number): GradeResponse | undefined {
        return this.grades.find(
            (grade) => grade.userID === studentId && grade.diveID === diveId
        );
    }

    get isLoadingGrades() {
        return this.isLoading;
    }

    get hasError() {
        return this.error !== null;
    }

    get errorMessage() {
        return this.error;
    }
}

export const gradeBookTableStore = new GradeBookTableStore();
