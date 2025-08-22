export type User = {
    userId: number;
    login: string;
    fullName: string;
};

export type Student = User & {
    className: string;
};
