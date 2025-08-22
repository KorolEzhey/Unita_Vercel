import { api, type Endpoint } from "@/shared/api";

import type {
    GradeResponse,
    NewGrade,
    StudentDiveGrade,
    StudentModuleAverage,
    StudentModuleGrades,
    StudentModulesAverageResponse,
    UpdateGrade,
} from "../model/types";

export type _StudentModuleAverage = {
    studentID: number;
    averageGrade: number;
};

export type _StudentModuleGrades = {
    studentID: number;
    grades: GradeResponse[];
};

export class GradeApi {
    getAll: Endpoint<void, GradeResponse[]> = async () => {
        return api.get<GradeResponse[]>("/grades");
    };

    getById: Endpoint<{ id: number }, GradeResponse> = async ({ id }) => {
        return api.get<GradeResponse>(`/grades/${id}`);
    };

    createGrade: Endpoint<NewGrade, GradeResponse> = async (newGrade) => {
        return api.post<GradeResponse>("/grades", newGrade);
    };

    updateGrade: Endpoint<{ id: number; data: UpdateGrade }, GradeResponse> =
        async ({ id, data }) => {
            return api.patch<GradeResponse>(`/grades/${id}`, data);
        };

    deleteGrade: Endpoint<{ id: number }, void> = async ({ id }) => {
        return api.delete(`/grades/${id}`);
    };

    getStudentModuleGrades: Endpoint<
        { studentId: number; moduleId: number },
        GradeResponse[]
    > = async ({ studentId, moduleId }) => {
        return api.get<GradeResponse[]>(
            `/grades/student/${studentId}/dives/${moduleId}`
        );
    };

    getStudentDiveGrades: Endpoint<
        { studentId: number; moduleId: number },
        StudentDiveGrade[]
    > = async ({ studentId, moduleId }) => {
        return api.get<StudentDiveGrade[]>(
            `/grades/student/${studentId}/dives/${moduleId}`
        );
    };

    getStudentModuleAverage: Endpoint<
        { studentId: number },
        StudentModulesAverageResponse
    > = async ({ studentId }) => {
        return api.get<StudentModulesAverageResponse>(
            `/grades/student/${studentId}/modules/average`
        );
    };
}

export const gradeApi = new GradeApi();
