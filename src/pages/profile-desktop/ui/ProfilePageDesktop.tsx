"use client";
import "@/shared/styles/global.scss";
import s from "./ProfilePageDesktop.module.scss";

import { NavBar } from "@/widgets/nav-bar-desktop";
import { PageTitle } from "@/shared/ui/page-title";
import { useTranslations } from "next-intl";
import { ProfileCardDesktop } from "@/widgets/profile-card-desktop";

const user = {
    id: "1",
    surname: "Иванов",
    name: "Иван",
    patronymic: "Иванович",
    jobTitle: "Учитель",
};

const profileFile = {
    id: "install-1",
    fileName: "Иванов 2025.pdf",
    fileUrl: "/files/Ivanov_2025.pdf",
};

export default function Home() {
    const t = useTranslations("navigation");

    return (
        <div className={s.container}>
            <div className={s.sidebar}>
                <NavBar />
            </div>

            <div className={s.topbar}>
                <PageTitle title={t("profile")} />
            </div>

            <div className={s.content}>
                <ProfileCardDesktop user={user} file={profileFile} />
            </div>
        </div>
    );
}
