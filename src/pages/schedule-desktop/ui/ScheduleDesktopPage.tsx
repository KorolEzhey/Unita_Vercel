"use client";

import clsx from "clsx";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { type Lesson } from "@/entities/lesson";
import LessonDesktopPage from "@/pages/lesson-desktop";
import CalendarIcon from "@/shared/icons/Calendar.svg";
import { type DayInfo } from "@/shared/lib/constants";
import { TeacherSelect } from "@/shared/ui/teacher-select/TeacherSelect";
import { NavBar } from "@/widgets/nav-bar-desktop";
import { ScheduleCarousel } from "@/widgets/schedule-carousel";

import s from "./ScheduleDesktopPage.module.scss";

const ScheduleDesktopPage = () => {
    const t = useTranslations();
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [currentDay, setCurrentDay] = useState<DayInfo | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleLessonClick = (lesson: Lesson, day: DayInfo) => {
        setSelectedLesson(lesson);
        setCurrentDay(day);
    };

    const handleClose = () => {
        setSelectedLesson(null);
        setCurrentDay(null);
    };

    return (
        <div className={s.root}>
            <div className={s.sidebar}>
                <NavBar />
            </div>
            <div className={s.content}>
                <div className={s.pageHeader}>
                    <h1 className={s.title}>{t("navigation.schedule")}</h1>
                    <div className={s.calendarButton} onClick={() => {}}>
                        <span>{format(selectedDate, "d.MM.yyyy")}</span>
                        <CalendarIcon
                            width={16}
                            height={16}
                            viewBox="0 0 32 32"
                        />
                    </div>
                    <TeacherSelect
                        className={s.teacherSelect}
                        onChange={(value) => {}}
                        disabled
                    />
                </div>
                <div
                    className={clsx(s.contentWrapper, {
                        [s.withLesson]: selectedLesson !== null,
                    })}
                >
                    <ScheduleCarousel
                        onLessonSelect={handleLessonClick}
                        selectedLesson={selectedLesson}
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                    />
                </div>
                {selectedLesson && (
                    <div className={s.lessonOverlay}>
                        <LessonDesktopPage
                            lesson={selectedLesson}
                            day={currentDay!}
                            onClose={handleClose}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleDesktopPage;
