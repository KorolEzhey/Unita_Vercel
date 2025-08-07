"use client";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { NavBarButton } from "@/shared/ui/nav-bar";

import GradeIcon from "./gradeIcon.svg";
import LogoutIcon from "./logoutIcon.svg";
import s from "./NavBarDesktop.module.scss";
import ScheduleIcon from "./scheduleIcon.svg";
import UserIcon from "./whiteUserIcon.svg";

type UserProfile = {
    surname: string;
    name: string;
    patronymic: string;
    jobTitle: string;
};

// TODO: заменить на реальные данные из API
const profile: UserProfile = {
    surname: "Иванов",
    name: "Иван",
    patronymic: "Иванович",
    jobTitle: "Учитель",
};

export const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("navigation");

    const handleNavigate = (route: string) => (): void => {
        if (!pathname?.includes(route)) {
            router.push(route);
        }
    };

    const isActive = (route: string): boolean =>
        pathname?.includes(route) ?? false;

    const formatUserName = ({
        surname,
        name,
        patronymic,
    }: UserProfile): string => `${surname} ${name[0]}.${patronymic[0]}.`;

    return (
        <div className={s.root}>
            <div className={s.top}>
                <NavBarButton
                    onClick={handleNavigate("/grade-book-desktop")}
                    icon={
                        <GradeIcon width={20} height={20} viewBox="0 0 32 32" />
                    }
                    isActive={isActive("/grade-book-desktop")}
                    isDesktop
                >
                    {t("grade-book")}
                </NavBarButton>
                <NavBarButton
                    onClick={handleNavigate("/schedule-desktop")}
                    icon={
                        <ScheduleIcon
                            width={20}
                            height={20}
                            viewBox="0 0 32 32"
                        />
                    }
                    isActive={isActive("/schedule-desktop")}
                    isDesktop
                >
                    {t("schedule")}
                </NavBarButton>
            </div>
            <div className={s.bottom}>
                <NavBarButton
                    className={s.profile}
                    onClick={handleNavigate("/profile-desktop")}
                    icon={
                        <UserIcon width={40} height={40} viewBox="0 0 40 40" />
                    }
                    isActive={isActive("/profile-desktop")}
                    isDesktop
                >
                    <div className="flex flex-col gap-1">
                        <span className="text-[14px]">
                            {formatUserName(profile)}
                        </span>
                        <span className="bg-[#E4E9FD] rounded-md w-max px-2 text-[12px]">
                            {profile.jobTitle}
                        </span>
                    </div>
                </NavBarButton>
                <NavBarButton
                    onClick={handleNavigate("/login")}
                    icon={
                        <LogoutIcon
                            width={20}
                            height={20}
                            viewBox="0 0 32 32"
                        />
                    }
                    isActive={isActive("/login")}
                    isDesktop
                >
                    {t("logout")}
                </NavBarButton>
            </div>
        </div>
    );
};
