"use client";
import "@/shared/styles/global.scss";

import { useTranslations } from "next-intl";

import { DesktopGuard } from "@/shared/ui";
import { PageTitle } from "@/shared/ui/page-title";
import { NavBar } from "@/widgets/nav-bar-desktop";
import { ProfileCardDesktop } from "@/widgets/profile-card-desktop";

import s from "./ProfilePageDesktop.module.scss";

const profileFile = {
    id: "install-1",
    fileName: "Иванов 2025.pdf",
    fileUrl: "/files/Ivanov_2025.pdf",
};

export default function Home() {
    const t = useTranslations("navigation");

    return (
        <DesktopGuard>
            <div className={s.container}>
                <div className={s.sidebar}>
                    <NavBar />
                </div>

                <div className={s.topbar}>
                    <PageTitle title={t("profile")} />
                </div>

                <div className={s.content}>
                    <ProfileCardDesktop file={profileFile} />
                </div>
            </div>
        </DesktopGuard>
    );
}
