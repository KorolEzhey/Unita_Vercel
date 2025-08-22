import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { type FC } from "react";

import { authApi } from "@/shared/api";
import LogoutIcon from "@/shared/icons/Logout.svg";
import { Button } from "@/shared/ui/button";
import { NavBarButton } from "@/shared/ui/nav-bar";

import s from "./LogOutButton.module.scss";

type LogOutButtonProps = {
    variant?: "default" | "navbar";
    className?: string;
};

export const LogOutButton: FC<LogOutButtonProps> = ({
    variant = "default",
    className,
}) => {
    const t = useTranslations();
    const router = useRouter();

    const handleLogout = async () => {
        await authApi.logout();
        router.push("/");
    };

    if (variant === "navbar") {
        return (
            <NavBarButton
                onClick={handleLogout}
                icon={
                    <LogoutIcon
                        className={s.navbarIcon}
                        width={20}
                        height={20}
                        viewBox="0 0 32 32"
                    />
                }
                isDesktop
            >
                {t("navigation.logout")}
            </NavBarButton>
        );
    }

    return (
        <Button
            variant="text"
            onClick={handleLogout}
            className={className ?? s.button}
        >
            <div className={s.content}>
                <div className={s.iconWrapper}>
                    <LogoutIcon
                        className={s.icon}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                    />
                </div>
                <span>{t("buttons.logout")}</span>
            </div>
        </Button>
    );
};
