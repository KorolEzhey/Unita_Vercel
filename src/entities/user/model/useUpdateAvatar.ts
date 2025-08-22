import { useMutation, useQueryClient } from "@tanstack/react-query";

import { usersApi } from "@/shared/api";

export const useUpdateAvatar = (userId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => usersApi.updateAvatar(userId, file),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["avatar", userId],
            });
        },
    });
};
