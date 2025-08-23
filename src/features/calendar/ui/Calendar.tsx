import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import s from "./Calendar.module.scss";

type CalendarProps = {
    value: string;
    onChange: (date: string) => void;
    className?: string;
};

export const Calendar: React.FC<CalendarProps> = ({
    value,
    onChange,
    className,
}) => {
    const t = useTranslations();
    const [isOpen, setIsOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [popupPosition, setPopupPosition] = useState<"left" | "right">(
        "right"
    );

    const currentDate = value ? new Date(value) : new Date();
    const [displayDate, setDisplayDate] = useState(currentDate);

    // Определяем позицию календаря при открытии
    const handleOpenCalendar = () => {
        if (calendarRef.current) {
            const rect = calendarRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const calendarWidth = 240; // Ширина календаря

            // Если справа недостаточно места, позиционируем слева
            if (rect.right + calendarWidth > viewportWidth) {
                setPopupPosition("left");
            } else {
                setPopupPosition("right");
            }
        }
        setIsOpen(!isOpen);
    };

    // Закрываем календарь при клике вне
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const daysInMonth = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth() + 1,
        0
    ).getDate();
    const firstDayOfMonth = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth(),
        1
    ).getDay();

    const monthNames = [
        t("calendar.january"),
        t("calendar.february"),
        t("calendar.march"),
        t("calendar.april"),
        t("calendar.may"),
        t("calendar.june"),
        t("calendar.july"),
        t("calendar.august"),
        t("calendar.september"),
        t("calendar.october"),
        t("calendar.november"),
        t("calendar.december"),
    ];

    const dayNames = [
        t("calendar.monday"),
        t("calendar.tuesday"),
        t("calendar.wednesday"),
        t("calendar.thursday"),
        t("calendar.friday"),
        t("calendar.saturday"),
        t("calendar.sunday"),
    ];

    const handleDateSelect = (day: number) => {
        const selectedDate = new Date(
            displayDate.getFullYear(),
            displayDate.getMonth(),
            day
        );
        const formattedDate = selectedDate.toISOString().split("T")[0];
        onChange(formattedDate);
        setIsOpen(false);
    };

    const isWeekend = (day: number) => {
        const date = new Date(
            displayDate.getFullYear(),
            displayDate.getMonth(),
            day
        );
        const dayOfWeek = date.getDay();
        return dayOfWeek === 5 || dayOfWeek === 6; // 0 = воскресенье, 6 = суббота
    };

    const isSelected = (day: number) => {
        if (!value) return false;
        const selectedDate = new Date(value);
        return (
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === displayDate.getMonth() &&
            selectedDate.getFullYear() === displayDate.getFullYear()
        );
    };

    const prevMonth = () => {
        setDisplayDate(
            new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1)
        );
    };

    const nextMonth = () => {
        setDisplayDate(
            new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1)
        );
    };

    const renderCalendarDays = () => {
        const days = [];

        // Добавляем пустые ячейки для выравнивания
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className={s.day} />);
        }

        // Добавляем дни месяца
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(
                <div
                    key={day}
                    className={`${s.day} ${isWeekend(day) ? s.weekend : ""} ${isSelected(day) ? s.selected : ""}`}
                    onClick={() => handleDateSelect(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div ref={calendarRef} className={`${s.calendar} ${className || ""}`}>
            <div className={s.input} onClick={handleOpenCalendar}>
                <span>{value || t("calendar.select_date")}</span>
            </div>

            {isOpen && (
                <div
                    className={`${s.popup} ${popupPosition === "left" ? s.left : ""}`}
                >
                    <div className={s.header}>
                        <button onClick={prevMonth} className={s.navButton}>
                            ‹
                        </button>
                        <span className={s.monthYear}>
                            {monthNames[displayDate.getMonth()]}{" "}
                            {displayDate.getFullYear()}
                        </span>
                        <button onClick={nextMonth} className={s.navButton}>
                            ›
                        </button>
                    </div>

                    <div className={s.weekdays}>
                        {dayNames.map((day, index) => (
                            <div key={index} className={s.weekday}>
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className={s.days}>{renderCalendarDays()}</div>
                </div>
            )}
        </div>
    );
};
