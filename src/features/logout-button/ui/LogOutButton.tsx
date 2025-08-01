import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import LogoutIcon from "@/shared/icons/Logout.svg";
import { Button } from "@/shared/ui/button";

import s from "./LogOutButton.module.scss";

export const LogOutButton = () => {
    const t = useTranslations();
    const router = useRouter();

    const handleLogout = () => {
        // TODO: В будущем здесь можно добавить очистку состояния, токенов и т.д.
        router.push("/");
    };

    return (
        <Button variant="text" onClick={handleLogout} className={s.button}>
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
