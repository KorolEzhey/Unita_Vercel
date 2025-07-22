"use client";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { NavBarButton } from "@/shared/ui/nav-bar";

import GradeIcon from "./gradeIcon.svg";
import s from "./navBar.module.scss";
import ProfileIcon from "./profileIcon.svg";
import ScheduleIcon from "./scheduleIcon.svg";

export const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("navigation");

    const handleNavigate = (route: string) => (): void => {
        if (!pathname.includes(route)) {
            router.push(route);
        }
    };

    const isActive = (route: string): boolean => pathname.includes(route);

    return (
        <div className={s.root}>
            <div className={s.navigation_wrapper}>
                <NavBarButton
                    onClick={handleNavigate("/schedule")}
                    icon={
                        <ScheduleIcon
                            width={20}
                            height={20}
                            viewBox="0 0 32 32"
                        />
                    }
                    isActive={isActive("/schedule")}
                >
                    {t("schedule")}
                </NavBarButton>
                <NavBarButton
                    onClick={handleNavigate("/grade")}
                    icon={
                        <GradeIcon width={20} height={20} viewBox="0 0 32 32" />
                    }
                    isActive={isActive("/grade")}
                >
                    {t("grade")}
                </NavBarButton>
                <NavBarButton
                    onClick={handleNavigate("/profile")}
                    icon={
                        <ProfileIcon
                            width={20}
                            height={20}
                            viewBox="0 0 32 32"
                        />
                    }
                    isActive={isActive("/profile")}
                >
                    {t("profile")}
                </NavBarButton>
            </div>
        </div>
    );
};
