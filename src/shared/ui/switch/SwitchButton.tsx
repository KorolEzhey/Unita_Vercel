import clsx from "clsx";

import s from "./SwitchButton.module.scss";

type Props = {
    isActive: boolean;
    withBackground?: boolean;
    children: React.ReactNode;
    onClick: () => void;
    width?: string | number;
    padding?: string;
};

export const SwitchButton = ({
    isActive,
    withBackground = false,
    children,
    onClick,
    width,
    padding,
}: Props) => {
    return (
        <button
            onClick={onClick}
            style={{
                ...(width ? { width } : {}),
                ...(padding ? { padding } : {}),
            }}
            className={clsx(s.button, {
                [s.active]: isActive,
                [s.withBackground]: withBackground,
            })}
        >
            {children}
        </button>
    );
};
