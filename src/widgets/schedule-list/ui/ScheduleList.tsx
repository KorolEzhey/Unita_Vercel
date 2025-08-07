import React, { useState } from "react";

import type { Lesson } from "@/entities/lesson";
import { LessonPage } from "@/pages/lesson/ui/LessonPage";

import s from "./ScheduleList.module.scss";

const mockLessons: Lesson[] = [
    {
        id: "1",
        title: "Математика",
        teacher: "Иванова И.И.",
        classroom: "301",
        class: "11А",
        weekPattern: 1,
        startTime: "08:30",
        endTime: "11:10",
        topics: [
            {
                id: "1.1",
                title: "Дифференциальные уравнения и интегральное исчисление",
                description:
                    "Основы дифференциальных уравнений первого порядка. Методы интегрирования функций.",
                materials: [
                    {
                        id: "1.1.1",
                        name: "Конспект лекции",
                        url: "/files/diff_eq_lecture.pdf",
                    },
                    {
                        id: "1.1.2",
                        name: "Задачник",
                        url: "/files/diff_eq_problems.pdf",
                    },
                ],
            },
        ],
    },
    {
        id: "2",
        title: "Русский язык",
        teacher: "Петров П.П.",
        classroom: "205",
        class: "11А",
        weekPattern: 1,
        startTime: "11:20",
        endTime: "14:00",
        topics: [
            {
                id: "2.1",
                title: "Синтаксис сложного предложения",
                description: "Виды сложных предложений и их особенности",
            },
        ],
    },
    {
        id: "3",
        title: "Физика",
        teacher: "Сидоров С.С.",
        classroom: "401",
        class: "11А",
        weekPattern: 1,
        startTime: "14:10",
        endTime: "16:50",
        topics: [
            {
                id: "3.1",
                title: "Механика",
                description: "Законы Ньютона и их применение",
                materials: [
                    {
                        id: "3.1.1",
                        name: "Презентация",
                        url: "/files/mechanics_presentation.pdf",
                    },
                    {
                        id: "3.1.2",
                        name: "Лабораторная работа",
                        url: "/files/mechanics_lab.pdf",
                    },
                ],
            },
        ],
    },
];

export const ScheduleList = () => {
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const handleLessonClick = (lesson: Lesson) => {
        setSelectedLesson(lesson);
    };

    const handleClose = () => {
        setSelectedLesson(null);
    };

    return (
        <div className={s.root}>
            <ul className={s.list}>
                {mockLessons.map((lesson) => (
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
