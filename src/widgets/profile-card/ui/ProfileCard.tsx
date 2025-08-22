import { useTranslations } from "next-intl";
import { type FC, useState } from "react";

import { useStudent } from "@/entities/student";
import { useUser } from "@/entities/user";
import { ChangePhotoButton } from "@/features/change-photo";
import { UserAvatar } from "@/features/user-avatar";

import s from "./ProfileCard.module.scss";

type ProfileCardProps = {
    id: number;
};

export const ProfileCard: FC<ProfileCardProps> = ({ id }) => {
    const {
        data: student,
        isLoading: studentLoading,
        isError: studentError,
    } = useStudent(id);
    const {
        data: user,
        isLoading: userLoading,
        isError: userError,
    } = useUser();
    const [avatarKey, setAvatarKey] = useState(0);
    const t = useTranslations();

    const handleAvatarUpdate = () => {
        setAvatarKey((prev) => prev + 1);
    };

    if (studentError || userError) {
        return null;
    }

    if (studentLoading || userLoading) {
        return <div className={s.root}>{t("profile.loading")}</div>;
    }

    if (!student || !user) {
        return null;
    }

    const { className, fullName } = student;

    return (
        <div className={s.root}>
            <div className={s.avatar}>
                <div className={s.avatarImage}>
                    <UserAvatar
                        userId={id}
                        name={fullName}
                        size={88}
                        className={s.image}
                        avatarKey={avatarKey}
                    />
                </div>
                <ChangePhotoButton
                    variant="desktop"
                    userId={id}
                    onSuccess={handleAvatarUpdate}
                />
            </div>
            <div className={s.content}>
                <div className={s.info}>
                    <h2 className={s.name}>{fullName}</h2>
                    <p className={s.role}>{className}</p>
                </div>
            </div>
        </div>
    );
};
