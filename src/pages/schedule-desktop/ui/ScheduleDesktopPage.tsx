"use client";

import "@/shared/styles/global.scss";
import { observer } from "mobx-react-lite";
import { NavBar } from "@/widgets/nav-bar-desktop";
import { ScheduleList } from "@/widgets/schedule-list/ui/ScheduleList";
import { ScheduleCarousel } from "@/widgets/schedule-carousel/ui/ScheduleCarousel";
import styles from "./ScheduleDesktopPage.module.scss";

export const ScheduleDesktopPage = observer(() => {
    const days = [
        { title: "Понедельник", dayNumber: 1 as const },
        { title: "Вторник", dayNumber: 2 as const },
        { title: "Среда", dayNumber: 3 as const },
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
