"use client";

import { useTranslations } from "next-intl";

import { useUser } from "@/entities/user";
import { FileInstallButton } from "@/features/installation-files";
import { LogOutButton } from "@/features/logout-button";
import { NavBar } from "@/widgets/nav-bar";
import { ProfileCard } from "@/widgets/profile-card";

import s from "./ProfilePage.module.scss";

export default function ProfilePage() {
    const t = useTranslations();
    const { data: user } = useUser();

    const profileFile = {
        id: "install-1",
        name: "Расписание.pdf",
        url: "/files/schedule.pdf",
    };

    return (
        <div className={s.root}>
            <NavBar />
            <main className={s.main}>
                <div className={s.container}>
                    <h1 className={s.title}>{t("navigation.profile")}</h1>
                    <ProfileCard id={user?.id ?? 0} />
                    <div className={s.fileInstallSection}>
                        <FileInstallButton
                            fileName={profileFile.name}
                            fileUrl={profileFile.url}
                            resolution="mobile"
                        />
                        <LogOutButton />
                    </div>
                </div>
            </main>
        </div>
    );
}
