import type { AxiosError, AxiosResponse } from "axios";

import { api, type Endpoint } from "@/shared/api";
import { getUser } from "@/shared/api/users";
import { FILE_LIMITS } from "@/shared/lib/constants";

import type {
    FileData,
    FileListResponse,
    FileUploadResponse,
    LessonFileListResponse,
    LessonFileUploadResponse,
} from "../model/types";

export class FilesApi {
    private BASE_URL = "/files";

    private async prepareFile(file: File): Promise<File> {
        if (file.size > FILE_LIMITS.FILE.MAX_SIZE) {
            throw new Error(
                `File size exceeds ${FILE_LIMITS.FILE.MAX_SIZE / (1024 * 1024)}MB limit`
            );
        }

        return file;
    }

    private async uploadFile(
        url: string,
        file: File
    ): Promise<AxiosResponse<FileUploadResponse>> {
        const fileToUpload = await this.prepareFile(file);
        const formData = new FormData();
        formData.append("file", fileToUpload, file.name);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            transformRequest: [(data: FormData) => data],
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        };

        try {
            return await api.post<FileUploadResponse>(url, formData, config);
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error("File upload error:", axiosError.response?.data);
            throw error;
        }
    }

    private async uploadLessonFileInternal(
        url: string,
        file: File
    ): Promise<AxiosResponse<LessonFileUploadResponse>> {
        const fileToUpload = await this.prepareFile(file);
        const formData = new FormData();
        formData.append("file", fileToUpload, file.name);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            transformRequest: [(data: FormData) => data],
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        };

        try {
            return await api.post<LessonFileUploadResponse>(
                url,
                formData,
                config
            );
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error(
                "Lesson file upload error:",
                axiosError.response?.data
            );
            throw error;
        }
    }

    // Teacher methods for current user
    uploadTeacherFile: Endpoint<{ file: File }, FileUploadResponse> = async ({
        file,
    }) => {
        const user = await getUser();
        return this.uploadFile(
            `${this.BASE_URL}/teacher/${user.teacherId}`,
            file
        );
    };

    getTeacherFiles: Endpoint<void, FileListResponse> = async () => {
        const user = await getUser();
        return api.get<FileListResponse>(
            `${this.BASE_URL}/teacher/${user.teacherId}`
        );
    };

    // Admin/by-id variants for managing any teacher's files
    uploadTeacherFileById: Endpoint<
        { teacherId: number; file: File },
        FileUploadResponse
    > = async ({ teacherId, file }) => {
        return this.uploadFile(`${this.BASE_URL}/teacher/${teacherId}`, file);
    };

    getTeacherFilesById: Endpoint<{ teacherId: number }, FileData[]> = async ({
        teacherId,
    }) => {
        return api.get<FileData[]>(`${this.BASE_URL}/teacher/${teacherId}`);
    };

    uploadStudentFile: Endpoint<{ file: File }, FileUploadResponse> = async ({
        file,
    }) => {
        const user = await getUser();
        return this.uploadFile(
            `${this.BASE_URL}/student/${user.studentId}`,
            file
        );
    };

    getStudentFiles: Endpoint<void, FileListResponse> = async () => {
        const user = await getUser();
        return api.get<FileListResponse>(
            `${this.BASE_URL}/student/${user.studentId}`
        );
    };

    uploadClassFile: Endpoint<
        { classId: number; file: File },
        FileUploadResponse
    > = async ({ classId, file }) => {
        return this.uploadFile(`${this.BASE_URL}/class/${classId}`, file);
    };

    getClassFiles: Endpoint<{ classId: number }, FileData[]> = async ({
        classId,
    }) => {
        return api.get<FileData[]>(`${this.BASE_URL}/class/${classId}`);
    };

    deleteFile: Endpoint<{ fileName: string }, void> = async ({ fileName }) => {
        return api.delete(`${this.BASE_URL}/${fileName}`);
    };

    // Lesson file methods
    uploadLessonFile: Endpoint<
        { lessonId: number; file: File },
        LessonFileUploadResponse
    > = async ({ lessonId, file }) => {
        return this.uploadLessonFileInternal(
            `${this.BASE_URL}/lesson/${lessonId}`,
            file
        );
    };

    getLessonFiles: Endpoint<{ lessonId: number }, LessonFileListResponse> =
        async ({ lessonId }) => {
            return api.get<LessonFileListResponse>(
                `${this.BASE_URL}/lesson/${lessonId}`
            );
        };

    deleteLessonFile: Endpoint<{ lessonId: number; fileName: string }, void> =
        async ({ lessonId, fileName }) => {
            return api.delete(
                `${this.BASE_URL}/lesson/${lessonId}/${fileName}`
            );
        };
}

export const filesApi = new FilesApi();
