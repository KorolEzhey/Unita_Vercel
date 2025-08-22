import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://unita55.ru";

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        if (config.url === "/auth/refresh" || config.url === "/auth/logout") {
            return config;
        }

        const token = sessionStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
