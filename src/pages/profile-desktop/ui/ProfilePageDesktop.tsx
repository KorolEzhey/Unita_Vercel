"use client";
import "@/shared/styles/global.scss";

import { useTeacher } from "@/entities/teacher";
import { useUser } from "@/entities/user";
import { DesktopGuard } from "@/shared/ui";
import { PageTitle } from "@/shared/ui/page-title";
import { NavBar } from "@/widgets/nav-bar-desktop";
import { ProfileCardDesktop } from "@/widgets/profile-card-desktop";

import s from "./ProfilePageDesktop.module.scss";

export default function Home() {
    const { data: user } = useUser();

    // Используем хук учителя для получения данных
    // Для учителей user.id = teacherId
    const { data: teacher } = useTeacher(
        user?.role === "TEACHER" ? user.id : 0
    );

    // Отладочная информация
    console.log("ProfilePageDesktop - user:", user);
    console.log("ProfilePageDesktop - teacher:", teacher);
    console.log("ProfilePageDesktop - teacherId:", teacher?.teacherId);

    return (
        <DesktopGuard>
            <div className={s.container}>
                <div className={s.sidebar}>
                    <NavBar />
                </div>

                <div className={s.topbar}>
                    <PageTitle title="Профиль" />
                </div>

                <div className={s.content}>
                    <ProfileCardDesktop
                        teacherId={teacher?.teacherId}
                        resolution="desktop"
                    />
                </div>
            </div>
        </DesktopGuard>
    );
}
