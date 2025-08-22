import { addDays, format, startOfWeek } from "date-fns";
import { enUS, ru } from "date-fns/locale";

import { WORK_DAYS_COUNT, getWeekDays, type WeekDay } from "./constants";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const generateWeekDays = (
    date: Date,
    t: (key: string) => string,
    locale: string
) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const weekDays = getWeekDays(t);

    return Array.from({ length: WORK_DAYS_COUNT }, (_, i) => {
        const dayNumber = (i + 1) as WeekDay;
        const day = addDays(start, i);
        const dayStr = format(day, "d MMMM", {
            locale: locale === "ru" ? ru : enUS,
        });
        return {
            title: `${weekDays[dayNumber]}, ${capitalize(dayStr)}`,
            date: day,
        };
    });
};
