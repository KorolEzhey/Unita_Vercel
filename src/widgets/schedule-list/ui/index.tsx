import React from "react";

import s from "./styles.module.scss";

const lessons = [
    { time: "08:30-11:10", subject: "Математика", teacher: "Иванова И.И." },
    { time: "11:20-14:00", subject: "Русский язык", teacher: "Петров П.П." },
    { time: "14:10-16:50", subject: "Физика", teacher: "Сидоров С.С." },
];

export const ScheduleList = () => (
    <div className={s.root}>
        <ul className={s.list}>
            {lessons.map((lesson, idx) => (
                <React.Fragment key={idx}>
                    <div className={s.time}>{lesson.time}</div>
                    <li className={s.item}>
                        <div className={s.subject}>{lesson.subject}</div>
                        <div className={s.teacher}>{lesson.teacher}</div>
                    </li>
                </React.Fragment>
            ))}
        </ul>
    </div>
);
