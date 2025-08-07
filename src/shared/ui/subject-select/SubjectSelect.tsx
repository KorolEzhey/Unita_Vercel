import React from "react";

import s from "./SubjectSelect.module.scss";

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
    const subjects = [
        { value: "math", label: "Математика" },
        { value: "physics", label: "Физика" },
        { value: "chemistry", label: "Химия" },
        { value: "biology", label: "Биология" },
        { value: "history", label: "История" },
        { value: "literature", label: "Литература" },
        { value: "english", label: "Английский язык" },
        { value: "informatics", label: "Информатика" },
    ];

    return (
        <div className={`${s.subjectSelect} ${className ?? ""}`}>
            <select
                className={`${s.select} ${disabled ? s.disabled : ""}`}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
            >
                <option value={value}>{value}</option>
                {subjects.map((subject) => (
                    <option key={subject.value} value={subject.value}>
                        {subject.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
