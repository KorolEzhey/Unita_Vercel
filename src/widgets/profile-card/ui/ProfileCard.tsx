import Image from "next/image";
import type { FC } from "react";

import { ChangePhotoButton } from "@/features/change-photo";
import UserIcon from "@/shared/icons/UserIcon.svg";

import type { Student } from "../../../entities/student/model/types";
import s from "./ProfileCard.module.scss";

type ProfileCardProps = {
    student: Student;
};

export const ProfileCard: FC<ProfileCardProps> = ({
    student: { name, className, avatar },
}) => {
    return (
        <div className={s.root}>
            <div className={s.avatar}>
                {avatar ? (
                    <Image
                        src={avatar}
                        alt={name}
                        width={88}
                        height={88}
                        className={s.image}
                    />
                ) : (
                    <UserIcon
                        width={88}
                        height={88}
                        className={s.image}
                        viewBox="0 0 104 104"
                    />
                )}
            </div>
            <div className={s.content}>
                <div className={s.info}>
                    <h2 className={s.name}>{name}</h2>
                    <p className={s.role}>{className}</p>
                    <ChangePhotoButton />
                </div>
            </div>
        </div>
    );
};
