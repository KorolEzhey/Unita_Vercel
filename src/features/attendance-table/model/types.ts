export type Attendance = {
    studentId: number;
    studentName: string;
    attendance: {
        date: Date;
        subject: string;
        hours: number;
    }[];
};