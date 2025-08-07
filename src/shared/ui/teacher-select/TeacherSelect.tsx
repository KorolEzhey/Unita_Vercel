import React from "react";
import s from "./TeacherSelect.module.scss";

export type TeacherSelectProps = {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
};

export const TeacherSelect: React.FC<TeacherSelectProps> = ({
    value,
    onChange,
    className,
    disabled = false,
}) => {
    const teachers = [
        { value: "ivanov", label: "Иванов И.И." },
        { value: "petrov", label: "Петров П.П." },
        { value: "sidorov", label: "Сидоров С.С." },
        { value: "smirnov", label: "Смирнов А.В." },
    ];

    return (
        <div className={`${s.teacherSelect} ${className ?? ""}`}>
            <select
                className={`${s.select} ${disabled ? s.disabled : ""}`}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
            >
                {teachers.map((teacher) => (
                    <option key={teacher.value} value={teacher.value}>
                        {teacher.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
