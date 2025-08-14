import { type CalendarApi, calendarApi } from "@/shared/api";

export class CalendarService {
    private api: CalendarApi;

    constructor(api: CalendarApi = calendarApi) {
        this.api = api;
    }

    async selectDate(date: Date): Promise<void> {
        await this.api.selectDate(date);
    }
}

export const calendarService = new CalendarService();
