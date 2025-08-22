import clsx from "clsx";

import { SwitchButton } from "./SwitchButton";
import s from "./SwitchTabs.module.scss";

type SwitchTabsProps = {
    tabs: { label: string; value: string }[];
    active: string;
    onChange: (val: string) => void;
    variant?: "outlined" | "flat";
    buttonWidth?: string | number;
    buttonPadding?: string;
};

export const SwitchTabs = ({
    tabs,
    active,
    onChange,
    variant = "outlined",
    buttonWidth,
    buttonPadding,
}: SwitchTabsProps) => {
    return (
        <div className={clsx(s.wrapper, s[variant])}>
            {tabs.map((tab) => (
                <SwitchButton
                    key={tab.value}
                    isActive={active === tab.value}
                    withBackground={variant === "flat"}
                    onClick={() => onChange(tab.value)}
                    width={buttonWidth}
                    padding={buttonPadding}
                >
                    {tab.label}
                </SwitchButton>
            ))}
        </div>
    );
};
