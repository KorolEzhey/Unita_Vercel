import clsx from "clsx";
import { isSameDay, parseISO } from "date-fns";
import useEmblaCarousel from "embla-carousel-react";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import type { Lesson, LessonResponse } from "@/entities/lesson";
import { generateWeekDays } from "@/shared/lib/generateWeekDays";
import { ScheduleListDesktop } from "@/widgets/schedule-list-desktop/ui/ScheduleListDesktop";

import styles from "./ScheduleCarousel.module.scss";

type Props = {
    lessonsByTeacher: LessonResponse[];
    onLessonSelect?: (lesson: LessonResponse, date: Date) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
};

export const ScheduleCarousel: React.FC<Props> = observer(
    ({ lessonsByTeacher, onLessonSelect, selectedDate, setSelectedDate }) => {
        const t = useTranslations("calendar");
        const locale = useLocale();
        const [selectedLesson, setSelectedLesson] =
            useState<LessonResponse | null>(null);

        const days = generateWeekDays(selectedDate, t, locale);

        const handleLessonSelect = (lesson: LessonResponse, date: Date) => {
            setSelectedLesson(lesson);
            setSelectedDate(new Date(lesson.startTime));
            if (onLessonSelect) {
                onLessonSelect(lesson, date);
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
                const selectedIndex = days.findIndex((d) =>
                    isSameDay(d.date, selectedDate)
                );
                emblaApi.scrollTo(selectedIndex >= 0 ? selectedIndex : 0, true);
                setIsReady(true);
            }, 300);
            return () => clearTimeout(scrollTimeout);
        }, [emblaApi, days, selectedDate]);

        return (
            <div className={clsx(styles.carousel, { [styles.ready]: isReady })}>
                <div className={styles.viewport} ref={emblaRef}>
                    <div className={styles.container}>
                        {days.map((day, index) => {
                            const lessonsForDay = lessonsByTeacher.filter(
                                (lesson) =>
                                    isSameDay(
                                        parseISO(lesson.startTime),
                                        day.date
                                    )
                            );

                            return (
                                <div key={index} className={styles.slide}>
                                    <div className={styles.dayHeader}>
                                        <h3 className={styles.dayTitle}>
                                            {day.title}
                                        </h3>
                                    </div>
                                    <ScheduleListDesktop
                                        lessonsByTeacher={lessonsForDay}
                                        selectedLesson={selectedLesson}
                                        onLessonSelect={(lesson) =>
                                            handleLessonSelect(lesson, day.date)
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
);
