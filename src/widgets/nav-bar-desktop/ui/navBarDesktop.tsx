"use client";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useUser } from "@/entities/user";
import { LogOutButton } from "@/features/logout-button";
import { SelectProfilePageButton } from "@/features/select-profile-page";
import { NavBarButton } from "@/shared/ui/nav-bar";

import DatabaseIcon from "./databaseIcon.svg";
import FileIcon from "./fileIcon.svg";
import GradeIcon from "./gradeIcon.svg";
import s from "./NavBarDesktop.module.scss";
import ScheduleIcon from "./scheduleIcon.svg";

export const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("navigation");
    const { data: user, isLoading } = useUser();

    const handleNavigate = (route: string) => (): void => {
        if (!pathname?.includes(route)) {
            router.push(route);
        }
    };

    const isActive = (route: string): boolean =>
        pathname?.includes(route) ?? false;

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
                {!isLoading && user?.role === "ADMIN" && (
                    <>
                        <NavBarButton
                            onClick={handleNavigate("/database")}
                            icon={<DatabaseIcon />}
                            isActive={isActive("/database")}
                            isDesktop
                        >
                            {t("database")}
                        </NavBarButton>
                        <NavBarButton
                            onClick={handleNavigate("/file-storage")}
                            icon={<FileIcon />}
                            isActive={isActive("/file-storage")}
                            isDesktop
                        >
                            {t("files")}
                        </NavBarButton>
                    </>
                )}
            </div>
            <div className={s.bottom}>
                {!isLoading && user && (
                    <SelectProfilePageButton
                        profile={user}
                        onClick={handleNavigate("/profile-desktop")}
                        isActive={isActive("/profile-desktop")}
                    />
                )}
                <LogOutButton variant="navbar" />
            </div>
        </div>
    );
};
