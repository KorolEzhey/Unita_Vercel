import { makeAutoObservable } from "mobx";

import { getErrorMessage } from "@/shared/lib/getErrorMessage";

import { classesApi } from "../api/class";
import type { ClassResponse, NewClass } from "./types";

class ClassStore {
    classes: ClassResponse[] = [];
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

    private setClasses(classes: ClassResponse[]) {
        this.classes = classes;
    }

    async fetchAll() {
        try {
            this.setLoading(true);
            this.setError(null);

            const responce = await classesApi.getAll();
            this.setClasses(responce.data);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateClassName(classId: number, name: string) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await classesApi.updateClassName({
                classId,
                name,
            });

            this.classes = this.classes.map((s) =>
                s.classId === classId ? response.data : s
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteClass(classId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            await classesApi.deleteClass({ classId });

            this.classes = this.classes.filter((s) => s.classId !== classId);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async addClass(newClass: NewClass) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await classesApi.addClass(newClass);

            this.classes = [...this.classes, response.data];
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }
}

export const classStore = new ClassStore();
