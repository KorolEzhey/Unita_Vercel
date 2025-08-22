import { api, type Endpoint } from "@/shared/api";

import type { NewStudent, StudentResponse } from "../model/types";

export class StudentsApi {
    getAll: Endpoint<void, StudentResponse[]> = async () => {
        return api.get<StudentResponse[]>("/students");
    };

    updateStudentClass: Endpoint<
        { studentId: number; classId: number },
        StudentResponse
    > = async ({ studentId, classId }) => {
        return api.patch<StudentResponse>(`/students/${studentId}`, {
            classId,
        });
    };

    updateStudentFullName: Endpoint<
        { studentId: number; fullName: string },
        StudentResponse
    > = async ({ studentId, fullName }) => {
        return api.patch<StudentResponse>(`/students/${studentId}`, {
            fullName,
        });
    };

    updateStudentLogin: Endpoint<
        { studentId: number; login: string },
        StudentResponse
    > = async ({ studentId, login }) => {
        return api.patch<StudentResponse>(`/students/${studentId}`, { login });
    };

    updateStudentPassword: Endpoint<
        { studentId: number; password: string },
        StudentResponse
    > = async ({ studentId, password }) => {
        return api.patch<StudentResponse>(`/students/${studentId}`, {
            password,
        });
    };

    deleteStudent: Endpoint<{ studentId: number }, void> = async ({
        studentId,
    }) => {
        return api.delete(`/students/${studentId}`);
    };

    getStudent: Endpoint<{ id: number }, StudentResponse> = async ({ id }) => {
        return api.get<StudentResponse>(`/students/${id}`);
    };

    addStudent: Endpoint<NewStudent, StudentResponse> = async (newStudent) => {
        return api.post<StudentResponse>("/students", newStudent);
    };
}

export const studentsApi = new StudentsApi();
