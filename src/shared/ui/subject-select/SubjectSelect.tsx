import clsx from "clsx";
import React from "react";

import ArrowDown from "@/shared/icons/ArrowDown.svg";

import s from "./SubjectSelect.module.scss";
//  TODO: заменить на реальные данные
const subjectsMock = [
    { value: "math", label: "Математика" },
    { value: "physics", label: "Физика" },
    { value: "chemistry", label: "Химия" },
    { value: "biology", label: "Биология" },
    { value: "history", label: "История" },
    { value: "literature", label: "Литература" },
    { value: "english", label: "Английский язык" },
    { value: "informatics", label: "Информатика" },
];

export type SubjectSelectProps = {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
};

export const SubjectSelect: React.FC<SubjectSelectProps> = ({
    value,
    onChange,
    className,
    disabled = false,
}) => {
    return (
        <div className={clsx(s.subjectSelect, className)}>
            <select
                className={clsx(s.select, disabled && s.disabled)}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
            >
                <option value={value}>{value}</option>
                {subjectsMock.map((subject) => (
                    <option key={subject.value} value={subject.value}>
                        {subject.label}
                    </option>
                ))}
            </select>
            <ArrowDown
                className={clsx(s.arrow, disabled && s.disabled)}
                width={20}
                height={20}
                viewBox="0 0 32 32"
            />
        </div>
    );
};
