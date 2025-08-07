export type FinalGrade = {
    studentId: number;
    studentName: string;
    avarageScore: number;
    grades: {
        subject: string;
        grade: number;
    }[];
};