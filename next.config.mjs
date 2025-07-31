import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/lib/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Получаем существуещее правило для обработки SVG ипортов
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg")
        );

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {
                    not: [...fileLoaderRule.resourceQuery.not, /url/],
                },
                use: ["@svgr/webpack"],
            }
        );

        // Настроили file-loader на игнорирование .svg, так как теперь они обрабатываются иначе.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

export default withNextIntl(nextConfig);
