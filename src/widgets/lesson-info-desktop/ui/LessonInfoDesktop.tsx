import clsx from "clsx";
import { format, parseISO } from "date-fns";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import type { useForm } from "react-hook-form";

import { classStore } from "@/entities/class";
import type { LessonResponse, NewLesson } from "@/entities/lesson";
import { subjectStore } from "@/entities/subject";
import { useUser } from "@/entities/user";
import {
    Select as ClassSelect,
    Select as SubjectSelect,
} from "@/shared/ui/select";

import s from "./LessonInfoDesktop.module.scss";

type LessonInfoDesktopProps = {
    lesson?: LessonResponse;
    className?: string;
    lessonForm: ReturnType<typeof useForm<NewLesson>>;
    dateRef: React.RefObject<HTMLInputElement> | null;
    startTimeRef: React.RefObject<HTMLInputElement> | null;
    endTimeRef: React.RefObject<HTMLInputElement> | null;
};

export const LessonInfoDesktop: React.FC<LessonInfoDesktopProps> = observer(
    ({ lesson, className, lessonForm, dateRef, startTimeRef, endTimeRef }) => {
        const t = useTranslations();
        const [selectedSubject, setSelectedSubject] = useState(
            lesson?.subject.subjectID || 0
        );
        const [selectedClass, setSelectedClass] = useState(
            lesson?.class.classID || 0
        );
        const { data: user, isLoading } = useUser();

        useEffect(() => {
            subjectStore.fetchAll();
            classStore.fetchAll();
        }, []);

        return (
            <div className={clsx(s.root, className)}>
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
                        <div className={s.sectionTitle}>
                            {t("lesson.dateTime")}
                        </div>
                        <div className={s.dateTimeControls}>
                            <input
                                type="date"
                                ref={dateRef}
                                className={clsx(s.calendarInput, {
                                    [s.disabled]:
                                        !isLoading && user?.role !== "ADMIN",
                                })}
                                defaultValue={
                                    lesson &&
                                    format(
                                        parseISO(lesson.startTime),
                                        "yyyy-MM-dd"
                                    )
                                }
                                style={{ width: "120px" }}
                                disabled={!isLoading && user?.role !== "ADMIN"}
                            />
                            <div
                                className={clsx(s.timeInputWrapper, {
                                    [s.disabled]:
                                        !isLoading && user?.role !== "ADMIN",
                                })}
                                style={{ width: "172px" }}
                            >
                                <input
                                    type="time"
                                    ref={startTimeRef}
                                    defaultValue={
                                        lesson &&
                                        format(
                                            parseISO(lesson.startTime),
                                            "HH:mm"
                                        )
                                    }
                                    disabled={
                                        !isLoading && user?.role !== "ADMIN"
                                    }
                                />
                                -
                                <input
                                    type="time"
                                    ref={endTimeRef}
                                    defaultValue={
                                        lesson &&
                                        format(
                                            parseISO(lesson.endTime),
                                            "HH:mm"
                                        )
                                    }
                                    disabled={
                                        !isLoading && user?.role !== "ADMIN"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className={clsx(s.section, s.subjectAndClassRow)}>
                        <div>
                            <div className={s.sectionTitle}>
                                {t("lesson.subject")}
                            </div>
                            <SubjectSelect
                                selected={selectedSubject}
                                setSelected={(val) => {
                                    setSelectedSubject(val);
                                    lessonForm.setValue("subjectID", val);
                                }}
                                width={204}
                                array={subjectStore.subjects}
                                getLabel={(item) => item.name}
                                getValue={(item) => item.subjectId}
                                disabled={!isLoading && user?.role !== "ADMIN"}
                            />
                        </div>
                        <div>
                            <div className={s.sectionTitle}>
                                {t("dive_table.class")}
                            </div>
                            <ClassSelect
                                selected={selectedClass}
                                setSelected={(val) => {
                                    setSelectedClass(val);
                                    lessonForm.setValue("classID", val);
                                }}
                                width={88}
                                array={classStore.classes}
                                getLabel={(item) => item.name}
                                getValue={(item) => item.classId}
                                disabled={!isLoading && user?.role !== "ADMIN"}
                            />
                        </div>
                    </div>

                    <div className={s.section}>
                        <div className={s.sectionTitle}>
                            {t("lesson.topic")}
                        </div>
                        <input
                            type="text"
                            className={s.inputField}
                            placeholder={t("lesson.enterTopic")}
                            {...lessonForm.register("theme")}
                        />
                    </div>

                    <div className={s.section}>
                        <div className={s.sectionTitle}>
                            {t("lesson.description")}
                        </div>
                        <textarea
                            className={s.textareaField}
                            placeholder={t("lesson.enterDescription")}
                            {...lessonForm.register("description")}
                        />
                    </div>
                </div>
            </div>
        );
    }
);
