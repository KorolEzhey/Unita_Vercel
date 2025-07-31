import clsx from "clsx";
import type { FC } from "react";

import { Button } from "../button/Button";
import s from "./NavBarButton.module.scss";

type NavBarButtonProps = {
    onClick: () => void;
    icon: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    isActive?: boolean;
    isDesktop?: boolean;
};

export const NavBarButton: FC<NavBarButtonProps> = ({
    onClick,
    icon,
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
        <span className={s.text}>{children}</span>
    </Button>
);
