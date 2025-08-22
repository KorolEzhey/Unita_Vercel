import type { DiveResponse, NewDive } from "@/entities/dive";
import { api, type Endpoint } from "@/shared/api";

import type { ModuleResponse, NewModule } from "../model/types";

export class ModulesApi {
    getAll: Endpoint<void, ModuleResponse[]> = async () => {
        return api.get<ModuleResponse[]>("/modules");
    };

    getById: Endpoint<{ moduleId: number }, ModuleResponse> = async ({
        moduleId,
    }) => {
        return api.get<ModuleResponse>(`/modules/${moduleId}`);
    };

    getModulesByClass: Endpoint<{ classId: number }, ModuleResponse[]> =
        async ({ classId }) => {
            return api.get<ModuleResponse[]>(`/modules/class/${classId}`);
        };

    createModule: Endpoint<NewModule, ModuleResponse> = async (newModule) => {
        return api.post<ModuleResponse>("/modules", newModule);
    };

    addDiveToModule: Endpoint<
        { moduleId: number; dive: NewDive },
        DiveResponse
    > = async ({ moduleId, dive }) => {
        try {
            // Сначала создаем дайв через /dives
            const response = await api.post<DiveResponse>("/dives", dive);

            // Теперь привязываем дайв к модулю через POST /modules/{id}/dives
            await api.post<DiveResponse>(`/modules/${moduleId}/dives`, {
                diveID: response.data.diveID,
            });

            return response; // Возвращаем созданный дайв
        } catch (error: unknown) {
            console.error(
                "API Error:",
                (error as any).response?.data || (error as any).message
            );
            throw error;
        }
    };

    updateModule: Endpoint<
        { moduleId: number; data: Partial<NewModule> },
        ModuleResponse
    > = async ({ moduleId, data }) => {
        return api.patch<ModuleResponse>(`/modules/${moduleId}`, data);
    };

    deleteModule: Endpoint<{ moduleId: number }, void> = async ({
        moduleId,
    }) => {
        return api.delete(`/modules/${moduleId}`);
    };
}

export const modulesApi = new ModulesApi();
