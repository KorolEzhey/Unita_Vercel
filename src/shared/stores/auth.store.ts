import { makeAutoObservable } from "mobx";

import { authApi, type LoginCredentials } from "@/shared/api/auth";
import { api } from "@/shared/api/config";
import { AUTH } from "@/shared/lib/constants";

class AuthStore {
    isAuthenticated = false;
    isLoading = false;
    error: string | null = null;
    private isRefreshing = false;
    private refreshSubscribers: ((token: string) => void)[] = [];
    private autoRefreshTimer: NodeJS.Timeout | null = null;

    constructor() {
        makeAutoObservable(this);
        if (typeof window !== "undefined") {
            this.isAuthenticated = !!sessionStorage.getItem("access_token");
            if (this.isAuthenticated) {
                this.startAutoRefresh();
            }
        }
        this.setupRefreshInterceptor();
    }

    private setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    private setError(error: string | null) {
        this.error = error;
    }

    private setAuthenticated(authenticated: boolean) {
        this.isAuthenticated = authenticated;
        if (authenticated) {
            this.startAutoRefresh();
        } else {
            this.stopAutoRefresh();
        }
    }

    private startAutoRefresh() {
        this.stopAutoRefresh(); // Останавливаем предыдущий таймер если есть
        this.autoRefreshTimer = setInterval(() => {
            this.refreshTokenSilently();
        }, AUTH.TOKEN_REFRESH_INTERVAL);
    }

    private stopAutoRefresh() {
        if (this.autoRefreshTimer) {
            clearInterval(this.autoRefreshTimer);
            this.autoRefreshTimer = null;
        }
    }

    private async refreshTokenSilently() {
        if (this.isRefreshing || !this.isAuthenticated) {
            return;
        }

        try {
            this.isRefreshing = true;
            const response = await authApi.refresh();
            const newAccessToken = response.accessToken;
            this.setAccessToken(newAccessToken);
        } catch (error) {
            console.error("Auto token refresh failed:", error);
            // При ошибке автоматического обновления не делаем logout,
            // пользователь может продолжать работать до истечения токена
        } finally {
            this.isRefreshing = false;
        }
    }

    private setupRefreshInterceptor() {
        api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // Skip if it's not a 401 error, or if it's a refresh/logout request
                if (
                    error.response?.status !== 401 ||
                    originalRequest.url === "/auth/refresh" ||
                    originalRequest.url === "/auth/logout" ||
                    originalRequest._retry
                ) {
                    return Promise.reject(error);
                }

                // If we're not authenticated anymore, reject immediately
                if (!this.isAuthenticated) {
                    return Promise.reject(error);
                }

                originalRequest._retry = true;

                if (!this.isRefreshing) {
                    this.isRefreshing = true;

                    try {
                        const response = await authApi.refresh();
                        const newAccessToken = response.accessToken;

                        this.setAccessToken(newAccessToken);
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        this.onTokenRefreshed(newAccessToken);

                        return api(originalRequest);
                    } catch (_refreshError) {
                        console.error("Token refresh failed:", _refreshError);
                        this.logout();
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                return new Promise((resolve, reject) => {
                    this.subscribeTokenRefresh((token: string) => {
                        if (!token) {
                            reject(new Error("Authentication failed"));
                            return;
                        }
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }
        );
    }

    private subscribeTokenRefresh(callback: (token: string) => void) {
        this.refreshSubscribers.push(callback);
    }

    private onTokenRefreshed(token: string) {
        this.refreshSubscribers.forEach((callback) => callback(token));
        this.refreshSubscribers = [];
    }

    private setAccessToken(token: string) {
        sessionStorage.setItem("access_token", token);
        this.setAuthenticated(true);
    }

    async login(credentials: LoginCredentials): Promise<void> {
        try {
            this.setLoading(true);
            this.setError(null);
            const response = await authApi.login(credentials);
            this.setAccessToken(response.accessToken);
        } catch (error) {
            this.setError("Failed to login");
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    private clearAuth() {
        sessionStorage.removeItem("access_token");
        this.setAuthenticated(false);
        this.isRefreshing = false;
        this.refreshSubscribers = [];
        this.stopAutoRefresh();
    }

    async logout(): Promise<void> {
        try {
            // Clear auth state first to prevent any new requests from starting
            this.clearAuth();
            // Then attempt to notify the server, but don't wait for it
            authApi.logout().catch(() => {
                // Ignore errors during logout
            });
        } finally {
            this.setLoading(false);
        }
    }
}

export const authStore = new AuthStore();
