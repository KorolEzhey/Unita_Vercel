import { makeAutoObservable } from "mobx";

import type { NewDive } from "@/entities/dive";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";

import { modulesApi } from "../api/module";
import type { ModuleResponse, NewModule } from "./types";

class ModuleStore {
    modules: ModuleResponse[] = [];
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

    private setModules(modules: ModuleResponse[]) {
        this.modules = modules;
    }

    async fetchAll() {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await modulesApi.getAll();
            this.setModules(response.data);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async fetchModulesByClass(classId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await modulesApi.getModulesByClass({ classId });
            this.setModules(response.data);
            return response.data;
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async createModule(newModule: NewModule) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await modulesApi.createModule(newModule);
            this.modules = [...this.modules, response.data];
            return response.data;
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async addDiveToModule(moduleId: number, dive: NewDive) {
        try {
            this.setLoading(true);
            this.setError(null);

            console.warn("Store: добавляем дайв в модуль", { moduleId, dive });
            const response = await modulesApi.addDiveToModule({
                moduleId,
                dive,
            });
            console.warn("Store: дайв успешно добавлен", response.data);
            return response.data;
        } catch (error) {
            console.error("Store: ошибка добавления дайва", error);
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateModule(moduleId: number, data: Partial<NewModule>) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await modulesApi.updateModule({ moduleId, data });
            this.modules = this.modules.map((m) =>
                m.moduleID === moduleId ? response.data : m
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteModule(moduleId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            await modulesApi.deleteModule({ moduleId });
            this.modules = this.modules.filter((m) => m.moduleID !== moduleId);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }
}

export const moduleStore = new ModuleStore();
