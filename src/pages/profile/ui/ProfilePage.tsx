"use client";

import { useTranslations } from "next-intl";

import { useStudent } from "@/entities/student";
import { useUser } from "@/entities/user";
import { ClassFilesList } from "@/features/installation-files";
import { LogOutButton } from "@/features/logout-button";
import { NavBar } from "@/widgets/nav-bar";
import { ProfileCard } from "@/widgets/profile-card";

import s from "./ProfilePage.module.scss";

export default function ProfilePage() {
    const t = useTranslations();
    const { data: user } = useUser();
    const { data: student } = useStudent(user?.id ?? 0);

    return (
        <div className={s.root}>
            <NavBar />
            <main className={s.main}>
                <div className={s.container}>
                    <h1 className={s.title}>{t("navigation.profile")}</h1>
                    <ProfileCard id={user?.id ?? 0} />
                    <div className={s.fileInstallSection}>
                        {student?.classId && (
                            <ClassFilesList
                                classId={student.classId}
                                resolution="mobile"
                            />
                        )}
                        <LogOutButton />
                    </div>
                </div>
            </main>
        </div>
    );
}
