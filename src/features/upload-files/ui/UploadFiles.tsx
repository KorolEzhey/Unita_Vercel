import clsx from "clsx";
import { useTranslations } from "next-intl";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import TrashIcon from "@/shared/icons/Trash.svg";

import s from "./UploadFiles.module.scss";

type FileItem = {
    id: string;
    name: string;
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
            id: uuidv4(),
            name: file.name,
            file: file,
        }));

        setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleDelete = (id: string) => {
        setFiles((prev) => prev.filter((file) => file.id !== id));
    };

    return (
        <div className={clsx(s.uploadFiles, className)}>
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
                    {files.map(({ id, name }) => (
                        <div key={id} className={s.fileItem}>
                            <span className={s.fileName}>{name}</span>
                            <button
                                className={s.deleteButton}
                                onClick={() => handleDelete(id)}
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
