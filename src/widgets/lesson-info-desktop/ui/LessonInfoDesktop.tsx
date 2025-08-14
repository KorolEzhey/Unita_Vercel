import { format } from "date-fns";
import { useTranslations } from "next-intl";
import React from "react";

import { type Lesson } from "@/entities/lesson";
import CalendarIcon from "@/shared/icons/Calendar.svg";
import { SubjectSelect } from "@/shared/ui/subject-select/SubjectSelect";
import { TimeSelect } from "@/shared/ui/time-select/TimeSelect";

import s from "./LessonInfoDesktop.module.scss";

type LessonInfoDesktopProps = {
    lesson: Lesson;
    className?: string;
    dayTitle: string;
    date?: Date;
};

export const LessonInfoDesktop: React.FC<LessonInfoDesktopProps> = ({
    lesson,
    className,
    date,
}) => {
    const t = useTranslations();

    return (
        <div className={`${s.root} ${className ?? ""}`}>
            <div className={s.container}>
                <div className={s.fields}>
                    <div className={s.field}>
                        <div className={s.fieldContent} />
                    </div>
                    <div className={s.field}>
                        <div className={s.fieldContent} />
                    </div>
                </div>
                <div className={s.section}>
                    <div className={s.sectionTitle}>{t("lesson.dateTime")}</div>
                    <div className={s.dateTimeControls}>
                        <button className={s.dateButton}>
                            <span>
                                {format(date ?? new Date(), "d.MM.yyyy")}
                            </span>
                            <CalendarIcon
                                width={16}
                                height={16}
                                viewBox="0 0 32 32"
                            />
                        </button>
                        <TimeSelect
                            className={s.timeSelect}
                            value={`${lesson.startTime}-${lesson.endTime}`}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className={s.section}>
                    <div className={s.sectionTitle}>{t("lesson.subject")}</div>
                    <SubjectSelect value={lesson.title} disabled={true} />
                </div>

                <div className={s.section}>
                    <div className={s.sectionTitle}>{t("lesson.topic")}</div>
                    <input
                        type="text"
                        className={s.inputField}
                        placeholder={t("lesson.enterTopic")}
                    />
                </div>

                <div className={s.section}>
                    <div className={s.sectionTitle}>
                        {t("lesson.description")}
                    </div>
                    <textarea
                        className={s.textareaField}
                        placeholder={t("lesson.enterDescription")}
                    />
                </div>
            </div>
        </div>
    );
};
