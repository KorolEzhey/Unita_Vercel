// ./steiger.config.js
import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
    ...fsd.configs.recommended,
    {
        rules: {
            "fsd/insignificant-slice": "off",
            "fsd/public-api": "off", // Временная мера, так как компоненты ещё не реализованы
            "fsd/repetitive-naming": "warn",
        },
    },
    {
        files: ["./src/shared/**"],
        rules: {
            "fsd/public-api": "off",
        },
    },
]);
