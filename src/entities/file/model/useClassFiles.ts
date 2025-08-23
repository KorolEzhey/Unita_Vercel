import { useQuery } from "@tanstack/react-query";

import { filesApi } from "../api/fileApi";
import type { FileData } from "./types";

export const useClassFiles = (classId: number) => {
    return useQuery<FileData[]>({
        queryKey: ["classFiles", classId],
        queryFn: async () => {
            const { data } = await filesApi.getClassFiles({ classId });
            return data;
        },
        enabled: !!classId,
    });
};
