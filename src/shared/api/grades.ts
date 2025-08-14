import type { Grade } from "../lib/constants";

// Моковые данные для примера
const mockGrades: Grade[] = [
    {
        id: "1",
        subject: "Математика",
        grade: 85,
        week: "1 неделя",
        date: "2025-07-24",
    },
    {
        id: "2",
        subject: "Физика",
        grade: 92,
        week: "1 неделя",
        date: "2025-07-24",
    },
    {
        id: "3",
        subject: "История",
        grade: 78,
        week: "1 неделя",
        date: "2025-07-24",
    },
    {
        id: "4",
        subject: "Химия",
        grade: 95,
        week: "2 неделя",
        date: "2025-07-25",
    },
    {
        id: "5",
        subject: "Биология",
        grade: 88,
        week: "2 неделя",
        date: "2025-07-25",
    },
];

export const getGrades = async (): Promise<Grade[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockGrades;
};
