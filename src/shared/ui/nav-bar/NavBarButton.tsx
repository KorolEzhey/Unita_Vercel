import clsx from "clsx";
import type { FC } from "react";

import { Button } from "../button/Button";
import s from "./NavBarButton.module.scss";

type UserProfileProps = {
    avatar?: string;
    surname: string;
    name: string;
    fathername: string;
    jobTitle: string;
};

type NavBarButtonProps = {
    onClick: () => void;
    icon: React.ReactNode;
    children: React.ReactNode;
    profile?: UserProfileProps;
    className?: string;
    isActive?: boolean;
    isDesktop?: boolean;
};

export const NavBarButton: FC<NavBarButtonProps> = ({
    onClick,
    icon,
    profile,
    children,
    className,
    isActive,
    isDesktop,
}) => (
    <Button
        variant="text"
        icon={icon}
        onClick={onClick}
        className={clsx(
            s.button,
            {
                [s.active]: isActive,
                [s.desktop]: isDesktop,
            },
            className
        )}
    >
        {profile ? (
            <div className="flex flex-col gap-1">
                <span className={s.text}>{children}</span>
                <span className="bg-[#E4E9FD] rounded-md w-max px-2 text-[12px]">
                    {profile.jobTitle}
                </span>
            </div>
        ) : (
            <span className={s.text}>{children}</span>
        )}
    </Button>
);
