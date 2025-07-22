import { addDays, getDay, getTime, subDays } from "date-fns";
import { makeAutoObservable } from "mobx";
import { match } from "ts-pattern";

import { type CalendarApi, calendarApi } from "@/shared/api"; // импорт из public API
import type { DateState, DayType } from "@/shared/lib/constants";

export class CalendarStore {
    // Фиксированная текущая дата (1 сентября 2025)
    readonly today: Date = new Date(2025, 8, 1);
    currentDate: Date = this.today;
    selectedDate: Date | undefined = undefined;
    isReady: boolean = false;

    private readonly startDate: Date;
    private readonly todayIndex: number = 31; // Фиксированный индекс для сегодняшней даты
    private api: CalendarApi;

    constructor() {
        makeAutoObservable(this);
        this.api = calendarApi;
        // Вычисляем стартовую дату относительно сегодняшней даты
        this.startDate = subDays(this.today, this.todayIndex);
    }

    setSelectedDate(date: Date) {
        this.selectedDate = date;
    }

    setCurrentDate(date: Date) {
        this.currentDate = date;
    }

    setReady(value: boolean) {
        this.isReady = value;
    }

    updateCurrentMonth(scroll: number) {
        const daysFromStart = Math.round(scroll * 92);
        const currentDate = addDays(this.startDate, daysFromStart);
        this.setCurrentDate(currentDate);
    }

    getDayType(dayIdx: number): DayType {
        return match(dayIdx)
            .with(0, 6, () => "weekend" as const)
            .otherwise(() => "weekday" as const);
    }

    getDateState(date: Date): DateState {
        return {
            isSelected:
                this.selectedDate !== undefined &&
                getTime(date) === getTime(this.selectedDate),
            isToday: getTime(date) === getTime(this.today),
            dayType: this.getDayType(getDay(date)),
        };
    }

    handleDateClick(date: Date) {
        return async () => {
            this.setSelectedDate(date);
            await this.api.selectDate(date);
        };
    }

    get monthIndex() {
        return this.currentDate.getMonth();
    }

    get dates() {
        return Array.from({ length: 93 }, (_, i) => addDays(this.startDate, i));
    }
}

export const calendarStore = new CalendarStore();
