export type StudentResponse = {
    studentId: number;
    login: string;
    fullName: string;
    classId: number;
    className: string;
};

export type NewStudent = {
    login: string;
    password: string;
    fullName: string;
    classId: number;
};
