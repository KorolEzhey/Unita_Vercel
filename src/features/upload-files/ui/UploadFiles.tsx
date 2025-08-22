import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import {
    filesApi,
    type LessonFileData,
    type LessonFileUploadResponse,
} from "@/entities/file";
import TrashIcon from "@/shared/icons/Trash.svg";
import { cleanFileName } from "@/shared/lib/utils";

import s from "./UploadFiles.module.scss";

type LocalFileItem = {
    id: string;
    name: string;
    size: number;
    type: string;
    file: File;
    isUploaded?: boolean;
};

export type UploadFilesProps = {
    className?: string;
    lessonId?: number;
    onFileUploaded?: (file: LessonFileUploadResponse) => void;
};

export type UploadFilesRef = {
    getLocalFiles: () => LocalFileItem[];
    clearLocalFiles: () => void;
    refreshServerFiles: () => void;
};

export const UploadFiles = forwardRef<UploadFilesRef, UploadFilesProps>(
    ({ className, lessonId, onFileUploaded }, ref) => {
        const t = useTranslations();
        const [localFiles, setLocalFiles] = useState<LocalFileItem[]>([]);
        const [serverFiles, setServerFiles] = useState<LessonFileData[]>([]);
        const [isUploading, setIsUploading] = useState(false);

        // Загружаем файлы с сервера при изменении lessonId
        useEffect(() => {
            if (lessonId) {
                fetchServerFiles();
            } else {
                // Очищаем серверные файлы, если lessonId не установлен
                setServerFiles([]);
            }
        }, [lessonId]);

        const fetchServerFiles = async () => {
            if (!lessonId) return;

            try {
                console.log("Fetching files for lesson:", lessonId);
                const response = await filesApi.getLessonFiles({ lessonId });
                console.log("Server response:", response.data);

                // Преобразуем данные с сервера, сохраняя оригинальное имя
                const processedFiles = (response.data || []).map((file) => ({
                    ...file,
                    originalFileName: file.fileName, // Сохраняем оригинальное имя с сервера
                    // fileName остается как есть для API вызовов
                }));

                setServerFiles(processedFiles);
                console.log("Updated serverFiles state:", processedFiles);
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch files";
                toast.error(errorMessage);
                console.error("Error fetching lesson files:", error);
                setServerFiles([]); // Устанавливаем пустой массив в случае ошибки
            }
        };

        const handleFileUpload = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            const uploadedFiles = event.target.files;
            if (!uploadedFiles) return;

            const newFiles: LocalFileItem[] = Array.from(uploadedFiles).map(
                (file) => ({
                    id: uuidv4(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    file: file,
                    isUploaded: false,
                })
            );

            setLocalFiles((prev) => [...prev, ...newFiles]);
        };

        const handleDeleteLocalFile = (id: string) => {
            setLocalFiles((prev) => prev.filter((file) => file.id !== id));
        };

        const handleDeleteServerFile = async (file: LessonFileData) => {
            if (!lessonId) return;

            console.log("Deleting file:", {
                originalFileName: file.originalFileName,
                fileName: file.fileName,
                fullFile: file,
            });

            try {
                await filesApi.deleteFile({
                    fileName: file.originalFileName, // Используем оригинальное имя для API
                });

                setServerFiles((prev) =>
                    prev ? prev.filter((f) => f.fileName !== file.fileName) : []
                );
                toast.success(
                    `File ${cleanFileName(file.fileName)} deleted successfully`
                );
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Failed to delete file";
                toast.error(errorMessage);
                console.error("Error deleting file:", error);
            }
        };

        const _uploadFileToServer = async (fileItem: LocalFileItem) => {
            if (!lessonId) {
                toast.error("Lesson ID is required for file upload");
                return;
            }

            try {
                setIsUploading(true);

                const response = await filesApi.uploadLessonFile({
                    lessonId,
                    file: fileItem.file,
                });

                // Удаляем файл из локального списка и обновляем серверный список
                setLocalFiles((prev) =>
                    prev.filter((f) => f.id !== fileItem.id)
                );
                await fetchServerFiles(); // Обновляем список с сервера

                if (onFileUploaded) {
                    onFileUploaded(response.data);
                }

                toast.success(`File ${fileItem.name} uploaded successfully!`);
            } catch (error) {
                const errorMessage =
                    error instanceof Error ? error.message : "Upload failed";
                toast.error(
                    `Failed to upload ${fileItem.name}: ${errorMessage}`
                );
            } finally {
                setIsUploading(false);
            }
        };

        const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                handleFileUpload(e);
            }
        };

        useImperativeHandle(ref, () => ({
            getLocalFiles: () => localFiles,
            clearLocalFiles: () => setLocalFiles([]),
            refreshServerFiles: () => fetchServerFiles(),
        }));

        return (
            <div className={clsx(s.uploadFiles, className)}>
                <div className={s.uploadSection}>
                    <label className={s.uploadButton}>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileInput}
                            className={s.fileInput}
                            disabled={isUploading}
                        />
                        <span className={s.buttonText}>
                            {t("buttons.download")}
                        </span>
                    </label>
                </div>

                {/* Локальные файлы для загрузки */}
                {localFiles.length > 0 && (
                    <div className={s.filesList}>
                        {localFiles.map(({ id, name }) => (
                            <div key={id} className={s.fileItem}>
                                <div className={s.fileInfo}>
                                    <span className={s.fileName}>
                                        {cleanFileName(name)}
                                    </span>
                                </div>
                                <button
                                    className={s.deleteButton}
                                    onClick={() => handleDeleteLocalFile(id)}
                                    disabled={isUploading}
                                >
                                    <TrashIcon
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Файлы с сервера */}
                {lessonId && serverFiles && serverFiles.length > 0 && (
                    <div className={s.filesList}>
                        {serverFiles.map((file, index) => (
                            <div
                                key={`${file.fileName}-${index}`}
                                className={s.fileItem}
                            >
                                <div className={s.fileInfo}>
                                    <a
                                        href={file.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download={file.fileName}
                                        className={s.fileName}
                                    >
                                        {cleanFileName(file.fileName)}
                                    </a>
                                </div>
                                <button
                                    className={s.deleteButton}
                                    onClick={() => handleDeleteServerFile(file)}
                                    title="Delete file"
                                >
                                    <TrashIcon
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);
