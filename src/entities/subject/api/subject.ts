import { api, type Endpoint } from "@/shared/api";

import type { NewSubject, SubjectResponse } from "../model/types";

export class SubjectsApi {
    getAll: Endpoint<void, SubjectResponse[]> = async () => {
        return api.get<SubjectResponse[]>("/subjects");
    };

    getById: Endpoint<{ subjectId: number }, SubjectResponse> = async ({
        subjectId,
    }) => {
        return api.get<SubjectResponse>(`/subjects/${subjectId}`);
    };

    updateSubjectName: Endpoint<
        { subjectId: number; name: string },
        SubjectResponse
    > = async ({ subjectId, name }) => {
        return api.patch<SubjectResponse>(`/subjects/${subjectId}`, {
            name,
        });
    };

    deleteSubject: Endpoint<{ subjectId: number }, void> = async ({
        subjectId,
    }) => {
        return api.delete(`/subjects/${subjectId}`);
    };

    addSubject: Endpoint<NewSubject, SubjectResponse> = async (newSubject) => {
        return api.post<SubjectResponse>("/subjects", newSubject);
    };
}

export const subjectsApi = new SubjectsApi();
