import type { AxiosError } from "axios";

import type { User } from "@/entities/user";
import { API_URL, FILE_LIMITS } from "@/shared/lib/constants";

import { api } from "./config";

let cachedUser: User | null = null;

export const getUser = async (): Promise<User> => {
    if (cachedUser) return cachedUser;
    const response = await api.get<User>("/users/me");
    cachedUser = response.data;
    return cachedUser;
};

export class UsersApi {
    async getCurrentUser(): Promise<User> {
        const { data } = await api.get<User>("/users/me");
        return data;
    }

    getAvatarUrl(userId: number): string {
        return `${API_URL}/users/${userId}/avatar`;
    }

    private async compressImage(file: File): Promise<File> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Failed to get canvas context"));
                    return;
                }

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, img.width, img.height);

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error("Failed to compress image"));
                            return;
                        }
                        resolve(
                            new File([blob], file.name, {
                                type: file.type,
                                lastModified: Date.now(),
                            })
                        );
                    },
                    file.type,
                    0.8
                );
            };
            img.onerror = () => reject(new Error("Failed to load image"));
        });
    }

    async updateAvatar(userId: number, file: File): Promise<void> {
        if (!file.type.startsWith("image/")) {
            throw new Error("File must be an image");
        }

        if (file.size > FILE_LIMITS.AVATAR.MAX_SIZE) {
            throw new Error(
                `File size exceeds ${FILE_LIMITS.AVATAR.MAX_SIZE / (1024 * 1024)}MB limit`
            );
        }

        const fileToUpload =
            file.type === "image/gif" ? file : await this.compressImage(file);

        const formData = new FormData();
        formData.append("file", fileToUpload, file.name);

        const config = {
            headers: {},
            transformRequest: [(data: FormData) => data],
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        };

        try {
            await api.patch(`/users/${userId}/avatar`, formData, config);
        } catch (error) {
            const axiosError = error as AxiosError;
            if (
                axiosError.response?.status === 404 ||
                axiosError.response?.status === 409
            ) {
                await api.post(`/users/${userId}/avatar`, formData, config);
            } else {
                console.error(
                    "Avatar upload error:",
                    axiosError.response?.data
                );
                throw error;
            }
        }
    }
}

export const usersApi = new UsersApi();
