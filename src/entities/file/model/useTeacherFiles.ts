import { useQuery } from "@tanstack/react-query";

import { filesApi } from "../api/fileApi";
import type { FileData } from "./types";

export const useTeacherFiles = (teacherId: number) => {
    console.log("useTeacherFiles - teacherId:", teacherId);

    return useQuery<FileData[]>({
        queryKey: ["teacherFiles", teacherId],
        queryFn: async () => {
            console.log(
                "useTeacherFiles - making API call to /files/teacher/",
                teacherId
            );
            const { data } = await filesApi.getTeacherFilesById({ teacherId });
            console.log("useTeacherFiles - API response:", data);
            return data;
        },
        enabled: !!teacherId,
    });
};
