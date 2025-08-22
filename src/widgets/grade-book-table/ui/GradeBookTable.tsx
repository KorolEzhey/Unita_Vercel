import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { classStore } from "@/entities/class";
import { diveStore } from "@/entities/dive";
import { moduleStore } from "@/entities/module";
import { studentStore } from "@/entities/student";
import { subjectStore } from "@/entities/subject";
import { GRADE_THRESHOLDS } from "@/shared/lib/constants";

import { gradeBookTableStore } from "../model/gradeBookTableStore";
import s from "./GradeBookTable.module.scss";

const KEY_NAMES = {
    ENTER: "Enter",
};

export const GradeBookTable = observer(
    ({ selectedClass }: { selectedClass: string }) => {
        const t = useTranslations();
        const [isLoading, setIsLoading] = useState(true);

        // Функция для обработки изменений оценок
        const handleGradeChange = async (
            studentId: number,
            diveId: number,
            newGrade: number
        ) => {
            try {
                const existingGrade = gradeBookTableStore.grades.find(
                    (grade) =>
                        grade.userID === studentId && grade.diveID === diveId
                );

                if (existingGrade) {
                    await gradeBookTableStore.updateGrade(
                        existingGrade.gradeID,
                        {
                            score: newGrade,
                        }
                    );
                } else {
                    await gradeBookTableStore.createGrade({
                        diveID: diveId,
                        userID: studentId,
                        score: newGrade,
                    });
                }

                // Обновляем данные
                await gradeBookTableStore.fetchAllGrades();
            } catch (error) {
                console.error("Ошибка при изменении оценки:", error);
            }
        };

        useEffect(() => {
            const loadData = async () => {
                try {
                    setIsLoading(true);
                    await Promise.all([
                        studentStore.fetchAll(),
                        diveStore.fetchAll(),
                        subjectStore.fetchAll(),
                        moduleStore.fetchAll(),
                    ]);
                } catch (error) {
                    console.error("Ошибка загрузки данных:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            loadData();
        }, []);

        if (isLoading) {
            return <div>Загрузка данных...</div>;
        }

        if (!studentStore.students || studentStore.students.length === 0) {
            return <div>Нет студентов для отображения</div>;
        }

        if (!diveStore.dives || diveStore.dives.length === 0) {
            return <div>Нет дайвов для отображения</div>;
        }

        const classStudents = studentStore.students.filter(
            (student) => student.className === selectedClass
        );

        if (classStudents.length === 0) {
            return <div>В классе {selectedClass} нет студентов</div>;
        }

        const selectedClassId = classStore.classes.find(
            (cls) => cls.name === selectedClass
        )?.classId;

        if (!selectedClassId) {
            return <div>Класс {selectedClass} не найден</div>;
        }

        const classModules = moduleStore.modules.filter(
            (module) => module.classID === selectedClassId
        );

        const classDives = classModules.flatMap((module) => module.dives);

        if (classDives.length === 0) {
            return <div>В классе {selectedClass} нет дайвов</div>;
        }

        const getGradeColor = (grade: number | undefined) => {
            if (!grade) return "";
            if (grade < GRADE_THRESHOLDS.UNSATISFACTORY) return s.gradeRed;
            if (grade < GRADE_THRESHOLDS.SATISFACTORY) return s.gradeOrange;
            if (grade < GRADE_THRESHOLDS.GOOD) return s.gradeYellow;
            return s.gradeGreen;
        };

        const EditableGradeCell = ({
            studentId,
            diveId,
            currentGrade,
        }: {
            studentId: number;
            diveId: number;
            currentGrade: number | undefined;
        }) => {
            const [isEditing, setIsEditing] = useState(false);
            const [value, setValue] = useState(currentGrade?.toString() || "");
            const [isSaving, setIsSaving] = useState(false);

            const handleSave = async () => {
                const numValue = Number(value);
                if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                    setIsSaving(true);
                    try {
                        await handleGradeChange(studentId, diveId, numValue);
                    } finally {
                        setIsSaving(false);
                    }
                } else {
                    // Возвращаем исходное значение при некорректном вводе
                    setValue(currentGrade?.toString() || "");
                }
                setIsEditing(false);
            };

            const handleKeyDown = (e: React.KeyboardEvent) => {
                if (e.key === KEY_NAMES.ENTER) {
                    e.preventDefault();
                    handleSave();
                } else if (e.key === "Escape") {
                    setIsEditing(false);
                    setValue(currentGrade?.toString() || "");
                }
            };

            if (isEditing) {
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className={s.input}
                        autoFocus
                        min="0"
                        max="100"
                    />
                );
            }

            if (isSaving) {
                return (
                    <div className={s.gradeCell}>
                        <span style={{ fontSize: "12px", color: "#6c757d" }}>
                            Сохранение...
                        </span>
                    </div>
                );
            }

            return (
                <div
                    className={`${s.gradeCell} ${getGradeColor(currentGrade)}`}
                    onClick={() => setIsEditing(true)}
                    style={{ cursor: "pointer" }}
                    title="Кликните для редактирования"
                >
                    {currentGrade || "-"}
                </div>
            );
        };

        return (
            <div className={s.container}>
                <table className={s.table}>
                    <thead>
                        <tr>
                            <th
                                colSpan={2}
                                rowSpan={2}
                                className={`${s.classHeader} ${s.sticky1}`}
                            >
                                {t("dive_table.class-label")}: {selectedClass}
                            </th>
                            <th
                                colSpan={1}
                                className={`${s.weekNumber} ${s.stickyWeek}`}
                            >
                                {t("dive_table.week")}
                            </th>
                            {classDives.map((dive, index) => (
                                <th key={dive.diveID} className={s.weekHeader}>
                                    {index + 1}
                                </th>
                            ))}
                        </tr>

                        <tr>
                            <th colSpan={1} className={s.sticky2} />
                            {classDives.map((dive) => {
                                const subject = subjectStore.subjects.find(
                                    (s) => s.subjectId === dive.subjectID
                                );
                                return (
                                    <th
                                        key={`subject-${dive.diveID}`}
                                        rowSpan={2}
                                        className={s.subjectWrapper}
                                    >
                                        <span className={s.subjectName}>
                                            {subject?.name || "Неизвестно"}
                                        </span>
                                    </th>
                                );
                            })}
                        </tr>

                        <tr>
                            <th className={`${s.indexColumn} ${s.sticky1}`}>
                                №
                            </th>
                            <th className={`${s.nameColumn} ${s.sticky2}`}>
                                {t("dive_table.full-name")}
                            </th>
                            <th className={`${s.averageColumn} ${s.sticky3}`}>
                                {t("dive_table.average")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {classStudents.map((student, index) => {
                            const studentGrades =
                                gradeBookTableStore.getGradesByStudent(
                                    student.studentId
                                );

                            return (
                                <tr key={student.studentId}>
                                    <td
                                        className={`${s.indexColumn} ${s.sticky1}`}
                                    >
                                        {index + 1}
                                    </td>
                                    <td
                                        className={`${s.nameColumn} ${s.sticky2}`}
                                    >
                                        {student.fullName}
                                    </td>
                                    <td
                                        className={`${s.averageColumn} ${s.sticky3}`}
                                    >
                                        {studentGrades.length > 0
                                            ? Math.round(
                                                  studentGrades.reduce(
                                                      (sum, g) => sum + g.score,
                                                      0
                                                  ) / studentGrades.length
                                              )
                                            : "-"}
                                    </td>
                                    {classDives.map((dive) => {
                                        const grade = studentGrades.find(
                                            (g) => g.diveID === dive.diveID
                                        );
                                        return (
                                            <td
                                                key={`grade-${student.studentId}-${dive.diveID}`}
                                                className={s.cell}
                                            >
                                                <EditableGradeCell
                                                    studentId={
                                                        student.studentId
                                                    }
                                                    diveId={dive.diveID}
                                                    currentGrade={grade?.score}
                                                />
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
);
