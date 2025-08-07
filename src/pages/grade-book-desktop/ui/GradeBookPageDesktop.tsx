"use client";
import "@/shared/styles/global.scss";
import { PageTitle } from "@/shared/ui/page-title";
import s from "./GradeBookPageDesktop.module.scss";
import { NavBar } from "@/widgets/nav-bar-desktop";
import { useTranslations } from "next-intl";
import { SwitchGradeAttendance } from "@/features/switch-grade-attendance";
import { useState } from "react";
import { Select as SelectClass } from "@/shared/ui/select";
import { SwitchGradesTypes } from "@/features/switch-grades-types";
import { GradeTable } from "@/features/grade-table";
import { GradeFinalTable } from "@/features/grade-final-table";
import { match } from "ts-pattern";
import { AttendanceTable } from "@/features/attendance-table";
import { Attendance } from "@/features/attendance-table/model/types";
import { FinalGrade } from "@/features/grade-final-table/model/types";
import { Grade } from "@/features/grade-table/model/types";

export type Tab = "grades" | "attendance";
export type GradesTypes = "all" | "final";

export default function Home() {
    const t = useTranslations("navigation");
    const [activeTab, setActiveTab] = useState<Tab>("grades");
    const [activeGradeType, setActiveGradeType] = useState<GradesTypes>("all");
    const [selected, setSelected] = useState(classOptions[0]);

    return (
        <div className={s.container}>
            <div className={s.sidebar}>
                <NavBar />
            </div>

            <div className={s.topbar}>
                <PageTitle title={t("grade-book")} />
                <SelectClass
                    selected={selected}
                    setSelected={setSelected}
                    width={88}
                    array={classOptions}
                />
                <SwitchGradeAttendance
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                {activeTab === "grades" && (
                    <SwitchGradesTypes
                        activeGradeType={activeGradeType}
                        setActiveGradeType={setActiveGradeType}
                    />
                )}
            </div>

            <div className={s.content}>
                {match(activeTab)
                    .with("grades", () =>
                        match(activeGradeType)
                            .with("all", () => (
                                <GradeTable
                                    data={data}
                                    subjectsByWeek={subjectsByWeek}
                                    selectedClass={selected}
                                />
                            ))
                            .with("final", () => (
                                <GradeFinalTable
                                    data={exampleData}
                                    subjects={exampleSubjects}
                                    selectedClass={selected}
                                />
                            ))
                            .otherwise(() => null)
                    )
                    .with("attendance", () => (
                        <AttendanceTable
                            data={attendanceData}
                            subjectsByDay={subjectsByDay}
                            selectedClass={selected}
                        />
                    ))
                    .otherwise(() => null)}
            </div>
        </div>
    );
}

export const classOptions = [
    "4 Б",
    "5 А",
    "5 Б",
    "6 А",
    "6 Б",
    "7 А",
    "7 Б",
    "8 А",
    "8 Б",
    "9 А",
    "9 Б",
];

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
        date: new Date("2025-10-1"),
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
        date: new Date("2025-10-2"),
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
];
