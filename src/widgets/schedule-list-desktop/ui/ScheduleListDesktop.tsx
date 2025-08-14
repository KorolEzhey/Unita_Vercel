"use client";

import clsx from "clsx";
import React from "react";

import { type Lesson } from "@/entities/lesson";
import { LESSON_NUMBER_OFFSET } from "@/shared/lib/constants";

import s from "./ScheduleListDesktop.module.scss";

const mockSchedule: Record<number, Lesson[]> = {
    1: [
        {
            id: "1.1",
            title: "Русский язык",
            startTime: "08:30",
            endTime: "10:00",
            weekPattern: 1,
            class: "11A",
            teacher: "Иванова А.П.",
            classroom: "301",
            topics: [
                {
                    id: "1.1.1",
                    title: "Тема урока",
                    description: "Описание темы урока",
                },
            ],
        },
        {
            id: "1.2",
            title: "Математика",
            startTime: "10:10",
            endTime: "11:40",
            weekPattern: 1,
            class: "11A",
            teacher: "Петрова М.С.",
            classroom: "305",
            topics: [
                {
                    id: "1.2.1",
                    title: "Тема урока",
                    description: "Описание темы урока",
                },
            ],
        },
    ],
    2: [
        {
            id: "2.1",
            title: "История",
            startTime: "10:10",
            endTime: "11:40",
            weekPattern: 1,
            class: "10B",
            teacher: "Сидоров И.В.",
            classroom: "205",
            topics: [
                {
                    id: "2.1.1",
                    title: "Тема урока",
                    description: "Описание темы урока",
                },
            ],
        },
        {
            id: "2.2",
            title: "Физика",
            startTime: "12:10",
            endTime: "13:40",
            weekPattern: 1,
            class: "10B",
            teacher: "Кузнецов П.Р.",
            classroom: "401",
            topics: [
                {
                    id: "2.2.1",
                    title: "Тема урока",
                    description: "Описание темы урока",
                },
            ],
        },
    ],
    3: [
        {
            id: "3.1",
            title: "Информатика",
            startTime: "08:30",
            endTime: "10:00",
            weekPattern: 1,
            class: "9A",
            teacher: "Николаев С.А.",
            classroom: "310",
            topics: [
                {
                    id: "3.1.1",
                    title: "Тема урока",
                    description: "Описание темы урока",
                },
            ],
        },
        {
            id: "3.2",
            title: "Английский язык",
            startTime: "13:50",
            endTime: "15:20",
            weekPattern: 1,
            class: "9A",
            teacher: "Смирнова О.В.",
            classroom: "201",
            topics: [
                {
                    id: "3.2.1",
                    title: "Тема урока",
                    description: "Описание темы урока",
                },
            ],
        },
    ],
};

type ScheduleListDesktopProps = {
    day?: number;
    selectedLesson: Lesson | null;
    onLessonSelect: (lesson: Lesson) => void;
};

export const ScheduleListDesktop: React.FC<ScheduleListDesktopProps> = ({
    day = 1,
    selectedLesson,
    onLessonSelect,
}) => {
    const handleLessonClick = (lesson: Lesson) => {
        onLessonSelect(lesson);
    };

    const getLessons = () => {
        return mockSchedule[day] || [];
    };

    const lessons = getLessons();

    if (lessons?.length === 0) {
        return (
            <div className={s.root}>
                <div className={s.noLessons}>Сегодня нет уроков</div>
            </div>
        );
    }

    return (
        <div className={s.root}>
            <div className={s.container}>
                <div className={s.listContainer}>
                    <ul className={s.list}>
                        {lessons.map((lesson) => (
                            <li key={lesson.id} className={s.listItem}>
                                <div className={s.lessonNumber}>
                                    {lessons.indexOf(lesson) +
                                        LESSON_NUMBER_OFFSET}
                                </div>
                                <div
                                    className={clsx(s.item, {
                                        [s.active]:
                                            selectedLesson?.id === lesson.id,
                                    })}
                                    onClick={() => handleLessonClick(lesson)}
                                >
                                    <div className={s.headerContainer}>
                                        <div className={s.timeContainer}>
                                            <div className={s.time}>
                                                {lesson.startTime}
                                            </div>
                                            <div className={s.divider}>–</div>
                                            <div className={s.time}>
                                                {lesson.endTime}
                                            </div>
                                        </div>
                                        <div className={s.classInfo}>
                                            {lesson.class}
                                        </div>
                                    </div>
                                    <div className={s.contentContainer}>
                                        <div className={s.subject}>
                                            {lesson.title}
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
