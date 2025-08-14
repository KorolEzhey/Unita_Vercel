export type DayType = "weekend" | "weekday";

export const CALENDAR = {
    FIXED_DATE: new Date(2025, 8, 1),
    TODAY_INDEX: 0,
    DAYS_COUNT: 273,
    SCROLL_TIMEOUT: 300,
    INITIAL_SCROLL_INDEX: 0,
    DAYS_FROM_START_MULTIPLIER: 273,
} as const;

export type DateState = {
    isSelected: boolean;
    isToday: boolean;
    dayType: DayType;
};

export const GRADE_THRESHOLDS = {
    UNSATISFACTORY: 60,
    SATISFACTORY: 80,
    GOOD: 90,
} as const;

export type Grade = {
    id: string;
    subject: string;
    grade: number;
    week: string;
    date: string;
};

export type DiveTableRow = {
    week: string;
    subject: string;
    mark: number;
    actions: string;
};

export type DiveTableData = DiveTableRow[];

export type WeekDay = 1 | 2 | 3 | 4 | 5;

export const WORK_DAYS_COUNT = 5;

export const getWeekDays = (t: (key: string) => string) =>
    ({
        1: t("calendar.days.short.0"),
        2: t("calendar.days.short.1"),
        3: t("calendar.days.short.2"),
        4: t("calendar.days.short.3"),
        5: t("calendar.days.short.4"),
    }) as const;

export const LESSON_NUMBER_OFFSET = 1;

export type DayInfo = {
    title: string;
    dayNumber: WeekDay;
    date: Date;
};
