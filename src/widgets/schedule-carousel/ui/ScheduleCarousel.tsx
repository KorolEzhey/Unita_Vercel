import clsx from "clsx";
import { addDays, startOfWeek } from "date-fns";
import useEmblaCarousel from "embla-carousel-react";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { type Lesson } from "@/entities/lesson";
import {
    type DayInfo,
    getWeekDays,
    type WeekDay,
    WORK_DAYS_COUNT,
} from "@/shared/lib/constants";
import { ScheduleListDesktop } from "@/widgets/schedule-list-desktop/ui/ScheduleListDesktop";

import styles from "./ScheduleCarousel.module.scss";

type Props = {
    days?: DayInfo[];
    onLessonSelect?: (lesson: Lesson, day: DayInfo) => void;
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    onNextWeek?: () => void;
    onPrevWeek?: () => void;
};

const generateDays = (
    startDate: Date,
    t: (key: string) => string
): DayInfo[] => {
    const weekDays = getWeekDays(t);
    return Array.from({ length: WORK_DAYS_COUNT }, (_, i) => {
        const date = addDays(startDate, i);
        const dayNumber = (i + 1) as WeekDay;
        return {
            title: weekDays[dayNumber],
            dayNumber,
            date,
        };
    });
};

export const ScheduleCarousel: React.FC<Props> = observer(
    ({ days: propDays, onLessonSelect, selectedDate }) => {
        const t = useTranslations();
        const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
            null
        );

        // Начало недели для выбранной даты
        const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const days = propDays ?? generateDays(weekStart, t);

        const handleLessonSelect = (lesson: Lesson, day: DayInfo) => {
            setSelectedLesson(lesson);
            if (onLessonSelect) {
                onLessonSelect(lesson, day);
            }
        };

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
                            <div key={index} className={styles.slide}>
                                <div className={styles.dayHeader}>
                                    <h3 className={styles.dayTitle}>
                                        {day.title}
                                    </h3>
                                </div>
                                <ScheduleListDesktop
                                    day={day.dayNumber}
                                    selectedLesson={selectedLesson}
                                    onLessonSelect={(lesson) =>
                                        handleLessonSelect(lesson, day)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);
