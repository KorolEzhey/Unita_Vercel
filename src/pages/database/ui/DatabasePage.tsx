"use client";
import "@/shared/styles/global.scss";

import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";

import { classStore } from "@/entities/class";
import { studentStore } from "@/entities/student";
import { subjectStore } from "@/entities/subject";
import { teacherStore } from "@/entities/teacher";
import { AddModule } from "@/features/add-module";
import { PageTitle } from "@/shared/ui/page-title";
import { Select as SelectClass } from "@/shared/ui/select";
import { SwitchTabs } from "@/shared/ui/switch";
import { DesktopGuard } from "@/shared/ui";
import { ClassesTable } from "@/widgets/classes-table";
import { Module, moduleStore } from "@/widgets/module";
import { handleModuleCreate } from "@/widgets/module/model/handlers";
import { NavBar } from "@/widgets/nav-bar-desktop";
import { SubjectsTable } from "@/widgets/subjects-table";
import { UsersTable } from "@/widgets/users-table";

import s from "./DatabasePage.module.scss";

export default observer(function Home() {
    const t = useTranslations();
    const [activeTab, setActiveTab] = useState("module");
    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [activeUser, setActiveUser] = useState("student");
    const [activeEntitie, setActiveEntitie] = useState("class");

    useEffect(() => {
        moduleStore.fetchAll();
    }, []);

    useEffect(() => {
        studentStore.fetchAll();
        classStore.fetchAll();
        teacherStore.fetchAll();
        subjectStore.fetchAll();
    }, []);

    useEffect(() => {
        if (classStore.classes.length > 0 && selectedClass === null) {
            setSelectedClass(classStore.classes[0].classId);
        }
    }, [classStore.classes, selectedClass]);

    // Фильтруем модули по выбранному классу
    const filteredModules = moduleStore.modules.filter(
        (module) => module.classID === selectedClass
    );

    return (
        <DesktopGuard>
            <div className={s.container}>
                <div className={s.sidebar}>
                    <NavBar />
                </div>

                <div className={s.topbar}>
                    <PageTitle title={t("navigation.database")} />
                    <SwitchTabs
                        variant="outlined"
                        tabs={[
                            { label: t("tabs.module"), value: "module" },
                            { label: t("tabs.users"), value: "users" },
                            { label: t("tabs.other"), value: "other" },
                        ]}
                        active={activeTab}
                        onChange={setActiveTab}
                    />
                    {match(activeTab)
                        .with("module", () => (
                            <div className={s.header}>
                                <SelectClass
                                    selected={selectedClass}
                                    setSelected={setSelectedClass}
                                    width={88}
                                    array={classStore.classes}
                                    getLabel={(item) => item.name}
                                    getValue={(item) => item.classId}
                                />
                                <AddModule
                                    handleAdd={async () => {
                                        try {
                                            const moduleData = {
                                                name: `Модуль ${moduleStore.modules.length + 1}`,
                                                classID: selectedClass || 1,
                                                dives: [
                                                    {
                                                        name: "Дайв 1",
                                                        startTime:
                                                            "2024-01-01T00:00:00.000Z",
                                                        endTime:
                                                            "2024-01-07T23:59:59.000Z",
                                                        subjectID: 1,
                                                    },
                                                    {
                                                        name: "Дайв 2",
                                                        startTime:
                                                            "2024-01-08T00:00:00.000Z",
                                                        endTime:
                                                            "2024-01-14T23:59:59.000Z",
                                                        subjectID: 1,
                                                    },
                                                    {
                                                        name: "Дайв 3",
                                                        startTime:
                                                            "2024-01-15T00:00:00.000Z",
                                                        endTime:
                                                            "2024-01-21T23:59:59.000Z",
                                                        subjectID: 1,
                                                    },
                                                    {
                                                        name: "Дайв 4",
                                                        startTime:
                                                            "2024-01-22T00:00:00.000Z",
                                                        endTime:
                                                            "2024-01-28T23:59:59.000Z",
                                                        subjectID: 1,
                                                    },
                                                    {
                                                        name: "Дайв 5",
                                                        startTime:
                                                            "2024-01-29T00:00:00.000Z",
                                                        endTime:
                                                            "2024-02-04T23:59:59.000Z",
                                                        subjectID: 1,
                                                    },
                                                ],
                                            };

                                            await handleModuleCreate(
                                                moduleData,
                                                () => {
                                                    moduleStore.fetchAll();
                                                }
                                            );
                                        } catch (error) {
                                            console.error(
                                                "Ошибка создания модуля:",
                                                error
                                            );
                                        }
                                    }}
                                />
                            </div>
                        ))
                        .with("users", () => (
                            <SwitchTabs
                                variant="flat"
                                tabs={[
                                    {
                                        label: t("roles.student"),
                                        value: "student",
                                    },
                                    {
                                        label: t("roles.teacher"),
                                        value: "teacher",
                                    },
                                ]}
                                active={activeUser}
                                onChange={setActiveUser}
                                buttonWidth={68}
                                buttonPadding="9px 0"
                            />
                        ))
                        .with("other", () => (
                            <SwitchTabs
                                variant="flat"
                                tabs={[
                                    { label: t("tabs.class"), value: "class" },
                                    {
                                        label: t("tabs.subject"),
                                        value: "subject",
                                    },
                                ]}
                                active={activeEntitie}
                                onChange={setActiveEntitie}
                                buttonWidth={68}
                                buttonPadding="9px 0"
                            />
                        ))
                        .otherwise(() => null)}
                </div>

                <div
                    className={clsx(s.content, {
                        [s.moduleTab]: activeTab === "module",
                    })}
                >
                    {match({ activeTab, activeUser, activeEntitie })
                        .with({ activeTab: "module" }, () => (
                            <div className={s.grid}>
                                {filteredModules.map((module) => (
                                    <Module key={module.id} data={module} />
                                ))}
                            </div>
                        ))
                        .with(
                            { activeTab: "users", activeUser: "student" },
                            () => (
                                <UsersTable
                                    data={studentStore.students}
                                    classes={classStore.classes}
                                    isStudentsTable
                                />
                            )
                        )
                        .with(
                            { activeTab: "users", activeUser: "teacher" },
                            () => <UsersTable data={teacherStore.teachers} />
                        )
                        .with(
                            { activeTab: "other", activeEntitie: "class" },
                            () => <ClassesTable data={classStore.classes} />
                        )
                        .with(
                            { activeTab: "other", activeEntitie: "subject" },
                            () => <SubjectsTable data={subjectStore.subjects} />
                        )
                        .otherwise(() => null)}
                </div>
            </div>
        </DesktopGuard>
    );
});
