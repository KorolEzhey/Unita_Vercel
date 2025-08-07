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

export const WEEK_DAYS = {
    1: "Пн",
    2: "Вт",
    3: "Ср",
    4: "Чт",
    5: "Пт",
} as const;

export type WeekDay = keyof typeof WEEK_DAYS;

export type DayInfo = {
    title: string;
    dayNumber: WeekDay;
    date: Date;
};
