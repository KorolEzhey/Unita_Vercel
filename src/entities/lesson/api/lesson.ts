import { api, type Endpoint } from "@/shared/api";

import type { LessonResponse, NewLesson } from "../model/types";

export class LessonsApi {
    getLessonsByTeacher: Endpoint<{ teacherId: number }, LessonResponse[]> =
        async ({ teacherId }) => {
            return api.get<LessonResponse[]>(
                `/lessons/by-teacher/${teacherId}`
            );
        };

    getLessonsByClass: Endpoint<{ classId: number }, LessonResponse[]> =
        async ({ classId }) => {
            return api.get<LessonResponse[]>(`/lessons/by-class/${classId}`);
        };

    updateLessonbyAdmin: Endpoint<
        { lessonId: number } & NewLesson,
        LessonResponse
    > = async ({ lessonId, ...lesson }) => {
        return api.patch<LessonResponse>(`/lessons/${lessonId}/admin`, lesson);
    };

    updateLessonbyTeacher: Endpoint<
        { lessonId: number; theme: string; description: string },
        LessonResponse
    > = async ({ lessonId, ...lesson }) => {
        return api.patch<LessonResponse>(
            `/lessons/${lessonId}/teacher`,
            lesson
        );
    };

    deleteLesson: Endpoint<{ lessonId: number }, void> = async ({
        lessonId,
    }) => {
        return api.delete(`/lessons/${lessonId}`);
    };

    addLesson: Endpoint<NewLesson, LessonResponse> = async (lesson) => {
        return api.post<LessonResponse>("/lessons", lesson);
    };
}

export const lessonsApi = new LessonsApi();
