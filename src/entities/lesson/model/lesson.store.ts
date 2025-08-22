import { makeAutoObservable } from "mobx";

import { getErrorMessage } from "@/shared/lib/getErrorMessage";

import { lessonsApi } from "../api/lesson";
import type { LessonResponse, NewLesson } from "./types";

class LessonStore {
    lessonsByTeacher: LessonResponse[] = [];
    lessonsByClass: LessonResponse[] = [];
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

    private setLessonsByTeacher(lessonsByTeacher: LessonResponse[]) {
        this.lessonsByTeacher = lessonsByTeacher;
    }

    private setLessonsByClass(lessonsByClass: LessonResponse[]) {
        this.lessonsByClass = lessonsByClass;
    }

    async fetchLessonsByTeacher(teacherId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await lessonsApi.getLessonsByTeacher({
                teacherId,
            });
            this.setLessonsByTeacher(response.data);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async fetchLessonsByClass(classId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await lessonsApi.getLessonsByClass({
                classId,
            });
            this.setLessonsByClass(response.data);
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateLessonbyAdmin(lessonId: number, newLesson: NewLesson) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await lessonsApi.updateLessonbyAdmin({
                lessonId,
                ...newLesson,
            });
            this.lessonsByTeacher = this.lessonsByTeacher.map((s) =>
                s.lessonID === lessonId ? response.data : s
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async updateLessonbyTeacher(
        lessonId: number,
        theme: string,
        description: string
    ) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await lessonsApi.updateLessonbyTeacher({
                lessonId,
                theme,
                description,
            });
            this.lessonsByTeacher = this.lessonsByTeacher.map((s) =>
                s.lessonID === lessonId ? response.data : s
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteLesson(lessonId: number) {
        try {
            this.setLoading(true);
            this.setError(null);

            await lessonsApi.deleteLesson({ lessonId });
            this.lessonsByTeacher = this.lessonsByTeacher.filter(
                (s) => s.lessonID !== lessonId
            );
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    async addLesson(newLesson: NewLesson) {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await lessonsApi.addLesson(newLesson);
            this.lessonsByTeacher = [...this.lessonsByTeacher, response.data];
        } catch (error) {
            this.setError(getErrorMessage(error));
            throw error;
        } finally {
            this.setLoading(false);
        }
    }
}

export const lessonStore = new LessonStore();
