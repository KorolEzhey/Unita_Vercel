import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import type { LoginFormData } from "@/shared/lib";
import { authStore } from "@/shared/stores";

type UseAuthOptions = {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
};

export function useAuth() {
    const loginMutation = useMutation({
        mutationFn: (credentials: LoginFormData) =>
            authStore.login(credentials),
    });

    const login = useCallback(
        (credentials: LoginFormData, options?: UseAuthOptions) => {
            loginMutation.mutate(credentials, {
                onSuccess: () => {
                    options?.onSuccess?.();
                },
                onError: (error) => {
                    options?.onError?.(error);
                },
            });
        },
        [loginMutation]
    );

    const logout = useCallback(() => {
        authStore.logout();
    }, []);

    return {
        login,
        logout,
        isLoading: loginMutation.isPending,
        isAuthenticated: authStore.isAuthenticated,
    };
}
