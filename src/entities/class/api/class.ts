import { api, type Endpoint } from "@/shared/api";

import type { ClassResponse, NewClass } from "../model/types";

export class ClassesApi {
    getAll: Endpoint<void, ClassResponse[]> = async () => {
        return api.get<ClassResponse[]>("/classes");
    };

    updateClassName: Endpoint<
        { classId: number; name: string },
        ClassResponse
    > = async ({ classId, name }) => {
        return api.patch<ClassResponse>(`/classes/${classId}`, {
            name,
        });
    };

    deleteClass: Endpoint<{ classId: number }, void> = async ({ classId }) => {
        return api.delete(`/classes/${classId}`);
    };

    addClass: Endpoint<NewClass, ClassResponse> = async (newClass) => {
        return api.post<ClassResponse>("/classes", newClass);
    };
}

export const classesApi = new ClassesApi();
