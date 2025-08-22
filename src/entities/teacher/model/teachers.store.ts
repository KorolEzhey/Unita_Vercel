import { makeAutoObservable } from "mobx";

import { getErrorMessage } from "@/shared/lib/getErrorMessage";

import { teachersApi } from "../api/teacher";
import type { NewTeacher, TeacherResponse } from "./types";

class TeacherStore {
    teachers: TeacherResponse[] = [];
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

    private setTeachers(teachers: TeacherResponse[]) {
        this.teachers = teachers;
    }

    async fetchAll() {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await teachersApi.getAll();
            this.setTeachers(response.data);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateTeacherFullName(teacherId: number, fullName: string) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await teachersApi.updateTeacherFullName({
                teacherId,
                fullName,
            });

            this.teachers = this.teachers.map((s) =>
                s.teacherId === teacherId ? response.data : s
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateTeacherLogin(teacherId: number, login: string) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await teachersApi.updateTeacherLogin({
                teacherId,
                login,
            });

            this.teachers = this.teachers.map((s) =>
                s.teacherId === teacherId ? response.data : s
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateTeacherPassword(teacherId: number, password: string) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await teachersApi.updateTeacherPassword({
                teacherId,
                password,
            });

            this.teachers = this.teachers.map((s) =>
                s.teacherId === teacherId ? response.data : s
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteTeacher(teacherId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            await teachersApi.deleteTeacher({ teacherId });

            this.teachers = this.teachers.filter(
                (s) => s.teacherId !== teacherId
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async addTeacher(newTeacher: NewTeacher) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await teachersApi.addTeacher(newTeacher);

            this.teachers = [...this.teachers, response.data];
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }
}

export const teacherStore = new TeacherStore();
