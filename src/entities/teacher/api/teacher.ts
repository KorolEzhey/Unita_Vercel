import { api, type Endpoint } from "@/shared/api";

import type { NewTeacher, TeacherResponse } from "../model/types";

export class TeachersApi {
    getAll: Endpoint<void, TeacherResponse[]> = async () => {
        return api.get<TeacherResponse[]>("/teachers");
    };

    updateTeacherFullName: Endpoint<
        { teacherId: number; fullName: string },
        TeacherResponse
    > = async ({ teacherId, fullName }) => {
        return api.patch<TeacherResponse>(`/teachers/${teacherId}`, {
            fullName,
        });
    };

    updateTeacherLogin: Endpoint<
        { teacherId: number; login: string },
        TeacherResponse
    > = async ({ teacherId, login }) => {
        return api.patch<TeacherResponse>(`/teachers/${teacherId}`, { login });
    };

    updateTeacherPassword: Endpoint<
        { teacherId: number; password: string },
        TeacherResponse
    > = async ({ teacherId, password }) => {
        return api.patch<TeacherResponse>(`/teachers/${teacherId}`, {
            password,
        });
    };

    deleteTeacher: Endpoint<{ teacherId: number }, void> = async ({
        teacherId,
    }) => {
        return api.delete(`/teachers/${teacherId}`);
    };

    addTeacher: Endpoint<NewTeacher, TeacherResponse> = async (newTeacher) => {
        return api.post<TeacherResponse>("/teachers", newTeacher);
    };

    getTeacher: Endpoint<{ teacherId: number }, TeacherResponse> = async ({
        teacherId,
    }) => {
        return api.get<TeacherResponse>(`/teachers/${teacherId}`);
    };
}

export const teachersApi = new TeachersApi();
