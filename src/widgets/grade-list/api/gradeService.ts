import { getGrades } from "@/shared/api";
import type { Grade } from "@/shared/lib/constants";

class GradeService {
    async getGrades(): Promise<Grade[]> {
        try {
            return await getGrades();
        } catch (error) {
            console.error("Error fetching grades:", error);
            return [];
        }
    }
}

export const gradeService = new GradeService();
