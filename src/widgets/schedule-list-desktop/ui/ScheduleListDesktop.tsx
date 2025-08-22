"use client";

import clsx from "clsx";
import { format, parseISO } from "date-fns";
import { useTranslations } from "next-intl";
import React from "react";

import type { Lesson, LessonResponse } from "@/entities/lesson";
import { LESSON_NUMBER_OFFSET } from "@/shared/lib/constants";

import s from "./ScheduleListDesktop.module.scss";

type ScheduleListDesktopProps = {
    lessonsByTeacher: LessonResponse[];
    selectedLesson: LessonResponse | null;
    onLessonSelect: (lesson: LessonResponse) => void;
};

export const ScheduleListDesktop: React.FC<ScheduleListDesktopProps> = ({
    lessonsByTeacher,
    selectedLesson,
    onLessonSelect,
}) => {
    const handleLessonClick = (lesson: LessonResponse) => {
        onLessonSelect(lesson);
    };

    const t = useTranslations();

    if (lessonsByTeacher?.length === 0) {
        return (
            <div className={s.root}>
                <div className={s.noLessons}>{t("status.noLessonsToday")}</div>
            </div>
        );
    }

    return (
        <div className={s.root}>
            <div className={s.container}>
                <div className={s.listContainer}>
                    <ul className={s.list}>
                        {lessonsByTeacher
                            .slice()
                            .sort(
                                (a, b) =>
                                    new Date(a.startTime).getTime() -
                                    new Date(b.startTime).getTime()
                            )
                            .map((lesson, index) => (
                                <li
                                    key={lesson.lessonID}
                                    className={s.listItem}
                                >
                                    <div className={s.lessonNumber}>
                                        {index + LESSON_NUMBER_OFFSET}
                                    </div>
                                    <div
                                        className={clsx(s.item, {
                                            [s.active]:
                                                selectedLesson?.lessonID ===
                                                lesson.lessonID,
                                        })}
                                        onClick={() =>
                                            handleLessonClick(lesson)
                                        }
                                    >
                                        <div className={s.headerContainer}>
                                            <div className={s.timeContainer}>
                                                <div className={s.time}>
                                                    {format(
                                                        parseISO(
                                                            lesson.startTime
                                                        ),
                                                        "HH:mm"
                                                    )}
                                                </div>
                                                <div className={s.divider}>
                                                    –
                                                </div>
                                                <div className={s.time}>
                                                    {format(
                                                        parseISO(
                                                            lesson.endTime
                                                        ),
                                                        "HH:mm"
                                                    )}
                                                </div>
                                            </div>
                                            <div className={s.classInfo}>
                                                {lesson.class.name}
                                            </div>
                                        </div>
                                        <div className={s.contentContainer}>
                                            <div className={s.subject}>
                                                {lesson.subject.name}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
