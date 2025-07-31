import Image from "next/image";
import type { FC } from "react";

import { ChangePhotoButton } from "@/features/change-photo";

import type { Student } from "../../../entities/student/model/types";
import s from "./ProfileCard.module.scss";

type ProfileCardProps = {
    student: Student;
};

export const ProfileCard: FC<ProfileCardProps> = ({
    student: { name, className, avatar = "/unita_logo.jpg" },
}) => {
    return (
        <div className={s.root}>
            <div className={s.avatar}>
                <Image
                    src={avatar}
                    alt={name}
                    width={80}
                    height={80}
                    className={s.image}
                />
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
