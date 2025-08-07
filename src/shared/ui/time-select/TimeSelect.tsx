import React from "react";

import s from "./TimeSelect.module.scss";

export type TimeSelectProps = {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
};

export const TimeSelect: React.FC<TimeSelectProps> = ({
    value,
    onChange,
    className,
    disabled = false,
}) => {
    const timeSlots = [
        { value: "08:30-10:00", label: "08:30 - 10:00" },
        { value: "10:10-11:40", label: "10:10 - 11:40" },
        { value: "12:10-13:40", label: "12:10 - 13:40" },
        { value: "13:50-15:20", label: "13:50 - 15:20" },
    ];

    return (
        <div className={`${s.timeSelect} ${className ?? ""}`}>
            <select
                className={`${s.select} ${disabled ? s.disabled : ""}`}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
            >
                {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                        {slot.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
