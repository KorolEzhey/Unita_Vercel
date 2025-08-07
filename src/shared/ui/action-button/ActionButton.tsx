import clsx from "clsx";
import type { ButtonHTMLAttributes, FC } from "react";

import s from "./ActionButton.module.scss";

type ActionButtonVariant = "primary" | "alert";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: ActionButtonVariant;
    children: React.ReactNode;
};

export const ActionButton: FC<ActionButtonProps> = ({
    variant,
    children,
    className,
    ...props
}) => {
    return (
        <button
            className={clsx(s.actionButton, s[variant], className)}
            type="button"
            {...props}
        >
            {children}
        </button>
    );
};
