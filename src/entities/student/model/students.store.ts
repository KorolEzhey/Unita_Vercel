import { makeAutoObservable } from "mobx";

import { getErrorMessage } from "@/shared/lib/getErrorMessage";

import { studentsApi } from "../api/students";
import type { NewStudent, StudentResponse } from "./types";

class StudentStore {
    students: StudentResponse[] = [];
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

    private setStudents(students: StudentResponse[]) {
        this.students = students;
    }

    async fetchAll() {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await studentsApi.getAll();
            this.setStudents(response.data);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateStudentClass(studentId: number, classId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await studentsApi.updateStudentClass({
                studentId,
                classId,
            });

            this.students = this.students.map((s) =>
                s.studentId === studentId ? response.data : s
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateStudentFullName(studentId: number, fullName: string) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await studentsApi.updateStudentFullName({
                studentId,
                fullName,
            });

            this.students = this.students.map((s) =>
                s.studentId === studentId ? response.data : s
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateStudentLogin(studentId: number, login: string) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await studentsApi.updateStudentLogin({
                studentId,
                login,
            });

            this.students = this.students.map((s) =>
                s.studentId === studentId ? response.data : s
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateStudentPassword(studentId: number, password: string) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await studentsApi.updateStudentPassword({
                studentId,
                password,
            });

            this.students = this.students.map((s) =>
                s.studentId === studentId ? response.data : s
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteStudent(studentId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            await studentsApi.deleteStudent({ studentId });

            this.students = this.students.filter(
                (s) => s.studentId !== studentId
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async addStudent(newStudent: NewStudent) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await studentsApi.addStudent(newStudent);

            this.students = [...this.students, response.data];
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async fetchStudentById(id: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await studentsApi.getStudent({ id });
            return response.data;
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }
}

export const studentStore = new StudentStore();
