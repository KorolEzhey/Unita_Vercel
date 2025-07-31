import s from "./FileInstallButton.module.scss";

export const iconSizeByResolution = {
    desktop: 20,
    mobile: 28,
} as const;

export const installIconSizeByResolution = {
    desktop: 16,
    mobile: 20,
} as const;

export const rightIconClassByResolution = {
    desktop: `${s.rightIcon} ${s.desktop}`,
    mobile: s.rightIcon,
} as const;

export const buttonClassByResolution = {
    desktop: `${s.button} ${s.desktop}`,
    mobile: s.button,
} as const;
