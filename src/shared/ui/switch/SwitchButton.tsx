import clsx from "clsx";
import s from "./SwitchButton.module.scss";

type SwitchButtonProps = {
    isActive: boolean;
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
};

export const SwitchButton = ({
    isActive,
    onClick,
    className,
    children,
}: SwitchButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={clsx(s.button, className, {
                [s.active]: isActive,
            })}
        >
            {children}
        </button>
    );
};
