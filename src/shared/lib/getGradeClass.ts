import { match } from "ts-pattern";

import { GRADE_THRESHOLDS } from "@/shared/lib/constants";

export const getGradeClass = (grade?: number): string | undefined => {
    return match(grade)
        .with(undefined, () => undefined)
        .when(
            (g) => g < GRADE_THRESHOLDS.UNSATISFACTORY,
            () => "gradeRed"
        )
        .when(
            (g) => g < GRADE_THRESHOLDS.SATISFACTORY,
            () => "gradeOrange"
        )
        .when(
            (g) => g < GRADE_THRESHOLDS.GOOD,
            () => "gradeYellow"
        )
        .otherwise(() => "gradeGreen");
};
