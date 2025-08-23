import clsx from "clsx";
import { type FC, useState } from "react";

import { type User, useUser } from "@/entities/user";
import { ChangePhotoButton } from "@/features/change-photo";
import { TeacherFilesList } from "@/features/installation-files";
import { UserAvatar } from "@/features/user-avatar";

import s from "./ProfileCardDesktop.module.scss";

type ProfileCardProps = {
    teacherId?: number;
    resolution: "desktop" | "mobile";
};

const UserInfo = ({ name, role }: Pick<User, "name" | "role">) => {
    const getRoleText = (role: string) => {
        switch (role) {
            case "TEACHER":
                return "Учитель";
            case "ADMIN":
                return "Администратор";
            case "STUDENT":
                return "Ученик";
            default:
                return role;
        }
    };

    return (
        <div className={s.info}>
            <p className={s.name}>{name}</p>
            <p
                className={clsx(s.role, {
                    [s.teacher]: role === "TEACHER",
                    [s.admin]: role === "ADMIN",
                })}
            >
                {getRoleText(role)}
            </p>
        </div>
    );
};

export const ProfileCardDesktop: FC<ProfileCardProps> = ({
    teacherId,
    resolution,
}) => {
    const { data: user, isLoading, isError } = useUser();
    const [avatarKey, setAvatarKey] = useState(0);

    const handleAvatarUpdate = () => {
        setAvatarKey((prev) => prev + 1);
    };

    if (isError) {
        return null;
    }

    if (isLoading) {
        return <div className={s.root}>Загрузка...</div>;
    }

    if (!user) {
        return null;
    }

    const { name, role } = user;

    // Показываем файлы учителя если есть teacherId
    const renderFiles = () => {
        if (role === "TEACHER" && teacherId) {
            return (
                <TeacherFilesList
                    teacherId={teacherId}
                    resolution={resolution}
                />
            );
        }

        return null;
    };

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
            {renderFiles()}
        </div>
    );
};
