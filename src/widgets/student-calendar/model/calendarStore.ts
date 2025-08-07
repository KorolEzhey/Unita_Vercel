import { addDays, getDay, getTime, subDays } from "date-fns";
import { makeAutoObservable } from "mobx";
import { match } from "ts-pattern";

import { CALENDAR, type DateState, type DayType } from "@/shared/lib/constants";

import { calendarService } from "../api/calendarService";

export class CalendarStore {
    readonly today: Date = CALENDAR.FIXED_DATE;
    currentDate: Date = this.today;
    selectedDate: Date | undefined = undefined;

    private readonly startDate: Date;
    private readonly todayIndex: number = CALENDAR.TODAY_INDEX;

    constructor() {
        makeAutoObservable(this);
        this.startDate = subDays(this.today, this.todayIndex);
    }

    setSelectedDate(date: Date) {
        this.selectedDate = date;
    }

    setCurrentDate(date: Date) {
        this.currentDate = date;
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

    async selectDate(date: Date): Promise<void> {
        this.setSelectedDate(date);
        await calendarService.selectDate(date);
    }

    resetDate() {
        this.currentDate = this.today;
        this.selectedDate = undefined;
    }

    get dates() {
        return Array.from({ length: CALENDAR.DAYS_COUNT }, (_, i) =>
            addDays(this.startDate, i)
        );
    }
}

export const calendarStore = new CalendarStore();
