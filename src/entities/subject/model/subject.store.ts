import { makeAutoObservable } from "mobx";

import { getErrorMessage } from "@/shared/lib/getErrorMessage";

import { subjectsApi } from "../api/subject";
import type { NewSubject, SubjectResponse } from "./types";

class SubjectStore {
    subjects: SubjectResponse[] = [];
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

    private setSubjects(subjects: SubjectResponse[]) {
        this.subjects = subjects;
    }

    async fetchAll() {
        try {
            this.setLoading(true);
            this.setError(null);

            const responce = await subjectsApi.getAll();
            this.setSubjects(responce.data);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async getSubjectById(subjectId: number): Promise<SubjectResponse | null> {
        try {
            // Сначала проверяем, есть ли предмет в кэше
            const cachedSubject = this.subjects.find(
                (s) => s.subjectId === subjectId
            );
            if (cachedSubject) {
                return cachedSubject;
            }

            // Если нет в кэше, загружаем с сервера
            const response = await subjectsApi.getById({ subjectId });
            const subject = response.data;

            // Добавляем в кэш
            this.subjects = [...this.subjects, subject];

            return subject;
        } catch (error) {
            console.error(`Ошибка загрузки предмета ${subjectId}:`, error);
            return null;
        }
    }

    async updateSubjectName(subjectId: number, name: string) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await subjectsApi.updateSubjectName({
                subjectId,
                name,
            });

            this.subjects = this.subjects.map((s) =>
                s.subjectId === subjectId ? response.data : s
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteSubject(subjectId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            await subjectsApi.deleteSubject({ subjectId });

            this.subjects = this.subjects.filter(
                (s) => s.subjectId !== subjectId
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async addSubject(newSubject: NewSubject) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await subjectsApi.addSubject(newSubject);

            this.subjects = [...this.subjects, response.data];
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }
}

export const subjectStore = new SubjectStore();
