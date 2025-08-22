import { format, parseISO } from "date-fns";
import { useTranslations } from "next-intl";
import React from "react";

import type { LessonResponse } from "@/entities/lesson";
import { LessonFilesList } from "@/features/installation-files";
import ArrowBackIcon from "@/shared/icons/ArrowBack.svg";
import { shortenFullName } from "@/shared/lib/shortenFullName";

import s from "./LessonPage.module.scss";

type LessonPageProps = {
    lesson: LessonResponse;
    onClose: () => void;
};

export const LessonPage: React.FC<LessonPageProps> = ({ lesson, onClose }) => {
    const t = useTranslations("lesson");
    return (
        <div className={s.overlay}>
            <div className={s.content} onClick={(e) => e.stopPropagation()}>
                <div className={s.headerRow}>
                    <button
                        className={s.arrowBackButton}
                        onClick={onClose}
                        aria-label="Назад"
                    >
                        <ArrowBackIcon width={36} height={36} />
                    </button>
                    <div className={s.time}>
                        {format(parseISO(lesson.startTime), "HH:mm")}-
                        {format(parseISO(lesson.endTime), "HH:mm")}
                    </div>
                </div>

                <div className={s.lessonCard}>
                    <div className={s.title}>{lesson.subject.name}</div>
                    <div className={s.teacher}>
                        {shortenFullName(lesson.teacher.user.fullName)}
                    </div>
                </div>

                <div className={s.topics}>
                    <div className={s.section}>
                        <div className={s.sectionLabel}>{t("topic")}</div>
                        <div className={s.topicTitle}>{lesson.theme}</div>
                    </div>

                    {lesson.description && (
                        <div className={s.section}>
                            <div className={s.sectionLabel}>
                                {t("description")}
                            </div>
                            <div className={s.topicDescription}>
                                {lesson.description}
                            </div>
                        </div>
                    )}

                    {/* Файлы урока */}
                    <div className={s.filesSection}>
                        <div className={s.sectionLabel}>Файлы</div>
                        <LessonFilesList lessonId={lesson.lessonID} />
                    </div>
                </div>
            </div>
        </div>
    );
};
