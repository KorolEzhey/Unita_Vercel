import { useTranslations } from "next-intl";
import React from "react";

import TrashIcon from "@/shared/icons/Trash.svg";

import s from "./UploadFiles.module.scss";

type FileItem = {
    id: string;
    name: string;
    size: string;
    type: string;
    file: File;
};

export type UploadFilesProps = {
    className?: string;
};

export const UploadFiles: React.FC<UploadFilesProps> = ({ className }) => {
    const t = useTranslations();
    const [files, setFiles] = React.useState<FileItem[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = event.target.files;
        if (!uploadedFiles) return;

        const newFiles: FileItem[] = Array.from(uploadedFiles).map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: (file.size / 1024).toFixed(2) + " KB",
            type: file.type,
            file: file,
        }));

        setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleDelete = (id: string) => {
        setFiles((prev) => prev.filter((file) => file.id !== id));
    };

    return (
        <div className={`${s.uploadFiles} ${className ?? ""}`}>
            <div className={s.uploadSection}>
                <label className={s.uploadButton}>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className={s.fileInput}
                    />
                    <span className={s.buttonText}>
                        {t("buttons.download")}
                    </span>
                </label>
            </div>

            {files.length > 0 && (
                <div className={s.filesList}>
                    {files.map((file) => (
                        <div key={file.id} className={s.fileItem}>
                            <span>{file.name}</span>
                            <button
                                className={s.deleteButton}
                                onClick={() => handleDelete(file.id)}
                            >
                                <TrashIcon
                                    width={20}
                                    height={20}
                                    viewBox="0 0 32 32"
                                />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
