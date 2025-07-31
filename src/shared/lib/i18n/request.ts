import { getRequestConfig } from "next-intl/server";

import enMessages from "./messages/en.json";
import ruMessages from "./messages/ru.json";

export const defaultLocale = "ru";
export const locales = ["ru", "en"];

export default getRequestConfig(async ({ locale }) => {
    const resolvedLocale = locale ?? defaultLocale;
    return {
        messages: resolvedLocale === "en" ? enMessages : ruMessages,
        locale: resolvedLocale,
        defaultLocale,
        locales,
    };
});
