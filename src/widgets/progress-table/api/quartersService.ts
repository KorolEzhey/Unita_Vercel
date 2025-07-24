import { type QuartersApi, quartersApi } from "@/shared/api";
import type { DiveTableData } from "@/shared/lib/constants";

export class QuartersService {
    private api: QuartersApi;

    constructor(api: QuartersApi = quartersApi) {
        this.api = api;
    }

    async getQuarterData(quarter: string): Promise<DiveTableData> {
        return await this.api.getQuarterData(quarter);
    }

    async selectQuarter(quarter: string): Promise<void> {
        await this.api.selectQuarter(quarter);
    }
}

export const quartersService = new QuartersService();
