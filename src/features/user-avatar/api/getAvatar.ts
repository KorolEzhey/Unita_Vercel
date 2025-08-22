import { api } from "@/shared/api";

export const getAvatar = async (userId: string | number) => {
    try {
        const response = await api.get(`/users/${userId}/avatar`, {
            responseType: "blob",
        });
        return response.data as Blob;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        console.error("Failed to load avatar:", error);
    }
};
