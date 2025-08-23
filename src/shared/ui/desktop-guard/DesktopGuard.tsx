import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { useUser } from "@/entities/user";

interface DesktopGuardProps {
    children: React.ReactNode;
}

export const DesktopGuard: React.FC<DesktopGuardProps> = ({ children }) => {
    const { data: user, isLoading } = useUser();
    const router = useRouter();
    const t = useTranslations();

    useEffect(() => {
        if (!isLoading && user?.role === "STUDENT") {
            // Перенаправляем учеников на мобильную версию страницы
            const currentPath = window.location.pathname;
            const mobilePath = currentPath.replace("-desktop", "");

            if (mobilePath !== currentPath) {
                router.replace(mobilePath);
            } else {
                // Если нет мобильной версии, перенаправляем на главную
                router.replace("/");
            }
        }
    }, [user, isLoading, router]);

    // Показываем загрузку пока проверяем пользователя
    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    fontSize: "18px",
                }}
            >
                {t("loading") || "Загрузка..."}
            </div>
        );
    }

    // Если пользователь ученик, не показываем содержимое
    if (user?.role === "STUDENT") {
        return null;
    }

    // Для учителей и админов показываем содержимое
    return <>{children}</>;
};
