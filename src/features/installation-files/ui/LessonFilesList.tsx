import React, { useCallback, useEffect, useState } from "react";

import { filesApi, type LessonFileData } from "@/entities/file";
import { cleanFileName } from "@/shared/lib/utils";

import s from "./LessonFilesList.module.scss";

interface LessonFilesListProps {
    lessonId?: number;
}

export const LessonFilesList: React.FC<LessonFilesListProps> = ({
    lessonId,
}) => {
    const [serverFiles, setServerFiles] = useState<LessonFileData[]>([]);

    const fetchServerFiles = useCallback(async () => {
        if (!lessonId) return;

        try {
            const response = await filesApi.getLessonFiles({ lessonId });

            const processedFiles = (response.data || []).map((file) => ({
                ...file,
                originalFileName: file.fileName,
            }));

            setServerFiles(processedFiles);
        } catch (error) {
            console.error("Error fetching lesson files:", error);
            setServerFiles([]);
        }
    }, [lessonId]);

    // Загружаем файлы с сервера при изменении lessonId
    useEffect(() => {
        if (lessonId) {
            fetchServerFiles();
        } else {
            setServerFiles([]);
        }
    }, [lessonId, fetchServerFiles]);

    if (!lessonId || !serverFiles || serverFiles.length === 0) {
        return null;
    }

    return (
        <div className={s.lessonFilesList}>
            {serverFiles.map((file, index) => (
                <div key={`${file.fileName}-${index}`} className={s.fileItem}>
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
            ))}
        </div>
    );
};
