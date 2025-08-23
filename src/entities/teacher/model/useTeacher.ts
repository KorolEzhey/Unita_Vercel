import { useQuery } from "@tanstack/react-query";

import { teachersApi } from "../api/teacher";
import type { TeacherResponse } from "./types";

export const useTeacher = (teacherId: number) => {
    console.log("useTeacher - teacherId:", teacherId);

    return useQuery<TeacherResponse>({
        queryKey: ["teacher", teacherId],
        queryFn: async () => {
            console.log(
                "useTeacher - making API call to /teachers/",
                teacherId
            );
            const { data } = await teachersApi.getTeacher({ teacherId });
            console.log("useTeacher - API response:", data);
            return data;
        },
        enabled: !!teacherId,
    });
};
