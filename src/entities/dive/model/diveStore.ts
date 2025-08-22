import { makeAutoObservable } from "mobx";

import { getErrorMessage } from "@/shared/lib/getErrorMessage";

import { divesApi } from "../api/dive";
import type { DiveResponse, NewDive } from "./types";

class DiveStore {
    dives: DiveResponse[] = [];
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

    private setDives(dives: DiveResponse[]) {
        this.dives = dives;
    }

    async fetchAll() {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await divesApi.getAll();
            this.setDives(response.data);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async createDive(newDive: NewDive) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await divesApi.createDive(newDive);
            this.dives = [...this.dives, response.data];
            return response.data;
        } catch (error) {
            console.error("DiveStore: ошибка создания дайва", error);
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateDive(diveId: number, data: Partial<NewDive>) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await divesApi.updateDive({ diveId, data });
            this.dives = this.dives.map((d) =>
                d.diveID === diveId ? response.data : d
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteDive(diveId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            await divesApi.deleteDive({ diveId });
            this.dives = this.dives.filter((d) => d.diveID !== diveId);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }
}

export const diveStore = new DiveStore();
