import clsx from "clsx";
import { addDays } from "date-fns";
import useEmblaCarousel from "embla-carousel-react";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

import { type Lesson } from "@/entities/lesson";
import { type DayInfo, WEEK_DAYS, type WeekDay } from "@/shared/lib/constants";
import { ScheduleListDesktop } from "@/widgets/schedule-list-desktop/ui/ScheduleListDesktop";

import styles from "./ScheduleCarousel.module.scss";

type Props = {
    days?: DayInfo[];
    onLessonSelect?: (lesson: Lesson, day: DayInfo) => void;
};

const generateDays = (startDate: Date): DayInfo[] => {
    return Array.from({ length: 5 }, (_, i) => {
        const date = addDays(startDate, i);
        const dayNumber = (i + 1) as WeekDay;
        return {
            title: WEEK_DAYS[dayNumber],
            dayNumber,
            date,
        };
    });
};

const DEFAULT_DATE = new Date(2025, 6, 28);

export const ScheduleCarousel: React.FC<Props> = observer(
    ({ onLessonSelect }) => {
        const [currentWeek] = useState(0);
        const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
            null
        );

        const days = generateDays(addDays(DEFAULT_DATE, currentWeek * 7));

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
