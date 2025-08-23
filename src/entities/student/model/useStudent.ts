import { useQuery } from "@tanstack/react-query";

import { studentsApi } from "../api/students";
import type { StudentResponse } from "./types";

export const useStudent = (id: number) => {
    return useQuery<StudentResponse>({
        queryKey: ["student", id],
        queryFn: async () => {
            const { data } = await studentsApi.getStudent({ id });
            return data;
        },
        enabled: !!id,
    });
};
