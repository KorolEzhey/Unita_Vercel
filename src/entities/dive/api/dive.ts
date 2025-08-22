import { api, type Endpoint } from "@/shared/api";

import type { DiveResponse, NewDive } from "../model/types";

export class DivesApi {
    getAll: Endpoint<void, DiveResponse[]> = async () => {
        return api.get<DiveResponse[]>("/dives");
    };

    getById: Endpoint<{ diveId: number }, DiveResponse> = async ({
        diveId,
    }) => {
        return api.get<DiveResponse>(`/dives/${diveId}`);
    };

    createDive: Endpoint<NewDive, DiveResponse> = async (newDive) => {
        return api.post<DiveResponse>("/dives", newDive);
    };

    updateDive: Endpoint<
        { diveId: number; data: Partial<NewDive> },
        DiveResponse
    > = async ({ diveId, data }) => {
        return api.patch<DiveResponse>(`/dives/${diveId}`, data);
    };

    deleteDive: Endpoint<{ diveId: number }, void> = async ({ diveId }) => {
        return api.delete(`/dives/${diveId}`);
    };
}

export const divesApi = new DivesApi();
