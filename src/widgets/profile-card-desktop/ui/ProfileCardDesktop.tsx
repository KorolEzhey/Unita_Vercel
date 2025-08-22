import clsx from "clsx";
import { useTranslations } from "next-intl";
import { type FC, useState } from "react";

import { type User, useUser } from "@/entities/user";
import { ChangePhotoButton } from "@/features/change-photo";
import { FileInstallButton } from "@/features/installation-files";
import { UserAvatar } from "@/features/user-avatar";

import s from "./ProfileCardDesktop.module.scss";

type ProfileCardProps = {
    file: { id: string; fileName: string; fileUrl: string };
};

const UserInfo = ({ name, role }: Pick<User, "name" | "role">) => {
    const t = useTranslations();
    const roleText = t(`roles.${role.toLowerCase()}`);

    return (
        <div className={s.info}>
            <p className={s.name}>{name}</p>
            <p
                className={clsx(s.role, {
                    [s.teacher]: role === "TEACHER",
                    [s.admin]: role === "ADMIN",
                })}
            >
                {roleText}
            </p>
        </div>
    );
};

export const ProfileCardDesktop: FC<ProfileCardProps> = ({
    file: { fileName, fileUrl },
}) => {
    const { data: user, isLoading, isError } = useUser();
    const [avatarKey, setAvatarKey] = useState(0);
    const t = useTranslations("profile");

    const handleAvatarUpdate = () => {
        setAvatarKey((prev) => prev + 1);
    };

    if (isError) {
        return null;
    }

    if (isLoading) {
        return <div className={s.root}>{t("loading")}</div>;
    }

    if (!user) {
        return null;
    }

    const { name, role } = user;

    return (
        <div className={s.root}>
            <div className={s.content}>
                <div className={s.avatar}>
                    <UserAvatar
                        userId={user.id}
                        name={name}
                        size={104}
                        className={s.image}
                        avatarKey={avatarKey}
                    />
                    <ChangePhotoButton
                        variant="desktop"
                        userId={user.id}
                        onSuccess={handleAvatarUpdate}
                    />
                </div>
                <UserInfo name={name} role={role} />
            </div>
            <p className={s.title}>{t("study-load")}</p>
            <FileInstallButton
                fileName={fileName}
                fileUrl={fileUrl}
                resolution="desktop"
            />
        </div>
    );
};
