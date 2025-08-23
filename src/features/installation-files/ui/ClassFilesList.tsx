import { type FC } from "react";

import { useClassFiles } from "@/entities/file";
import { cleanFileName } from "@/shared/lib/utils";

import s from "./ClassFilesList.module.scss";
import { FileInstallButton } from "./FileInstallButton";

type ClassFilesListProps = {
    classId: number;
    resolution: "desktop" | "mobile";
};

export const ClassFilesList: FC<ClassFilesListProps> = ({
    classId,
    resolution,
}) => {
    const { data: files, isLoading, isError } = useClassFiles(classId);

    if (isLoading) {
        return <div className={s.loading}>Загрузка...</div>;
    }

    if (isError || !files || files.length === 0) {
        return <div className={s.noFiles}>Файлы класса не найдены</div>;
    }

    return (
        <div className={s.classFilesList}>
            {files.map((file, index) => (
                <div key={`${file.fileName}-${index}`} className={s.fileItem}>
                    <FileInstallButton
                        fileName={cleanFileName(file.fileName)}
                        fileUrl={file.fileUrl}
                        resolution={resolution}
                    />
                </div>
            ))}
        </div>
    );
};
