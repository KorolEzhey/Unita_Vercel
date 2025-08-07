"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/shared/ui/button";

import styles from "./LangSwitcher.module.scss";

export function LangSwitcher() {
    const router = useRouter();
    const params = useParams();
    const currentLocale = (params?.locale as string) || "ru";

    const toggleLanguage = () => {
        const newLocale = currentLocale === "ru" ? "en" : "ru";
        // Заменяем текущую локаль в URL на новую
        const newPath = window.location.pathname.replace(
            `/${currentLocale}`,
            `/${newLocale}`
        );
        router.push(newPath);
    };

    return (
        <Button
            onClick={toggleLanguage}
            className={styles.langButton}
            variant="text"
        >
            {currentLocale === "ru" ? "EN" : "RU"}
        </Button>
    );
}
