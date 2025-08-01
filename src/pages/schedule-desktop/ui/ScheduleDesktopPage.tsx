"use client";

import "@/shared/styles/global.scss";

import { addDays } from "date-fns";
import { observer } from "mobx-react-lite";

import { NavBar } from "@/widgets/nav-bar-desktop";
import { ScheduleCarousel } from "@/widgets/schedule-carousel/ui/ScheduleCarousel";

import styles from "./ScheduleDesktopPage.module.scss";

export const ScheduleDesktopPage = observer(() => {
    const today = new Date();
    const days = [
        {
            title: "Понедельник",
            dayNumber: 1 as const,
            date: addDays(today, 0),
            type: "weekday" as const,
        },
        {
            title: "Вторник",
            dayNumber: 2 as const,
            date: addDays(today, 1),
            type: "weekday" as const,
        },
        {
            title: "Среда",
            dayNumber: 3 as const,
            date: addDays(today, 2),
            type: "weekday" as const,
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <NavBar />
            </div>
            <main className={styles.main}>
                <ScheduleCarousel days={days} />
            </main>
        </div>
    );
});

export default ScheduleDesktopPage;
