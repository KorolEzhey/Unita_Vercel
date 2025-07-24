import { makeAutoObservable, runInAction } from "mobx";

import type { DiveTableData } from "@/shared/lib/constants";

import { quartersService } from "../api/quartersService";

class QuartersStore {
    selectedQuarterIndex: number = 0;
    quarterData: DiveTableData = [];
    isLoading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    reset() {
        this.selectedQuarterIndex = 0;
        this.quarterData = [];
        this.isLoading = false;
        this.error = null;
    }

    async selectQuarter(index: number, quarterValue: string): Promise<void> {
        this.selectedQuarterIndex = index;
        this.isLoading = true;
        this.error = null;

        try {
            const data = await quartersService.getQuarterData(quarterValue);
            runInAction(() => {
                this.quarterData = data;
                this.isLoading = false;
            });
        } catch {
            runInAction(() => {
                this.error = "Ошибка при загрузке данных четверти";
                this.isLoading = false;
            });
        }
    }
}

export const quartersStore = new QuartersStore();
