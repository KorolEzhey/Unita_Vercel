import createMiddleware from "next-intl/middleware";

import { locales } from "@/shared/lib/i18n/request";

export default createMiddleware({
    defaultLocale: "ru",
    locales,
});

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)", "/"],
};
