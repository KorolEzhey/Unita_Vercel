import clsx from "clsx";
import { useState } from "react";

import ArrowDown from "@/shared/icons/ArrowDown.svg";
import ArrowUp from "@/shared/icons/ArrowUp.svg";
import DownArrow from "@/shared/icons/DownArrow.svg";
import UpArrow from "@/shared/icons/UpArrow.svg";

import s from "./Select.module.scss";
import ts from "./TableSelect.module.scss";

type SelectProps<T> = {
    selected: number | null;
    setSelected: (value: number) => void;
    array: T[];
    getLabel: (item: T) => string;
    getValue: (item: T) => number;
    width?: string | number;
    variant?: "default" | "table";
    disabled?: boolean;
};

export const Select = <T,>({
    selected,
    setSelected,
    array,
    getLabel = (item) => String(item),
    getValue = (item) => Number(item),
    width,
    variant = "default",
    disabled = false,
}: SelectProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        if (!disabled) setIsOpen((prev) => !prev);
    };
    const handleSelect = (value: number) => {
        if (disabled) return;
        setSelected(value);
        setIsOpen(false);
    };

    const styles = variant === "table" ? ts : s;
    const UpIcon = variant === "table" ? ArrowUp : UpArrow;
    const DownIcon = variant === "table" ? ArrowDown : DownArrow;

    if (!Array.isArray(array) || array.length === 0) {
        return null;
    }

    const selectedItem = array.find((item) => getValue(item) === selected);

    return (
        <div
            className={styles.selectWrapper}
            style={variant === "default" && width ? { width } : undefined}
        >
            <button
                className={clsx(styles.selectButton, {
                    [styles.open]: isOpen,
                    [styles.disabled]: disabled,
                })}
                onClick={toggleDropdown}
            >
                {selectedItem ? getLabel(selectedItem) : "Выберите"}
                {isOpen ? (
                    <UpIcon className={{ [styles.disabledIcon]: disabled }} />
                ) : (
                    <DownIcon className={{ [styles.disabledIcon]: disabled }} />
                )}
            </button>

            {isOpen && (
                <ul className={styles.dropdown}>
                    {array.map((option) => (
                        <li
                            key={getValue(option)}
                            className={clsx(styles.option, {
                                [styles.selected]:
                                    selected === getValue(option),
                            })}
                            onClick={() => handleSelect(getValue(option))}
                        >
                            {getLabel(option)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
