import type { DiveTableData } from "@/shared/lib/constants";

export type QuarterMapping = {
    ru: string;
    en: string;
    value: string;
};

export type QuarterData = {
    quarter: QuarterMapping;
    data: DiveTableData;
};

const quarterMockData: Record<string, DiveTableData> = {
    q1: [
        { week: "1", subject: "Математика", mark: 85, actions: "" },
        { week: "2", subject: "Физика", mark: 92, actions: "" },
        { week: "3", subject: "История", mark: 78, actions: "" },
    ],
    q2: [
        { week: "4", subject: "Химия", mark: 90, actions: "" },
        { week: "5", subject: "Биология", mark: 88, actions: "" },
        { week: "6", subject: "Литература", mark: 95, actions: "" },
    ],
    q3: [
        { week: "7", subject: "Информатика", mark: 94, actions: "" },
        { week: "8", subject: "География", mark: 89, actions: "" },
        { week: "9", subject: "Английский", mark: 87, actions: "" },
    ],
    q4: [
        { week: "10", subject: "Математика", mark: 91, actions: "" },
        { week: "11", subject: "Физика", mark: 86, actions: "" },
        { week: "12", subject: "История", mark: 93, actions: "" },
    ],
};

export class QuartersApi {
    async getQuarterData(quarter: string): Promise<DiveTableData> {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Имитация задержки сети
        return quarterMockData[quarter] || [];
    }

    async selectQuarter(quarter: string): Promise<void> {
        console.warn(`Selected quarter: ${quarter}`);
    }
}

export const quartersApi = new QuartersApi();
