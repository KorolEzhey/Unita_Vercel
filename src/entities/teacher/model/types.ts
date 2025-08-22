export type TeacherResponse = {
    teacherId: number;
    login: string;
    fullName: string;
};

export type NewTeacher = {
    login: string;
    password: string;
    fullName: string;
};
