import createMiddleware from "next-intl/middleware";

import { defaultLocale, locales } from "@/shared/lib/i18n/request";

export default createMiddleware({
    defaultLocale,
    locales,
    localePrefix: "never",
});

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
