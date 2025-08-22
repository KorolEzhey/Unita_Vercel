export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://unita55.ru";

export const AUTH = {
    TOKEN_REFRESH_INTERVAL: 14 * 60 * 1000, // 14 минут в миллисекундах
    TOKEN_REFRESH_OFFSET: 2 * 60 * 1000, // 2 минуты до истечения токена
} as const;

export const FILE_LIMITS = {
    AVATAR: {
        MAX_SIZE: 2 * 1024 * 1024,
        ALLOWED_TYPES: ["image/jpeg", "image/png", "image/gif"] as const,
        CACHE: {
            STALE_TIME: 5 * 60 * 1000, // 5 минут
            GC_TIME: 30 * 60 * 1000, // 30 минут
        },
    },
    FILE: {
        MAX_SIZE: 20 * 1024 * 1024, // 10MB
    },
} as const;

export type DayType = "weekend" | "weekday";

export const CALENDAR = {
    FIXED_DATE: new Date(),
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

export type WeekDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const WORK_DAYS_COUNT = 7;

export const getWeekDays = (t: (key: string) => string) =>
    ({
        1: t("days.short.0"),
        2: t("days.short.1"),
        3: t("days.short.2"),
        4: t("days.short.3"),
        5: t("days.short.4"),
        6: t("days.short.5"),
        7: t("days.short.6"),
    }) as const;

export const LESSON_NUMBER_OFFSET = 1;

export type DayInfo = {
    title: string;
    dayNumber: WeekDay;
    date: Date;
};

export const KEY_NAMES = {
    ENTER: "Enter",
};
