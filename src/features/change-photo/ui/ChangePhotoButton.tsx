import { useTranslations } from "next-intl";
import type { ChangeEvent, FC } from "react";

import { useUpdateAvatar } from "@/entities/user";
import CameraIcon from "@/shared/icons/Camera.svg";
import { FILE_LIMITS } from "@/shared/lib/constants";
import { Button } from "@/shared/ui/button";

import s from "./ChangePhotoButton.module.scss";

type ChangePhotoButtonProps = {
    variant?: "mobile" | "desktop";
    userId: number;
    onSuccess?: () => void;
};

export const ChangePhotoButton: FC<ChangePhotoButtonProps> = ({
    variant = "mobile",
    userId,
    onSuccess,
}) => {
    const t = useTranslations();
    const { mutate: updateAvatar, isPending } = useUpdateAvatar(userId);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > FILE_LIMITS.AVATAR.MAX_SIZE) {
            alert(
                `Размер файла не должен превышать ${FILE_LIMITS.AVATAR.MAX_SIZE / (1024 * 1024)}MB`
            );
            event.target.value = "";
            return;
        }

        if (
            !FILE_LIMITS.AVATAR.ALLOWED_TYPES.includes(
                file.type as (typeof FILE_LIMITS.AVATAR.ALLOWED_TYPES)[number]
            )
        ) {
            alert("Поддерживаются только форматы: JPG, PNG, GIF");
            event.target.value = "";
            return;
        }

        updateAvatar(file, {
            onSuccess: () => {
                onSuccess?.();
            },
        });

        event.target.value = "";
    };

    const openFileDialog = () => {
        document.getElementById(`file-input-${userId}`)?.click();
    };

    const input = (
        <input
            id={`file-input-${userId}`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
        />
    );

    if (variant === "desktop") {
        return (
            <>
                {input}
                <button
                    className={s.desktopButton}
                    onClick={openFileDialog}
                    type="button"
                    disabled={isPending}
                    aria-label={t("buttons.changePhoto")}
                >
                    <CameraIcon width={16} height={16} viewBox="0 0 32 32" />
                </button>
            </>
        );
    }

    return (
        <>
            {input}
            <Button
                variant="text"
                onClick={openFileDialog}
                disabled={isPending}
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
                {isPending ? t("status.uploading") : t("buttons.changePhoto")}
            </Button>
        </>
    );
};
