import axios from "axios";

import { api } from "./config";

export type LoginCredentials = {
    login: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
};

export type RefreshResponse = {
    accessToken: string;
};

export class AuthApi {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        try {
            const { data } = await api.post<LoginResponse>(
                "/auth/login",
                credentials
            );
            return data;
        } catch (_error) {
            console.error("Login error:", _error);
            throw _error;
        }
    }

    async refresh(): Promise<RefreshResponse> {
        try {
            const { data } = await api.post<RefreshResponse>("/auth/refresh");
            return data;
        } catch (error) {
            throw new Error("Session expired");
        }
    }

    async logout(): Promise<void> {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            // Ignore logout errors
        }
    }
}

export const authApi = new AuthApi();
