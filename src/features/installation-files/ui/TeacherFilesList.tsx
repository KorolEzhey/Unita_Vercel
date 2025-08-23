import { type FC } from "react";

import { useTeacherFiles } from "@/entities/file";
import { cleanFileName } from "@/shared/lib/utils";

import { FileInstallButton } from "./FileInstallButton";
import s from "./TeacherFilesList.module.scss";

type TeacherFilesListProps = {
    teacherId: number;
    resolution: "desktop" | "mobile";
};

export const TeacherFilesList: FC<TeacherFilesListProps> = ({
    teacherId,
    resolution,
}) => {
    const { data, isLoading, isError } = useTeacherFiles(teacherId);

    // Отладочная информация
    console.log("TeacherFilesList - teacherId:", teacherId);
    console.log("TeacherFilesList - data:", data);
    console.log("TeacherFilesList - isLoading:", isLoading);
    console.log("TeacherFilesList - isError:", isError);
    console.log("TeacherFilesList - data length:", data?.length);

    if (isLoading) {
        return <div className={s.loading}>Загрузка...</div>;
    }

    if (isError || !data || data.length === 0) {
        return <div className={s.noFiles}>Файлы учителя не найдены</div>;
    }

    return (
        <div className={s.teacherFilesList}>
            {data.map((file, index) => (
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
