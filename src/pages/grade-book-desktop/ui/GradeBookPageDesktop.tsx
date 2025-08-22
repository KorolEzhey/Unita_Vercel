"use client";
import "@/shared/styles/global.scss";

import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";

import { classStore } from "@/entities/class";
import { PageTitle } from "@/shared/ui/page-title";
import { Select as SelectClass } from "@/shared/ui/select";
import { SwitchTabs } from "@/shared/ui/switch";
import { type Attendance, AttendanceTable } from "@/widgets/attendance-table";
import {
    GradeBookTable,
    gradeBookTableStore,
} from "@/widgets/grade-book-table";
import { type FinalGrade, GradeFinalTable } from "@/widgets/grade-final-table";
import { type Grade } from "@/widgets/grade-table";
import { NavBar } from "@/widgets/nav-bar-desktop";

import s from "./GradeBookPageDesktop.module.scss";

export default observer(function Home() {
    const t = useTranslations();
    const [activeTab, setActiveTab] = useState("grades");
    const [activeGradeType, setActiveGradeType] = useState("all");
    const [selectedClass, setSelectedClass] = useState<number | null>(null);

    useEffect(() => {
        classStore.fetchAll();
        gradeBookTableStore.fetchAllGrades();
    }, []);

    useEffect(() => {
        if (classStore.classes.length > 0 && selectedClass === null) {
            setSelectedClass(classStore.classes[0].classId);
        }
    }, [classStore.classes, selectedClass]);

    return (
        <div className={s.container}>
            <div className={s.sidebar}>
                <NavBar />
            </div>

            <div className={s.topbar}>
                <PageTitle title={t("navigation.grade-book")} />
                <SelectClass
                    selected={selectedClass}
                    setSelected={setSelectedClass}
                    width={88}
                    array={classStore.classes}
                    getLabel={(item) => item.name}
                    getValue={(item) => item.classId}
                />
                <SwitchTabs
                    variant="outlined"
                    tabs={[
                        { label: t("navigation.grade"), value: "grades" },
                        {
                            label: t("navigation.attendance"),
                            value: "attendance",
                        },
                    ]}
                    active={activeTab}
                    onChange={setActiveTab}
                />
                {activeTab === "grades" && (
                    <SwitchTabs
                        variant="flat"
                        tabs={[
                            { label: t("grades-types.all"), value: "all" },
                            { label: t("grades-types.final"), value: "final" },
                        ]}
                        active={activeGradeType}
                        onChange={setActiveGradeType}
                        buttonWidth={64}
                        buttonPadding="9px 0"
                    />
                )}
            </div>

            <div className={s.content}>
                {match(activeTab)
                    .with("grades", () =>
                        match(activeGradeType)
                            .with("all", () => (
                                <GradeBookTable
                                    selectedClass={
                                        classStore.classes.find(
                                            (cls) =>
                                                cls.classId === selectedClass
                                        )?.name || ""
                                    }
                                />
                            ))
                            .with("final", () => (
                                <GradeFinalTable
                                    data={exampleData}
                                    subjects={exampleSubjects}
                                    selectedClass={
                                        classStore.classes.find(
                                            (cls) =>
                                                cls.classId === selectedClass
                                        )?.name || ""
                                    }
                                />
                            ))
                            .otherwise(() => null)
                    )
                    .with("attendance", () => (
                        <AttendanceTable
                            data={attendanceData}
                            subjectsByDay={subjectsByDay}
                            selectedClass={
                                classStore.classes.find(
                                    (cls) => cls.classId === selectedClass
                                )?.name || classStore.classes[0].name
                            }
                        />
                    ))
                    .otherwise(() => null)}
            </div>
        </div>
    );
});

export const data: Grade[] = [
    {
        studentId: 1,
        studentName: "Юнг Августин",
        avarageScore: 100,
        grades: [
            { week: 1, grade: 100 },
            { week: 2, grade: 100 },
            { week: 3, grade: 70 },
        ],
    },
    {
        studentId: 2,
        studentName: "Бобнева Яна",
        avarageScore: 90,
        grades: [
            { week: 1, grade: 30 },
            { week: 2, grade: 90 },
            { week: 3, grade: 90 },
        ],
    },
    {
        studentId: 3,
        studentName: "Крашенинникова Анастасия",
        avarageScore: 80,
        grades: [
            { week: 1, grade: 100 },
            { week: 15, grade: 80 },
            { week: 3, grade: 80 },
        ],
    },
];

export const subjectsByWeek = [
    { week: 1, subject: "Математика" },
    { week: 2, subject: "Физика" },
    { week: 3, subject: "Химия" },
    { week: 4, subject: "Биология" },
    { week: 5, subject: "География" },
    { week: 6, subject: "История" },
    { week: 7, subject: "Литература" },
    { week: 8, subject: "Русский язык" },
    { week: 9, subject: "Английский" },
    { week: 10, subject: "Обществознание" },
    { week: 11, subject: "Информатика" },
    { week: 12, subject: "ИЗО" },
    { week: 13, subject: "Труд" },
    { week: 14, subject: "Музыка" },
    { week: 15, subject: "Физкультура" },
    { week: 16, subject: "Математика" },
    { week: 17, subject: "Физика" },
    { week: 18, subject: "Химия" },
    { week: 19, subject: "Биология" },
    { week: 20, subject: "География" },
    { week: 21, subject: "История" },
    { week: 22, subject: "Литература" },
    { week: 23, subject: "Русский язык" },
    { week: 24, subject: "Английский" },
    { week: 25, subject: "Обществознание" },
    { week: 26, subject: "Информатика" },
    { week: 27, subject: "ИЗО" },
    { week: 28, subject: "Труд" },
    { week: 29, subject: "Музыка" },
    { week: 30, subject: "Физкультура" },
    { week: 31, subject: "Математика" },
];

export const exampleSubjects = [
    "Математика",
    "Физика",
    "Химия",
    "Биология",
    "География",
    "История",
    "Литература",
    "Русский язык",
    "Английский",
    "Обществознание",
    "Информатика",
    "ИЗО",
    "Труд",
    "Музыка",
    "Физкультура",
];

export const exampleData: FinalGrade[] = [
    {
        studentId: 1,
        studentName: "Юнг Августин",
        avarageScore: 100,
        grades: [
            { subject: "Математика", grade: 100 },
            { subject: "Физика", grade: 100 },
            { subject: "Биология", grade: 100 },
            { subject: "История", grade: 100 },
            { subject: "Литература", grade: 100 },
        ],
    },
    {
        studentId: 2,
        studentName: "Бобнева Яна",
        avarageScore: 90,
        grades: [
            { subject: "Математика", grade: 90 },
            { subject: "Физика", grade: 90 },
            { subject: "Биология", grade: 90 },
            { subject: "История", grade: 90 },
            { subject: "Литература", grade: 90 },
        ],
    },
    {
        studentId: 3,
        studentName: "Крашенинникова Анастасия",
        avarageScore: 80,
        grades: [
            { subject: "Математика", grade: 80 },
            { subject: "Физика", grade: 80 },
            { subject: "Биология", grade: 80 },
            { subject: "История", grade: 80 },
            { subject: "Литература", grade: 80 },
        ],
    },
];

export const attendanceData: Attendance[] = [
    {
        studentId: 1,
        studentName: "Юнг Августин",
        attendance: [
            { date: new Date("2025-09-01"), subject: "Физика", hours: 1.5 },
            {
                date: new Date("2025-09-03"),
                subject: "Английский язык",
                hours: 2,
            },
        ],
    },
    {
        studentId: 2,
        studentName: "Бобнева Яна",
        attendance: [
            { date: new Date("2025-09-01"), subject: "История", hours: 1.5 },
            {
                date: new Date("2025-09-02"),
                subject: "Русский язык",
                hours: 1.5,
            },
        ],
    },
    {
        studentId: 3,
        studentName: "Крашенинникова Анастасия",
        attendance: [
            { date: new Date("2025-09-01"), subject: "Математика", hours: 2 },
            { date: new Date("2025-09-03"), subject: "Биология", hours: 2 },
        ],
    },
];

export const subjectsByDay = [
    {
        date: new Date("2025-09-01"),
        subjects: [
            {
                subject: "Математика",
                hours: 2,
            },
            {
                subject: "Физика",
                hours: 1.5,
            },
            {
                subject: "Биология",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Литература",
                hours: 2,
            },
        ],
    },
    {
        date: new Date("2025-09-02"),
        subjects: [
            {
                subject: "Русский язык",
                hours: 2,
            },
            {
                subject: "Литература",
                hours: 1.5,
            },
            {
                subject: "Биология",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Литература",
                hours: 2,
            },
        ],
    },
    {
        date: new Date("2025-09-03"),
        subjects: [
            {
                subject: "Английский язык",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Биология",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Литература",
                hours: 2,
            },
        ],
    },
    {
        date: new Date("2025-09-04"),
        subjects: [
            {
                subject: "Английский язык",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
        ],
    },
    {
        date: new Date("2025-09-05"),
        subjects: [
            {
                subject: "Английский язык",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
        ],
    },
    {
        date: new Date("2025-09-06"),
        subjects: [
            {
                subject: "Английский",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
        ],
    },
    {
        date: new Date("2025-09-07"),
        subjects: [
            {
                subject: "Английский",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
        ],
    },
    {
        date: new Date("2025-09-08"),
        subjects: [
            {
                subject: "Английский",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
        ],
    },
    {
        date: new Date("2025-09-09"),
        subjects: [
            {
                subject: "Английский",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
        ],
    },
    {
        date: new Date("2025-10-01"),
        subjects: [
            {
                subject: "Английский",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
        ],
    },
    {
        date: new Date("2025-10-02"),
        subjects: [
            {
                subject: "Английский",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
        ],
    },
    {
        date: new Date("2025-10-03"),
        subjects: [
            {
                subject: "Английский язык",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Биология",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Литература",
                hours: 2,
            },
        ],
    },
    {
        date: new Date("2025-10-04"),
        subjects: [
            {
                subject: "Английский язык",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Биология",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Литература",
                hours: 2,
            },
        ],
    },
    {
        date: new Date("2025-10-05"),
        subjects: [
            {
                subject: "Английский язык",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Биология",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Литература",
                hours: 2,
            },
        ],
    },
    {
        date: new Date("2025-10-06"),
        subjects: [
            {
                subject: "Английский язык",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Биология",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Литература",
                hours: 2,
            },
        ],
    },
    {
        date: new Date("2025-10-07"),
        subjects: [
            {
                subject: "Английский язык",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Биология",
                hours: 2,
            },
            {
                subject: "История",
                hours: 1.5,
            },
            {
                subject: "Литература",
                hours: 2,
            },
        ],
    },
];
