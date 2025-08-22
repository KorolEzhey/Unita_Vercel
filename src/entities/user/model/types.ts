export type Role = "TEACHER" | "ADMIN" | "STUDENT";

export type User = {
    id: number;
    name: string;
    login: string;
    role: Role;
    avatar?: string;
    teacherId?: number;
    studentId?: number;
};
