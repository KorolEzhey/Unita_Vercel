"use client";

import clsx from "clsx";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import type { LessonResponse } from "@/entities/lesson";
import { lessonStore } from "@/entities/lesson/model/lesson.store";
import { teacherStore } from "@/entities/teacher";
import { useUser } from "@/entities/user";
import { AddLesson } from "@/features/add-lesson";
import LessonDesktopPage from "@/pages/lesson-desktop";
import { shortenFullName } from "@/shared/lib/shortenFullName";
import { DesktopGuard } from "@/shared/ui";
import { PageTitle } from "@/shared/ui/page-title";
import { Select as TeacherSelect } from "@/shared/ui/select";
import { NavBar } from "@/widgets/nav-bar-desktop";
import { ScheduleCarousel } from "@/widgets/schedule-carousel";

import { handleDateEnter } from "../model/handlers";
import s from "./ScheduleDesktopPage.module.scss";

export default observer(function ScheduleDesktopPage() {
    const t = useTranslations();
    const [selectedLesson, setSelectedLesson] = useState<LessonResponse | null>(
        null
    );
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { data: user, isLoading } = useUser();

    const handleLessonClick = (lesson: LessonResponse) => {
        setIsOpen(false);
        setSelectedLesson(lesson);
    };

    const handleClose = () => {
        setSelectedLesson(null);
    };

    useEffect(() => {
        teacherStore.fetchAll();
    }, []);

    useEffect(() => {
        if (!isLoading && user?.role === "TEACHER") {
            setSelectedTeacher(user.id);
        }
    }, [isLoading, user]);

    useEffect(() => {
        if (
            teacherStore.teachers.length > 0 &&
            selectedTeacher === null &&
            user?.role !== "TEACHER"
        ) {
            setSelectedTeacher(teacherStore.teachers[0].teacherId);
        }
    }, [selectedTeacher, user?.role]);

    useEffect(() => {
        if (selectedTeacher === null) return;
        lessonStore.fetchLessonsByTeacher(selectedTeacher);
    }, [selectedTeacher]);

    return (
        <DesktopGuard>
            <div className={s.root}>
                <div className={s.sidebar}>
                    <NavBar />
                </div>
                <div className={s.content}>
                    <div className={s.pageHeader}>
                        <PageTitle title={t("navigation.schedule")} />
                        <input
                            type="date"
                            className={s.calendarInput}
                            defaultValue={format(selectedDate, "yyyy-MM-dd")}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleDateEnter(e, setSelectedDate);
                                }
                            }}
                        />
                        <div className={s.header}>
                            <TeacherSelect
                                selected={selectedTeacher}
                                setSelected={setSelectedTeacher}
                                width={200}
                                array={teacherStore.teachers}
                                getLabel={(item) =>
                                    shortenFullName(item.fullName)
                                }
                                getValue={(item) => item.teacherId}
                                disabled={!isLoading && user?.role !== "ADMIN"}
                            />
                            {!isLoading && user?.role === "ADMIN" && (
                                <AddLesson handleAdd={() => setIsOpen(true)} />
                            )}
                        </div>
                    </div>
                    <div
                        className={clsx(s.contentWrapper, {
                            [s.withLesson]: selectedLesson !== null,
                        })}
                    >
                        <ScheduleCarousel
                            lessonsByTeacher={lessonStore.lessonsByTeacher}
                            onLessonSelect={handleLessonClick}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </div>
                    {selectedLesson && (
                        <div className={s.lessonOverlay}>
                            <LessonDesktopPage
                                lesson={selectedLesson}
                                onClose={handleClose}
                            />
                        </div>
                    )}
                    {isOpen && (
                        <div className={s.lessonOverlay}>
                            <LessonDesktopPage
                                onClose={() => setIsOpen(false)}
                                selectedTeacher={selectedTeacher || 0}
                            />
                        </div>
                    )}
                </div>
            </div>
        </DesktopGuard>
    );
});
