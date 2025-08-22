export type FileData = {
    fileUrl: string;
    fileName: string;
};

export type FileType = "teacher" | "student" | "class" | "lesson";

export type FileUploadResponse = {
    fileUrl: string;
    fileName: string;
};

export type FileListResponse = {
    files: FileData[];
};

export type LessonFileData = {
    fileName: string;
    originalFileName: string;
    fileUrl: string;
};

export type LessonFileUploadResponse = {
    fileName: string;
    fileUrl: string;
};

export type LessonFileListResponse = LessonFileData[];
