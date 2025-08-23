import { makeAutoObservable } from "mobx";

import { filesApi } from "../api/fileApi";
import type { FileData } from "./types";

export class FileStore {
    files: FileData[] = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setFiles(files: FileData[]) {
        this.files = files;
    }

    setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    async uploadTeacherFile(file: globalThis.File) {
        try {
            this.setLoading(true);
            const response = await filesApi.uploadTeacherFile({ file });
            await this.fetchTeacherFiles();
            return response.data;
        } finally {
            this.setLoading(false);
        }
    }

    async uploadTeacherFileById(teacherId: number, file: globalThis.File) {
        try {
            this.setLoading(true);
            const response = await filesApi.uploadTeacherFileById({
                teacherId,
                file,
            });
            await this.fetchTeacherFilesById(teacherId);
            return response.data;
        } finally {
            this.setLoading(false);
        }
    }

    async fetchTeacherFiles() {
        try {
            this.setLoading(true);
            const response = await filesApi.getTeacherFiles();
            this.setFiles(response.data.files);
            return response.data.files;
        } finally {
            this.setLoading(false);
        }
    }

    async fetchTeacherFilesById(teacherId: number) {
        try {
            this.setLoading(true);
            const response = await filesApi.getTeacherFilesById({ teacherId });
            this.setFiles(response.data);
            return response.data;
        } finally {
            this.setLoading(false);
        }
    }

    async uploadStudentFile(file: globalThis.File) {
        try {
            this.setLoading(true);
            const response = await filesApi.uploadStudentFile({ file });
            await this.fetchStudentFiles();
            return response.data;
        } finally {
            this.setLoading(false);
        }
    }

    async fetchStudentFiles() {
        try {
            this.setLoading(true);
            const response = await filesApi.getStudentFiles();
            this.setFiles(response.data.files);
            return response.data.files;
        } finally {
            this.setLoading(false);
        }
    }

    async uploadClassFile(classId: number, file: globalThis.File) {
        try {
            this.setLoading(true);
            const response = await filesApi.uploadClassFile({ classId, file });
            await this.fetchClassFiles(classId);
            return response.data;
        } finally {
            this.setLoading(false);
        }
    }

    async fetchClassFiles(classId: number) {
        try {
            this.setLoading(true);
            const response = await filesApi.getClassFiles({ classId });
            this.setFiles(response.data);
            return response.data;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteFile(fileName: string) {
        try {
            this.setLoading(true);
            await filesApi.deleteFile({ fileName });
            this.setFiles(
                this.files.filter((file) => file.fileName !== fileName)
            );
        } finally {
            this.setLoading(false);
        }
    }
}

export const fileStore = new FileStore();
