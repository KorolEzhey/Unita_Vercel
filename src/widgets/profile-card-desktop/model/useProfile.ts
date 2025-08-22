import { useQuery } from "@tanstack/react-query";

import { usersApi } from "@/shared/api";

export const useProfile = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => usersApi.getCurrentUser(),
        retry: false,
        refetchOnMount: false,
        staleTime: Infinity,
    });
};
