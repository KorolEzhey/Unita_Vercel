import { makeAutoObservable } from "mobx";

import { classStore } from "@/entities/class";
import { moduleStore as entityModuleStore } from "@/entities/module";
import { subjectStore } from "@/entities/subject";

import type { Dive, ModuleType } from "./types";

export class ModuleWidgetStore {
    modules: ModuleType[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    private setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    private setError(error: string | null) {
        this.error = error;
    }

    private setModules(modules: ModuleType[]) {
        this.modules = modules;
    }

    async fetchAll() {
        try {
            this.setLoading(true);
            this.setError(null);

            // Загружаем данные с бэкенда
            await Promise.all([
                entityModuleStore.fetchAll(),
                subjectStore.fetchAll(),
                classStore.fetchAll(),
            ]);

            // Преобразуем данные в формат виджета
            const widgetModules = entityModuleStore.modules.map((module) => ({
                id: module.moduleID,
                name: module.name,
                classID: module.classID,
                dives: module.dives.map((dive) => ({
                    diveID: dive.diveID,
                    subject:
                        subjectStore.subjects.find(
                            (s) => s.subjectId === dive.subjectID
                        )?.name || "Неизвестный предмет",
                    startDate: new Date(dive.startTime),
                    endDate: new Date(dive.endTime),
                    // Добавляем поля для работы с бэкендом
                    subjectID: dive.subjectID,
                    startTime: dive.startTime,
                    endTime: dive.endTime,
                })),
            }));

            this.setModules(widgetModules);
        } catch (error) {
            this.setError(
                error instanceof Error ? error.message : "Ошибка загрузки"
            );
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    setModuleData(data: ModuleType[]) {
        this.modules = data;
    }

    addModule = (data?: Dive[]) => {
        this.modules.push({ id: this.modules.length + 1, dives: data });
    };

    deleteModule = (id: number) => {
        this.modules = this.modules.filter((module) => module.id !== id);
    };
}

export const moduleStore = new ModuleWidgetStore();
