import { format } from "date-fns";
import { enUS, ru } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";

import { getWeekDays, type WeekDay } from "./constants";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const useFormatDateWithLocale = (date: Date | string) => {
    const locale = useLocale();
    const t = useTranslations("calendar");
    const d = typeof date === "string" ? new Date(date) : date;

    const weekDays = getWeekDays(t);
    const dayNumber = (d.getDay() === 0 ? 7 : d.getDay()) as WeekDay;

    const dateStr = format(d, "d MMMM", {
        locale: locale === "ru" ? ru : enUS,
    });

    return `${weekDays[dayNumber]}, ${capitalize(dateStr)}`;
};
