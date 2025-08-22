import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";

import type { User } from "@/entities/user";
import { UserAvatar } from "@/features/user-avatar";
import { shortenFullName } from "@/shared/lib/shortenFullName";

import s from "./SelectProfilePageButton.module.scss";

type Props = {
    profile: User;
    onClick: () => void;
    isActive?: boolean;
};

export const SelectProfilePageButton = ({
    profile,
    onClick,
    isActive,
}: Props) => {
    const t = useTranslations();
    const [avatarKey, _setAvatarKey] = useState(0);

    return (
        <button
            onClick={onClick}
            className={clsx(s.button, {
                [s.active]: isActive,
            })}
        >
            <span className={s.avatar}>
                <UserAvatar
                    userId={profile.id}
                    name={profile.name}
                    size={40}
                    avatarKey={avatarKey}
                />
            </span>

            <div className={s.textBlock}>
                <span className={s.name}>{shortenFullName(profile.name)}</span>
                <span
                    className={clsx(s.job, {
                        [s.teacher]: profile.role === "TEACHER",
                        [s.admin]: profile.role === "ADMIN",
                    })}
                >
                    {t(`roles.${profile.role.toLowerCase()}`)}
                </span>
            </div>
        </button>
    );
};
