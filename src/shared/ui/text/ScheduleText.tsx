import clsx from "clsx";
import type { FC } from "react";

import s from "./ScheduleText.module.scss";

type ScheduleTextProps = {
    variant: "time" | "subject" | "teacher";
    className?: string;
    children: string;
};

export const ScheduleText: FC<ScheduleTextProps> = ({
    variant,
    className,
    children,
}) => <div className={clsx(s[variant], className)}>{children}</div>;
