import clsx from "clsx";
import { addDays } from "date-fns";
import useEmblaCarousel from "embla-carousel-react";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { match } from "ts-pattern";

import { ScheduleList } from "@/widgets/schedule-list/ui/ScheduleList";

import styles from "./ScheduleCarousel.module.scss";

type DayType = "weekend" | "weekday";

type DayInfo = {
    title: string;
    dayNumber: 1 | 2 | 3;
    date: Date;
    type: DayType;
};

type Props = {
    days?: DayInfo[];
};

const getDayTitle = (date: Date): string => {
    const days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];
    return days[date.getDay()];
};

const getDayType = (date: Date): DayType => {
    return match(date.getDay())
        .with(0, 6, () => "weekend" as const)
        .otherwise(() => "weekday" as const);
};

const getDayNumber = (date: Date): 1 | 2 | 3 => {
    const day = date.getDay();
    if (day === 0 || day === 6) return 1;
    if (day <= 2) return 1;
    if (day <= 4) return 2;
    return 3;
};

const generateDays = (startDate: Date, count: number): DayInfo[] => {
    return Array.from({ length: count }, (_, i) => {
        const date = addDays(startDate, i);
        return {
            title: getDayTitle(date),
            date,
            type: getDayType(date),
            dayNumber: getDayNumber(date),
        };
    });
};

// Используем текущую дату для начала списка дней
const DEFAULT_DATE = new Date(2025, 6, 29); // 29 июля 2025
const DEFAULT_DAYS = generateDays(DEFAULT_DATE, 14);

export const ScheduleCarousel: React.FC<Props> = observer(
    ({ days = DEFAULT_DAYS }) => {
        const [emblaRef, emblaApi] = useEmblaCarousel({
            align: "start",
            dragFree: true,
            containScroll: "keepSnaps",
        });

        const [isReady, setIsReady] = useState(false);

        useEffect(() => {
            if (!emblaApi) return;

            const scrollTimeout = setTimeout(() => {
                emblaApi.scrollTo(0, true);
                setIsReady(true);
            }, 300);

            return () => clearTimeout(scrollTimeout);
        }, [emblaApi]);

        return (
            <div
                className={clsx(styles.carousel, {
                    [styles.ready]: isReady,
                })}
            >
                <div className={styles.viewport} ref={emblaRef}>
                    <div className={styles.container}>
                        {days.map((day, index) => (
                            <div
                                key={index}
                                className={clsx(styles.slide, {
                                    [styles.weekend]: day.type === "weekend",
                                })}
                            >
                                <div className={styles.dayHeader}>
                                    <h3 className={styles.dayTitle}>
                                        {day.title}
                                    </h3>
                                </div>
                                <ScheduleList day={day.dayNumber} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);
