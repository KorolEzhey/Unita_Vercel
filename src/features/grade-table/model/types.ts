export type Grade = {
    studentId: number;
    studentName: string;
    avarageScore: number;
    grades: {
        week: number;
        grade: number;
    }[];
};
