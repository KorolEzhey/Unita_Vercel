import axios from "axios";

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError<{ message: string }>(error)) {
        return error.response?.data?.message ?? "Unknown error";
    }
    return "Unexpected error";
}
