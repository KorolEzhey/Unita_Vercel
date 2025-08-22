import { makeAutoObservable, runInAction } from "mobx";

import { gradeStore, type StudentDiveGrade } from "@/entities/grade";
import type { ModuleResponse } from "@/entities/module";
import { subjectStore } from "@/entities/subject";

import { modulesService } from "../api/modulesService";

class ModulesStore {
    modules: ModuleResponse[] = [];
    selectedModuleIndex: number = 0;
    studentDiveGrades: StudentDiveGrade[] = [];
    isLoading: boolean = false;
    isLoadingGrades: boolean = false;
    error: string | null = null;
    subjectNames: Record<number, string> = {};
    isFinalMode: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    reset() {
        this.modules = [];
        this.selectedModuleIndex = 0;
        this.studentDiveGrades = [];
        this.isLoading = false;
        this.isLoadingGrades = false;
        this.error = null;
        this.subjectNames = {};
        this.isFinalMode = false;
    }

    async fetchModulesByClass(classId: number): Promise<void> {
        console.log("🔍 Загружаем модули для класса:", classId);
        this.isLoading = true;
        this.error = null;

        try {
            const modules = await modulesService.getModulesByClass(classId);
            console.log("✅ Модули загружены:", modules);

            // Загружаем названия предметов для всех дайвов
            await this.loadSubjectNames(modules);

            runInAction(() => {
                this.modules = modules;
                this.isLoading = false;

                // Автоматически загружаем оценки для первого модуля
                if (modules.length > 0) {
                    this.selectModule(0, 8);
                }
            });
        } catch (error: any) {
            console.error("❌ Ошибка загрузки модулей:", error);
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Ошибка при загрузке модулей";
            runInAction(() => {
                this.error = errorMessage;
                this.isLoading = false;
            });
        }
    }

    private async loadSubjectNames(modules: ModuleResponse[]): Promise<void> {
        const subjectIds = new Set<number>();

        // Собираем все уникальные subjectID
        modules.forEach((module) => {
            module.dives.forEach((dive) => {
                subjectIds.add(dive.subjectID);
            });
        });

        console.log(
            "📚 Загружаем названия предметов для:",
            Array.from(subjectIds)
        );

        // Загружаем названия предметов
        for (const subjectId of subjectIds) {
            try {
                const subject = await subjectStore.getSubjectById(subjectId);
                if (subject) {
                    runInAction(() => {
                        this.subjectNames[subjectId] = subject.name;
                    });
                }
            } catch (error) {
                console.error(`Ошибка загрузки предмета ${subjectId}:`, error);
                runInAction(() => {
                    this.subjectNames[subjectId] = `Предмет ${subjectId}`;
                });
            }
        }
    }

    async selectModule(index: number, studentId: number = 8): Promise<void> {
        console.log("📌 Выбран модуль:", index, "для студента:", studentId);
        this.selectedModuleIndex = index;
        this.isFinalMode = false; // Сбрасываем режим итога

        const selectedModule = this.modules[index];
        if (!selectedModule) {
            console.error("Модуль не найден");
            return;
        }

        try {
            this.isLoadingGrades = true;
            const grades = await gradeStore.getStudentDiveGrades(
                studentId,
                selectedModule.moduleID
            );
            console.log("📊 Оценки загружены:", grades);

            runInAction(() => {
                this.studentDiveGrades = grades;
                this.isLoadingGrades = false;
            });
        } catch (error: any) {
            console.error("❌ Ошибка загрузки оценок:", error);
            runInAction(() => {
                this.studentDiveGrades = [];
                this.isLoadingGrades = false;
            });
        }
    }

    async selectFinalMode(studentId: number = 8): Promise<void> {
        console.log("📊 Выбран режим 'Итог' для студента:", studentId);
        this.isFinalMode = true;
        this.selectedModuleIndex = -1; // Специальный индекс для итога

        try {
            this.isLoadingGrades = true;
            const averageData =
                await gradeStore.getStudentModuleAverage(studentId);
            console.log("📊 Итоговые данные загружены:", averageData);

            // Преобразуем данные для отображения в таблице
            const finalGrades = averageData.modules.map((module) => ({
                diveID: module.moduleID,
                diveName: module.name,
                startTime: "",
                endTime: "",
                subjectID: module.moduleID,
                subjectName: module.name, // Используем реальное название модуля
                score: module.averageScore,
                gradeID: null,
            }));

            runInAction(() => {
                this.studentDiveGrades = finalGrades;
                this.isLoadingGrades = false;
            });
        } catch (error: any) {
            console.error("❌ Ошибка загрузки итоговых данных:", error);
            runInAction(() => {
                this.studentDiveGrades = [];
                this.isLoadingGrades = false;
            });
        }
    }

    get selectedModule(): ModuleResponse | null {
        return this.modules[this.selectedModuleIndex] || null;
    }

    get moduleNames(): string[] {
        console.log(
            "📋 Названия модулей:",
            this.modules.map((m) => m.name)
        );
        return this.modules.map((module) => module.name);
    }

    getSubjectName(subjectId: number): string {
        return this.subjectNames[subjectId] || `Предмет ${subjectId}`;
    }
}

export const modulesStore = new ModulesStore();
