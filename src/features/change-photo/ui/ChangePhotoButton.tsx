import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui/button";
import CameraIcon from "@/shared/icons/Camera.svg";

import s from "./ChangePhotoButton.module.scss";

export const ChangePhotoButton = () => {
    const t = useTranslations();
    return (
        <Button
            variant="text"
            icon={
                <CameraIcon
                    className={s.icon}
                    width={20}
                    height={20}
                    viewBox="0 0 32 32"
                />
            }
            className={s.button}
        >
            {t("buttons.changePhoto")}
        </Button>
    );
};
