"use client";

import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import React, { type RefObject, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { filesApi } from "@/entities/file";
import type { LessonResponse, NewLesson } from "@/entities/lesson";
import { useUser } from "@/entities/user";
import { UploadFiles, type UploadFilesRef } from "@/features/upload-files";
import DoubleArrowLeftIcon from "@/shared/icons/DoubleArrowLeft.svg";
import { useFormatDateWithLocale } from "@/shared/lib/formatDateWithLocale";
import { ActionButton } from "@/shared/ui";
import { LessonInfoDesktop } from "@/widgets/lesson-info-desktop";

import {
    handleDelete,
    handleSubmit,
    handleUpdateLessonByTeacher,
} from "../model/handles";
import s from "./LessonDesktopPage.module.scss";

type Props = {
    lesson?: LessonResponse;
    onClose: () => void;
    selectedTeacher?: number;
};

const LessonDesktopPage: React.FC<Props> = observer(
    ({ lesson, onClose, selectedTeacher }) => {
        const t = useTranslations("");
        const { data: user, isLoading } = useUser();

        const lessonForm = useForm<NewLesson>({
            defaultValues: {
                classID: lesson?.class.classID || 0,
                subjectID: lesson?.subject.subjectID || 0,
                teacherID: lesson?.teacher.userID || 0,
                startTime: lesson?.startTime || new Date().toISOString(),
                endTime: lesson?.endTime || new Date().toISOString(),
                theme: lesson?.theme || "",
                description: lesson?.description || "",
            },
        });

        useEffect(() => {
            if (lessonForm) {
                // Обновляем форму при изменении lessonForm
            }
        }, [lessonForm]);

        const dateRef = useRef<HTMLInputElement>(null);
        const startTimeRef = useRef<HTMLInputElement>(null);
        const endTimeRef = useRef<HTMLInputElement>(null);
        const uploadFilesRef = useRef<UploadFilesRef>(null);

        const handleSaveWithFiles = async () => {
            try {
                // Сначала сохраняем урок
                await handleSubmit(
                    onClose,
                    lessonForm,
                    dateRef as RefObject<HTMLInputElement>,
                    startTimeRef as RefObject<HTMLInputElement>,
                    endTimeRef as RefObject<HTMLInputElement>,
                    lesson?.lessonID,
                    selectedTeacher
                );

                // Затем отправляем файлы, если они есть
                const localFiles = uploadFilesRef.current?.getLocalFiles();
                if (localFiles && localFiles.length > 0 && lesson?.lessonID) {
                    for (const fileItem of localFiles) {
                        try {
                            await filesApi.uploadLessonFile({
                                lessonId: lesson.lessonID,
                                file: fileItem.file,
                            });
                            toast.success(
                                `Файл ${fileItem.name} успешно загружен`
                            );
                        } catch (error) {
                            toast.error(
                                `Ошибка загрузки файла ${fileItem.name}`
                            );
                            console.error("Error uploading file:", error);
                        }
                    }
                    // Очищаем список локальных файлов после загрузки
                    uploadFilesRef.current?.clearLocalFiles();

                    // Обновляем список серверных файлов
                    if (uploadFilesRef.current?.refreshServerFiles) {
                        uploadFilesRef.current.refreshServerFiles();
                    }
                }
            } catch (error) {
                console.error("Error saving lesson:", error);
            }
        };

        const handleTeacherSaveWithFiles = async () => {
            try {
                // Сначала сохраняем урок
                await handleUpdateLessonByTeacher(
                    onClose,
                    lessonForm,
                    lesson?.lessonID || 0
                );

                // Затем отправляем файлы, если они есть
                const localFiles = uploadFilesRef.current?.getLocalFiles();
                if (localFiles && localFiles.length > 0 && lesson?.lessonID) {
                    for (const fileItem of localFiles) {
                        try {
                            await filesApi.uploadLessonFile({
                                lessonId: lesson.lessonID,
                                file: fileItem.file,
                            });
                            toast.success(
                                `Файл ${fileItem.name} успешно загружен`
                            );
                        } catch (error) {
                            toast.error(
                                `Ошибка загрузки файла ${fileItem.name}`
                            );
                            console.error("Error uploading file:", error);
                        }
                    }
                    // Очищаем список локальных файлов после загрузки
                    uploadFilesRef.current?.clearLocalFiles();

                    // Обновляем список серверных файлов
                    if (uploadFilesRef.current?.refreshServerFiles) {
                        uploadFilesRef.current.refreshServerFiles();
                    }
                }
            } catch (error) {
                console.error("Error saving lesson:", error);
            }
        };

        return (
            <div className={s.root}>
                <div className={s.header}>
                    {onClose && (
                        <button className={s.backButton} onClick={onClose}>
                            <DoubleArrowLeftIcon
                                width={28}
                                height={28}
                                viewBox="0 0 32 32"
                            />
                        </button>
                    )}
                    <div className={s.dayTitle}>
                        {lesson
                            ? useFormatDateWithLocale(lesson.startTime)
                            : "Добавление урока"}
                    </div>
                </div>
                <LessonInfoDesktop
                    key={lesson?.lessonID}
                    lesson={lesson}
                    lessonForm={lessonForm}
                    dateRef={dateRef as RefObject<HTMLInputElement>}
                    startTimeRef={startTimeRef as RefObject<HTMLInputElement>}
                    endTimeRef={endTimeRef as RefObject<HTMLInputElement>}
                />
                <div className={s.uploadSection}>
                    <UploadFiles
                        lessonId={lesson?.lessonID}
                        onFileUploaded={(file) => {
                            console.log("File uploaded:", file);
                        }}
                        ref={uploadFilesRef}
                    />
                </div>

                <div className={s.actions}>
                    <ActionButton
                        variant="primary"
                        onClick={
                            !isLoading && user?.role === "ADMIN"
                                ? handleSaveWithFiles
                                : handleTeacherSaveWithFiles
                        }
                    >
                        {t("buttons.save")}
                    </ActionButton>
                    <ActionButton
                        variant="alert"
                        onClick={
                            lesson
                                ? () => handleDelete(lesson.lessonID)
                                : () => {}
                        }
                        disabled={
                            !lesson?.lessonID ||
                            (!isLoading && user?.role !== "ADMIN")
                        }
                        style={
                            !lesson?.lessonID ||
                            (!isLoading && user?.role !== "ADMIN")
                                ? {
                                      backgroundColor: "#F5F6F7",
                                      border: "none",
                                      color: "#A3A3A3",
                                      cursor: "default",
                                  }
                                : undefined
                        }
                    >
                        {t("buttons.delete")}
                    </ActionButton>
                </div>
            </div>
        );
    }
);

export default LessonDesktopPage;
