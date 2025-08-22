"use client";
import "@/shared/styles/global.scss";

import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import type { LessonResponse } from "@/entities/lesson";
import { lessonStore } from "@/entities/lesson/model/lesson.store";
import { studentStore } from "@/entities/student";
import { useUser } from "@/entities/user";
import { StudentCalendar } from "@/features/student-calendar";
import { calendarStore } from "@/features/student-calendar/model/calendarStore";
import { NavBar } from "@/widgets/nav-bar";
import { ScheduleList } from "@/widgets/schedule-list";

import s from "./SchedulePage.module.scss";

export default observer(function Home() {
    const { data: user, isLoading } = useUser();
    const [lessonsByDay, setLessonsByDay] = useState<LessonResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!isLoading && user?.role === "STUDENT") {
                const response = await studentStore.fetchStudentById(user.id);
                lessonStore.fetchLessonsByClass(response.classId);
            }
        };

        fetchData();
    }, [isLoading, user]);

    useEffect(() => {
        if (!calendarStore.selectedDate) return;

        const normalizeDate = (d: Date) =>
            new Date(d.getFullYear(), d.getMonth(), d.getDate());

        const selectedDateNorm = normalizeDate(calendarStore.selectedDate);

        const filteredLessons = lessonStore.lessonsByClass.filter((lesson) => {
            const lessonDateNorm = normalizeDate(new Date(lesson.startTime));
            return selectedDateNorm.getTime() === lessonDateNorm.getTime();
        });

        setLessonsByDay(filteredLessons);
    }, [calendarStore.selectedDate, lessonStore.lessonsByClass]);

    return (
        <div className={s.root}>
            <div className={s.calendar}>
                <StudentCalendar />
            </div>

            <div className={s.schedule}>
                <ScheduleList lessons={lessonsByDay} />
            </div>

            <div className={s.navBar}>
                <NavBar />
            </div>
        </div>
    );
});
