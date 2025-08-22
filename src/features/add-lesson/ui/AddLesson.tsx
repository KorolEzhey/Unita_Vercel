import { useTranslations } from "next-intl";
import type { FC } from "react";

import { Button } from "@/shared/ui/button";

import s from "./AddLesson.module.scss";

type AddLessonProps = {
    handleAdd: () => void;
};

export const AddLesson: FC<AddLessonProps> = ({ handleAdd }) => {
    const t = useTranslations();

    return (
        <Button variant="text" onClick={handleAdd} className={s.button}>
            <span className={s.content}>{t("buttons.add-lesson")}</span>
        </Button>
    );
};
