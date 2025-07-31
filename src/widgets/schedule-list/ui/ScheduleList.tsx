import React, { useState } from "react";
import type { Lesson } from "@/entities/lesson";
import { LessonPage } from "@/pages/lesson/ui/LessonPage";

import s from "./ScheduleList.module.scss";

const mockLessonsDay1: Lesson[] = [
    {
        id: "1.1",
        title: "Русский язык",
        teacher: "Иванова И.И.",
        classroom: "301",
        startTime: "08:30",
        endTime: "10:00",
        weekPattern: 1,
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
        teacher: "Петров П.П.",
        classroom: "205",
        startTime: "10:10",
        endTime: "11:40",
        topics: [
            {
                id: "1.2.1",
                title: "Тема урока",
                description: "Описание темы урока",
            },
        ],
    },
    {
        id: "1.3",
        title: "История",
        teacher: "Сидоров С.С.",
        classroom: "401",
        startTime: "12:10",
        endTime: "13:40",
        topics: [
            {
                id: "1.3.1",
                title: "Тема урока",
                description: "Описание темы урока",
            },
        ],
    },
    {
        id: "1.4",
        title: "Литература",
        teacher: "Николаева Н.Н.",
        classroom: "302",
        startTime: "13:50",
        endTime: "15:20",
        topics: [
            {
                id: "1.4.1",
                title: "Тема урока",
                description: "Описание темы урока",
            },
        ],
    },
];

const mockLessonsDay2: Lesson[] = [
    {
        id: "2.1",
        title: "Математика",
        teacher: "Петров П.П.",
        classroom: "205",
        startTime: "08:30",
        endTime: "10:00",
        weekPattern: 2,
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
        title: "История",
        teacher: "Сидоров С.С.",
        classroom: "401",
        startTime: "10:10",
        endTime: "11:40",
        topics: [
            {
                id: "2.2.1",
                title: "Тема урока",
                description: "Описание темы урока",
            },
        ],
    },
    {
        id: "2.3",
        title: "Литература",
        teacher: "Николаева Н.Н.",
        classroom: "302",
        startTime: "12:10",
        endTime: "13:40",
        topics: [
            {
                id: "2.3.1",
                title: "Тема урока",
                description: "Описание темы урока",
            },
        ],
    },
    {
        id: "2.4",
        title: "Русский язык",
        teacher: "Иванова И.И.",
        classroom: "301",
        startTime: "13:50",
        endTime: "15:20",
        topics: [
            {
                id: "2.4.1",
                title: "Тема урока",
                description: "Описание темы урока",
            },
        ],
    },
];

const mockLessonsDay3: Lesson[] = [
    {
        id: "3.1",
        title: "История",
        teacher: "Сидоров С.С.",
        classroom: "401",
        startTime: "08:30",
        endTime: "10:00",
        weekPattern: 3,
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
        title: "Литература",
        teacher: "Николаева Н.Н.",
        classroom: "302",
        startTime: "10:10",
        endTime: "11:40",
        topics: [
            {
                id: "3.2.1",
                title: "Тема урока",
                description: "Описание темы урока",
            },
        ],
    },
    {
        id: "3.3",
        title: "Русский язык",
        teacher: "Иванова И.И.",
        classroom: "301",
        startTime: "12:10",
        endTime: "13:40",
        topics: [
            {
                id: "3.3.1",
                title: "Тема урока",
                description: "Описание темы урока",
            },
        ],
    },
    {
        id: "3.4",
        title: "Математика",
        teacher: "Петров П.П.",
        classroom: "205",
        startTime: "13:50",
        endTime: "15:20",
        topics: [
            {
                id: "3.4.1",
                title: "Тема урока",
                description: "Описание темы урока",
            },
        ],
    },
];

type ScheduleListProps = {
    day?: 1 | 2 | 3;
};

export const ScheduleList: React.FC<ScheduleListProps> = ({ day = 1 }) => {
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const handleLessonClick = (lesson: Lesson) => {
        setSelectedLesson(lesson);
    };

    const handleClose = () => {
        setSelectedLesson(null);
    };

    const getLessons = () => {
        switch (day) {
            case 1:
                return mockLessonsDay1;
            case 2:
                return mockLessonsDay2;
            case 3:
                return mockLessonsDay3;
            default:
                return mockLessonsDay1;
        }
    };

    const lessons = getLessons();

    return (
        <div className={s.root}>
            <ul className={s.list}>
                {lessons.map((lesson) => (
                    <React.Fragment key={lesson.id}>
                        <div className={s.time}>
                            {lesson.startTime}-{lesson.endTime}
                        </div>
                        <li
                            className={s.item}
                            onClick={() => handleLessonClick(lesson)}
                        >
                            <div className={s.subject}>{lesson.title}</div>
                            <div className={s.teacher}>{lesson.teacher}</div>
                        </li>
                    </React.Fragment>
                ))}
            </ul>

            {selectedLesson && (
                <LessonPage lesson={selectedLesson} onClose={handleClose} />
            )}
        </div>
    );
};
