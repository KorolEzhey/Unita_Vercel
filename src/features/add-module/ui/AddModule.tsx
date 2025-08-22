import { useTranslations } from "next-intl";
import type { FC } from "react";

import { Button } from "@/shared/ui/button";

import s from "./AddModule.module.scss";

type AddModuleProps = {
    handleAdd: () => void;
};

export const AddModule: FC<AddModuleProps> = ({ handleAdd }) => {
    const t = useTranslations();

    return (
        <Button variant="text" onClick={handleAdd} className={s.button}>
            <span className={s.content}>{t("buttons.add-module")}</span>
        </Button>
    );
};
