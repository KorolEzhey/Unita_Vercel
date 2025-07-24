import { format } from "date-fns";
import { ru } from "date-fns/locale";

export class CalendarApi {
    async selectDate(date: Date): Promise<void> {
        // TODO: Реальный API запрос
        console.warn(
            `Selected date: ${format(date, "dd.MM.yyyy", { locale: ru })}`
        );
    }
}

export const calendarApi = new CalendarApi();
