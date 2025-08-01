import Image from "next/image";
import { useTranslations } from "next-intl";
import type { FC } from "react";

import type { User } from "@/entities/user/model/types";
import { FileInstallButton } from "@/features/installation-files";
import UserIcon from "@/shared/icons/UserIcon.svg";

import s from "./ProfileCardDesktop.module.scss";

type ProfileCardProps = {
    user: User;
    file: { id: string; fileName: string; fileUrl: string };
};

const UserInfo = ({
    surname,
    name,
    patronymic,
    jobTitle,
}: Pick<User, "surname" | "name" | "patronymic" | "jobTitle">) => {
    const fullName = [surname, name].filter(Boolean).join(" ");
    return (
        <div className={s.info}>
            <p className={s.name}>
                {fullName}
                <br />
                {patronymic}
            </p>
            <p className={s.role}>{jobTitle}</p>
        </div>
    );
};

export const ProfileCardDesktop: FC<ProfileCardProps> = ({
    user: { name, surname, patronymic, jobTitle, avatar },
    file: { fileName, fileUrl },
}) => {
    const fullName = [surname, name, patronymic].filter(Boolean).join(" ");
    const t = useTranslations("profile");

    return (
        <div className={s.root}>
            <div className={s.content}>
                <div className={s.avatar}>
                    {avatar ? (
                        <Image
                            src={avatar}
                            alt={fullName}
                            width={104}
                            height={104}
                            className={s.image}
                        />
                    ) : (
                        <UserIcon
                            width={104}
                            height={104}
                            viewBox="0 0 104 104"
                        />
                    )}
                </div>
                <UserInfo
                    surname={surname}
                    name={name}
                    patronymic={patronymic}
                    jobTitle={jobTitle}
                />
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
