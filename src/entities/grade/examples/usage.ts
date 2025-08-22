import { gradeStore } from "../index";

export const gradeUsageExamples = {
    createGrade: async () => {
        try {
            const newGrade = await gradeStore.createGrade({
                diveID: 1,
                userID: 1,
                score: 5,
            });
            console.warn("Оценка создана:", newGrade);
            return newGrade;
        } catch (error) {
            console.error("Ошибка создания оценки:", error);
            throw error;
        }
    },

    getAllGrades: async () => {
        try {
            await gradeStore.fetchAll();
            console.warn("Все оценки:", gradeStore.grades);
            return gradeStore.grades;
        } catch (error) {
            console.error("Ошибка загрузки оценок:", error);
            throw error;
        }
    },

    updateGrade: async (gradeId: number, newScore: number) => {
        try {
            await gradeStore.updateGrade(gradeId, { score: newScore });
            console.warn(`Оценка ${gradeId} обновлена на ${newScore}`);
        } catch (error) {
            console.error("Ошибка обновления оценки:", error);
            throw error;
        }
    },

    deleteGrade: async (gradeId: number) => {
        try {
            await gradeStore.deleteGrade(gradeId);
            console.warn(`Оценка ${gradeId} удалена`);
        } catch (error) {
            console.error("Ошибка удаления оценки:", error);
            throw error;
        }
    },

    getStudentModuleGrades: async (studentId: number, moduleId: number) => {
        try {
            const grades = await gradeStore.getStudentModuleGrades(
                studentId,
                moduleId
            );
            console.warn(
                `Оценки студента ${studentId} по модулю ${moduleId}:`,
                grades
            );
            return grades;
        } catch (error) {
            console.error("Ошибка получения оценок студента:", error);
            throw error;
        }
    },

    getStudentModuleAverage: async (studentId: number) => {
        try {
            const averages =
                await gradeStore.getStudentModuleAverage(studentId);
            console.warn(`Средние оценки студента ${studentId}:`, averages);
            return averages;
        } catch (error) {
            console.error("Ошибка получения средних оценок:", error);
            throw error;
        }
    },

    getGradesByDive: (diveId: number) => {
        const grades = gradeStore.getGradesByDive(diveId);
        console.warn(`Оценки по дайву ${diveId}:`, grades);
        return grades;
    },

    getGradesByStudent: (userId: number) => {
        const grades = gradeStore.getGradesByStudent(userId);
        console.warn(`Оценки студента ${userId}:`, grades);
        return grades;
    },

    getGradeById: (gradeId: number) => {
        const grade = gradeStore.getGradeById(gradeId);
        console.warn(`Оценка ${gradeId}:`, grade);
        return grade;
    },
};

export const complexGradeExample = async () => {
    console.warn("=== Начало комплексного примера ===");

    try {
        await gradeUsageExamples.getAllGrades();

        const newGrade = await gradeUsageExamples.createGrade();

        if (newGrade) {
            await gradeUsageExamples.updateGrade(newGrade.gradeID, 4);
        }

        gradeUsageExamples.getGradesByDive(1);

        gradeUsageExamples.getGradesByStudent(1);

        console.warn("=== Комплексный пример завершен успешно ===");
    } catch (error) {
        console.error("Ошибка в комплексном примере:", error);
    }
};
