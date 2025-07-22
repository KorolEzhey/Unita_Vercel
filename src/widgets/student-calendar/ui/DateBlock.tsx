import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { type FC } from "react";

import { calendarStore } from "../model/calendarStore";
import styles from "./DateBlock.module.scss";

type DateBlockProps = {
    date: Date;
    index: number;
};

export const DateBlock: FC<DateBlockProps> = observer(({ date }) => {
    const t = useTranslations("calendar");
    const state = calendarStore.getDateState(date);

    const dateBlockClass = clsx(styles.dateBlock, {
        [styles.selectedDate]: state.isSelected,
        [styles.currentDate]: state.isToday,
    });

    const dayNameClass = clsx(styles.dayName, {
        [styles.weekend]: state.dayType === "weekend",
    });

    const dateClass = clsx(styles.date, {
        [styles.weekend]: state.dayType === "weekend",
    });

    return (
        <button
            className={dateBlockClass}
            onClick={calendarStore.handleDateClick(date)}
            type="button"
        >
            <span className={dayNameClass}>
                {t(`days.short.${date.getDay() === 0 ? 6 : date.getDay() - 1}`)}
            </span>
            <span className={dateClass}>{date.getDate()}</span>
        </button>
    );
});
