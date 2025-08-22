import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { errorToastStyle } from "toastConfig";

export function handleDateEnter(
    e: React.KeyboardEvent<HTMLInputElement>,
    setSelectedDate: Dispatch<SetStateAction<Date>>
) {
    const [year, month, day] = (e.currentTarget.value || "")
        .split("-")
        .map(Number);

    if (day < 1 || day > 31) {
        toast.error("Неверный день", errorToastStyle);
        return;
    }
    if (month < 1 || month > 12) {
        toast.error("Неверный месяц", errorToastStyle);
        return;
    }
    if (year < 2000 || year > 3000) {
        toast.error("Неверный год", errorToastStyle);
        return;
    }

    const newDate = new Date(year, month - 1, day);
    if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
    } else {
        toast.error("Неверная дата", errorToastStyle);
    }
}
