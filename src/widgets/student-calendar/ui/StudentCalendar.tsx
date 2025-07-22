"use client";

import capitalize from "capitalize";
import clsx from "clsx";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef } from "react";

import { calendarStore } from "../model/calendarStore";
import { DateBlock } from "./DateBlock";
import styles from "./StudentCalendar.module.scss";

type StudentCalendarProps = {
    className?: string;
};

export const StudentCalendar = observer(
    ({ className: _className }: StudentCalendarProps) => {
        const t = useTranslations("calendar");
        const [emblaRef, emblaApi] = useEmblaCarousel({
            align: "start",
            dragFree: true,
        });

        // Храним предыдущий месяц, чтобы не обновлять лишний раз
        const prevMonthRef = useRef<number>(
            calendarStore.currentDate.getMonth()
        );

        const updateCurrentMonth = useCallback((api: EmblaCarouselType) => {
            if (!api) return;
            const scroll = api.scrollProgress();
            const daysFromStart = Math.round(scroll * 92);
            // Ограничиваем индекс в допустимых границах
            const safeIndex = Math.max(
                0,
                Math.min(daysFromStart, calendarStore.dates.length - 1)
            );
            const currentDate = calendarStore.dates[safeIndex];
            const currentMonth = currentDate.getMonth();
            if (prevMonthRef.current !== currentMonth) {
                prevMonthRef.current = currentMonth;
                calendarStore.setCurrentDate(currentDate);
            }
        }, []);

        useEffect(() => {
            if (!emblaApi) return;

            // Обновляем месяц во время скролла
            emblaApi.on("scroll", () => updateCurrentMonth(emblaApi));

            // Плавный скролл к текущей дате при монтировании
            const scrollTimeout = setTimeout(() => {
                emblaApi.scrollTo(31, true);
                calendarStore.setReady(true);
            }, 300);

            return () => {
                emblaApi.off("scroll", () => updateCurrentMonth(emblaApi));
                clearTimeout(scrollTimeout);
                // Сбрасываем состояние при размонтировании
                calendarStore.setReady(false);
            };
        }, [emblaApi, updateCurrentMonth]);

        return (
            <div
                className={clsx(styles.calendar, {
                    [styles.calendarReady]: calendarStore.isReady,
                })}
            >
                <h2 className={styles.month}>
                    {capitalize(
                        t(`months.long.${calendarStore.currentDate.getMonth()}`)
                    )}
                </h2>
                <div className={styles.carouselWrapper} ref={emblaRef}>
                    <div className={styles.carouselContainer}>
                        {calendarStore.dates.map((date, index) => (
                            <DateBlock key={index} date={date} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);
