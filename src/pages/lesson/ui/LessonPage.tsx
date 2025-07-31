import { useTranslations } from "next-intl";
import React from "react";

import type { Lesson } from "@/entities/lesson";
import { FileInstallButton } from "@/features/installation-files/ui/FileInstallButton";
import ArrowBackIcon from "@/shared/icons/ArrowBack.svg";

import s from "./LessonPage.module.scss";

type LessonPageProps = {
    lesson: Lesson;
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
                        {lesson.startTime} - {lesson.endTime}
                    </div>
                </div>

                <div className={s.lessonCard}>
                    <div className={s.title}>{lesson.title}</div>
                    <div className={s.teacher}>{lesson.teacher}</div>
                </div>

                <div className={s.topics}>
                    {lesson.topics.map((topic) => (
                        <div key={topic.id} className={s.topic}>
                            <div className={s.section}>
                                <div className={s.sectionLabel}>
                                    {t("topic")}
                                </div>
                                <div className={s.topicTitle}>
                                    {topic.title}
                                </div>
                            </div>
                            {topic.description && (
                                <div className={s.section}>
                                    <div className={s.sectionLabel}>
                                        {t("description")}
                                    </div>
                                    <div className={s.topicDescription}>
                                        {topic.description}
                                    </div>
                                </div>
                            )}
                            {topic.materials && topic.materials.length > 0 && (
                                <div className={s.section}>
                                    <div className={s.materials}>
                                        {topic.materials.map((material) => (
                                            <FileInstallButton
                                                key={material.id}
                                                fileName={material.name}
                                                fileUrl={material.url}
                                                resolution="mobile"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
