import { format, parseISO } from "date-fns";
import React, { useState } from "react";

import type { LessonResponse } from "@/entities/lesson";
import { LessonPage } from "@/pages/lesson/ui/LessonPage";
import { LESSON_NUMBER_OFFSET } from "@/shared/lib/constants";
import { shortenFullName } from "@/shared/lib/shortenFullName";

import NoLessonsImage from "./noLessons.svg";
import s from "./ScheduleList.module.scss";

type ScheduleListProps = {
    lessons: LessonResponse[];
};

export const ScheduleList: React.FC<ScheduleListProps> = ({ lessons }) => {
    const [selectedLesson, setSelectedLesson] = useState<LessonResponse | null>(
        null
    );

    const handleLessonClick = (lesson: LessonResponse) => {
        setSelectedLesson(lesson);
    };

    const handleClose = () => {
        setSelectedLesson(null);
    };

    if (lessons.length === 0) {
        return (
            <div className={s.noLessons}>
                <NoLessonsImage />
                <p style={{ fontSize: "24px" }}>
                    Сегодня отдыхаем!
                    <br />
                    Уроков нет
                </p>
            </div>
        );
    }

    return (
        <div className={s.root}>
            <ul className={s.list}>
                {lessons
                    .slice()
                    .sort(
                        (a, b) =>
                            new Date(a.startTime).getTime() -
                            new Date(b.startTime).getTime()
                    )
                    .map((lesson, index) => (
                        <React.Fragment key={lesson.lessonID}>
                            <div className={s.time}>
                                {format(parseISO(lesson.startTime), "HH:mm")}-
                                {format(parseISO(lesson.endTime), "HH:mm")}
                            </div>
                            <div className={s.listItem}>
                                <div className={s.lessonNumber}>
                                    {index + LESSON_NUMBER_OFFSET}
                                </div>
                                <li
                                    className={s.item}
                                    onClick={() => handleLessonClick(lesson)}
                                >
                                    <div className={s.subject}>
                                        {lesson.subject.name}
                                    </div>
                                    <div className={s.teacher}>
                                        {shortenFullName(
                                            lesson.teacher.user.fullName
                                        )}
                                    </div>
                                </li>
                            </div>
                        </React.Fragment>
                    ))}
            </ul>

            {selectedLesson && (
                <LessonPage lesson={selectedLesson} onClose={handleClose} />
            )}
        </div>
    );
};
