import { FC, useState } from "react";
import s from "./Select.module.scss";
import UpArrow from "@/shared/icons/UpArrow.svg";
import DownArrow from "@/shared/icons/DownArrow.svg";

type SelectProps = {
    selected: string;
    setSelected: (value: string) => void;
    width: number;
    array: string[];
};

export const Select: FC<SelectProps> = ({
    selected,
    setSelected,
    width,
    array,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const handleSelect = (value: string) => {
        setSelected(value);
        setIsOpen(false);
    };

    return (
        <div className={s.selectWrapper} style={{ width: `${width}px` }}>
            <button
                className={`${s.selectButton} ${isOpen ? s.open : ""}`}
                onClick={toggleDropdown}
            >
                {selected}
                {isOpen ? <UpArrow /> : <DownArrow />}
            </button>

            {isOpen && (
                <ul className={s.dropdown}>
                    {array.map((option) => (
                        <li
                            key={option}
                            className={`${s.option} ${
                                selected === option ? s.selected : ""
                            }`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
