import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { classStore } from "@/entities/class";
import { diveStore } from "@/entities/dive";
import { modulesApi } from "@/entities/module";
import { subjectStore } from "@/entities/subject";
import { Calendar } from "@/features/calendar";
import Close from "@/shared/icons/Close.svg";
import Upload from "@/shared/icons/Upload.svg";
import { Select as SelectSubject } from "@/shared/ui/select";
import { Table } from "@/shared/ui/table";

import {
    handleDiveDelete,
    handleDiveUpdate,
    handleModuleCreate,
    handleModuleDelete,
} from "../model/handlers";
import { moduleStore } from "../model/moduleStore";
import type { DiveFormData, ModuleFormData, ModuleType } from "../model/types";
import { getColumns } from "./columns";
import s from "./Module.module.scss";

type Props = {
    data: ModuleType;
};

export const Module = observer(function Module({ data }: Props) {
    const t = useTranslations();
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
    const [moduleName, setModuleName] = useState<string>("");
    const [isEditingName, setIsEditingName] = useState(false);
    const [editingName, setEditingName] = useState<string>("");
    const [dives, setDives] = useState<DiveFormData[]>([
        { name: "", startTime: "", endTime: "", subjectID: 0 },
        { name: "", startTime: "", endTime: "", subjectID: 0 },
        { name: "", startTime: "", endTime: "", subjectID: 0 },
        { name: "", startTime: "", endTime: "", subjectID: 0 },
        { name: "", startTime: "", endTime: "", subjectID: 0 },
    ]);

    // Состояние для создания нового дайва
    const [newDive, setNewDive] = useState({
        subjectID: subjectStore.subjects[0]?.subjectId || 0,
        startTime: "",
        endTime: "",
    });

    const formatDate = (dateString: string) => {
        if (dateString.includes("T")) {
            return dateString.split("T")[0];
        }
        if (dateString.includes("00:00:00.000Z")) {
            return dateString.replace("T00:00:00.000Z", "");
        }
        return dateString;
    };

    const headerClasses: Record<string, string> = {
        id: s.indexHeader,
        period: s.periodHeader,
        actions: s.actionHeader,
        subject: s.moduleHeader,
    };

    useEffect(() => {
        subjectStore.fetchAll();
        classStore.fetchAll();
    }, []);

    useEffect(() => {
        if (classStore.classes.length > 0 && selectedClassId === null) {
            // Если у модуля уже есть класс, используем его, иначе берем первый доступный
            const moduleClassId = data.classID || classStore.classes[0].classId;
            setSelectedClassId(moduleClassId);
        }
    }, [selectedClassId, data.classID, classStore.classes]);

    // Инициализируем название модуля при загрузке
    useEffect(() => {
        if (data.name) {
            setModuleName(data.name);
            setEditingName(data.name);
        }
    }, [data.name]);

    // Функция для обновления названия модуля
    const handleUpdateModuleName = async (newName: string) => {
        if (!data.id || !newName.trim()) return;

        try {
            await modulesApi.updateModule({
                moduleId: data.id,
                data: { name: newName.trim() },
            });

            setModuleName(newName.trim());
            setIsEditingName(false);

            // Обновляем данные модуля
            const updatedModule = await modulesApi.getById({
                moduleId: data.id,
            });
            if (updatedModule.data) {
                Object.assign(data, updatedModule.data);
            }
        } catch (error) {
            console.error("Ошибка обновления названия модуля:", error);
            setEditingName(moduleName); // Возвращаем старое название при ошибке
        }
    };

    // Функция для обновления класса модуля
    const handleUpdateModuleClass = async (newClassId: number) => {
        if (!data.id || newClassId === selectedClassId) return;

        try {
            await modulesApi.updateModule({
                moduleId: data.id,
                data: { classID: newClassId },
            });

            setSelectedClassId(newClassId);

            // Обновляем данные модуля
            const updatedModule = await modulesApi.getById({
                moduleId: data.id,
            });
            if (updatedModule.data) {
                Object.assign(data, updatedModule.data);
            }
        } catch (error) {
            console.error("Ошибка обновления класса модуля:", error);
            // Возвращаем старый класс при ошибке
            // Не вызываем setSelectedClassId здесь, чтобы избежать рекурсии
        }
    };

    const handleCreateModule = async () => {
        if (!selectedClassId || !moduleName) return;

        const moduleData: ModuleFormData = {
            name: moduleName,
            classID: selectedClassId,
            dives: dives,
        };

        try {
            await handleModuleCreate(moduleData, () => {
                setModuleName("");
                setDives([
                    { name: "", startTime: "", endTime: "", subjectID: 0 },
                    { name: "", startTime: "", endTime: "", subjectID: 0 },
                    { name: "", startTime: "", endTime: "", subjectID: 0 },
                    { name: "", startTime: "", endTime: "", subjectID: 0 },
                    { name: "", startTime: "", endTime: "", subjectID: 0 },
                ]);
                moduleStore.fetchAll();
            });
        } catch (error) {
            console.error("Ошибка создания модуля:", error);
        }
    };

    const handleDeleteModule = async (moduleId: number) => {
        try {
            await handleModuleDelete(moduleId, () => {
                moduleStore.fetchAll();
            });
        } catch (error) {
            console.error("Ошибка удаления модуля:", error);
        }
    };

    const handleDeleteDive = async (diveId: number) => {
        try {
            await handleDiveDelete(diveId, async () => {
                const updatedModule = await modulesApi.getById({
                    moduleId: data.id,
                });
                if (updatedModule.data) {
                    Object.assign(data, updatedModule.data);
                }
            });
        } catch (error) {
            console.error("Ошибка удаления дайва:", error);
        }
    };

    const handleUpdateDive = async (diveId: number, diveData: any) => {
        try {
            const formattedData = {
                ...diveData,
                startTime: diveData.startTime
                    ? formatDate(diveData.startTime)
                    : undefined,
                endTime: diveData.endTime
                    ? formatDate(diveData.endTime)
                    : undefined,
            };

            await handleDiveUpdate(diveId, formattedData, async () => {
                const updatedModule = await modulesApi.getById({
                    moduleId: data.id,
                });
                if (updatedModule.data) {
                    Object.assign(data, updatedModule.data);
                }
            });
        } catch (error) {
            console.error("Ошибка обновления дайва:", error);
        }
    };

    const updateDive = (
        index: number,
        field: keyof DiveFormData,
        value: string | number
    ) => {
        setDives((prev) =>
            prev.map((dive, i) =>
                i === index ? { ...dive, [field]: value } : dive
            )
        );
    };

    return (
        <div className={s.root}>
            {/* Заголовок модуля с возможностью редактирования и селектор класса */}
            <div className={s.moduleHeader}>
                <div className={s.headerContent}>
                    {isEditingName ? (
                        <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onBlur={() => handleUpdateModuleName(editingName)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    handleUpdateModuleName(editingName);
                                }
                                if (e.key === "Escape") {
                                    setEditingName(moduleName);
                                    setIsEditingName(false);
                                }
                            }}
                            className={s.moduleNameInput}
                            autoFocus
                        />
                    ) : (
                        <h3
                            className={s.moduleName}
                            onClick={() => setIsEditingName(true)}
                            title="Кликните для редактирования"
                        >
                            {moduleName || "Название модуля"}
                        </h3>
                    )}
                    <SelectSubject
                        selected={selectedClassId || 0}
                        setSelected={handleUpdateModuleClass}
                        array={classStore.classes}
                        variant="table"
                        getLabel={(item) => item.name}
                        getValue={(item) => item.classId}
                    />
                </div>
            </div>

            <Table
                data={data.dives ?? []}
                columns={getColumns(
                    data,
                    subjectStore.subjects,
                    () => {},
                    t,
                    handleDeleteModule,
                    handleUpdateDive,
                    handleDeleteDive
                )}
                headerClassName={(id) => headerClasses[id] ?? ""}
                cellClassName={(id) => (id === "id" ? s.indexCell : "")}
                renderExtraRowBottom={(extraIndex: number) => {
                    if (extraIndex === 0) {
                        return (
                            <tr className={s.line}>
                                <td className={s.indexCell}>
                                    {(data.dives?.length ?? 0) + 1}
                                </td>
                                <td>
                                    <SelectSubject
                                        selected={newDive.subjectID}
                                        setSelected={(subjectId) => {
                                            setNewDive((prev) => ({
                                                ...prev,
                                                subjectID: subjectId,
                                            }));
                                        }}
                                        array={subjectStore.subjects}
                                        variant="table"
                                        getLabel={(item) => item.name}
                                        getValue={(item) => item.subjectId}
                                    />
                                </td>
                                <td>
                                    <div className={s.periodInputs}>
                                        <Calendar
                                            value={newDive.startTime}
                                            onChange={(date) => {
                                                setNewDive((prev) => ({
                                                    ...prev,
                                                    startTime: date,
                                                }));
                                            }}
                                            className={s.dateInput}
                                        />
                                        <span>—</span>
                                        <Calendar
                                            value={newDive.endTime}
                                            onChange={(date) => {
                                                setNewDive((prev) => ({
                                                    ...prev,
                                                    endTime: date,
                                                }));
                                            }}
                                            className={s.dateInput}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className={s.actionCell}
                                        onClick={async () => {
                                            if (
                                                newDive.subjectID &&
                                                newDive.startTime &&
                                                newDive.endTime
                                            ) {
                                                try {
                                                    if (!data.id) {
                                                        console.error(
                                                            "ID модуля не найден"
                                                        );
                                                        return;
                                                    }

                                                    try {
                                                        await modulesApi.getById(
                                                            {
                                                                moduleId:
                                                                    data.id,
                                                            }
                                                        );
                                                    } catch (moduleError: any) {
                                                        console.error(
                                                            "Модуль не найден на бэкенде:",
                                                            moduleError.response
                                                                ?.status
                                                        );
                                                        return;
                                                    }

                                                    const diveData = {
                                                        name: `Дайв ${(data.dives?.length ?? 0) + 1}`,
                                                        startTime:
                                                            newDive.startTime,
                                                        endTime:
                                                            newDive.endTime,
                                                        subjectID:
                                                            newDive.subjectID,
                                                    };

                                                    const formattedDiveData = {
                                                        ...diveData,
                                                        startTime: formatDate(
                                                            diveData.startTime
                                                        ),
                                                        endTime: formatDate(
                                                            diveData.endTime
                                                        ),
                                                    };

                                                    await modulesApi.addDiveToModule(
                                                        {
                                                            moduleId: data.id,
                                                            dive: formattedDiveData,
                                                        }
                                                    );

                                                    setNewDive({
                                                        subjectID:
                                                            subjectStore
                                                                .subjects[0]
                                                                ?.subjectId ||
                                                            0,
                                                        startTime: "",
                                                        endTime: "",
                                                    });

                                                    const updatedModule =
                                                        await modulesApi.getById(
                                                            {
                                                                moduleId:
                                                                    data.id,
                                                            }
                                                        );

                                                    if (updatedModule.data) {
                                                        Object.assign(
                                                            data,
                                                            updatedModule.data
                                                        );
                                                    }
                                                } catch (error) {
                                                    console.error(
                                                        "Ошибка создания дайва:",
                                                        error
                                                    );
                                                }
                                            } else {
                                                console.log(
                                                    "Заполните все поля для создания дайва"
                                                );
                                            }
                                        }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Upload />
                                    </button>
                                </td>
                            </tr>
                        );
                    }

                    return (
                        <tr className={s.line}>
                            <td className={s.indexCell}>
                                {(data.dives?.length ?? 0) + extraIndex + 1}
                            </td>
                            <td>
                                <span style={{ color: "#999" }}>—</span>
                            </td>
                            <td>
                                <span style={{ color: "#999" }}>—</span>
                            </td>
                            <td className={s.emptyActionCell}>
                                <Close />
                            </td>
                        </tr>
                    );
                }}
                minRows={5}
            />
        </div>
    );
});
