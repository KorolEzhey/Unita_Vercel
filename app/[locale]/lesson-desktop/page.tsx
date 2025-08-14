import "@/shared/styles/global.scss";
import "@/app/layout.tsx";
import "@/app/favicon.ico";

import LessonDesktopPage from "@/pages/lesson-desktop";
import type { Lesson } from "@/entities/lesson";
import type { DayInfo } from "@/shared/lib/constants";

export type PageProps = {
    params?: Promise<{ locale?: string }>;
    searchParams?: Promise<any>;
};

export default function LessonDesktopPageWrapper({
    params,
    searchParams,
}: PageProps) {
    const lesson: Lesson = {
        id: "1",
        title: "Математика",
        teacher: "Иванов И.И.",
        startTime: "09:00",
        endTime: "10:20",
        description: "Алгебра — тема: функции",
        classroom: "201",
        class: "8А",
        weekPattern: 1,
        topics: [],
    };

    const day: DayInfo = {
        title: "Понедельник",
        dayNumber: 1,
        date: new Date(),
    };

    return <LessonDesktopPage lesson={lesson} day={day} />;
}
