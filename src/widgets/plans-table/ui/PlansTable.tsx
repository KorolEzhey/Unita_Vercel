import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { classStore } from "@/entities/class";
import { filesApi } from "@/entities/file/api/fileApi";
import Plus from "@/shared/icons/Plus.svg";
import { cleanFileName } from "@/shared/lib";
import { Select as SelectClass } from "@/shared/ui/select";
import { Table } from "@/shared/ui/table";

import { handlePlanAdd, handlePlanDelete } from "../model/handlers";
import type { Plan } from "../model/types";
import { getColumns } from "./columns";
import s from "./PlansTable.module.scss";

export const PlansTable = observer(function PlansTable() {
    const headerClasses: Record<string, string> = {
        className: s.className,
        fileName: s.fileName,
        actions: s.action,
    };
    const t = useTranslations();
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [rows, setRows] = useState<Plan[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        classStore.fetchAll();
    }, []);

    useEffect(() => {
        if (classStore.classes.length > 0 && selectedClassId === null) {
            setSelectedClassId(classStore.classes[0].classId);
        }
    }, [selectedClassId]);

    useEffect(() => {
        const fetchAll = async () => {
            if (classStore.classes.length === 0) return;
            const results = await Promise.all(
                classStore.classes.map(async (cls) => {
                    try {
                        const res = await filesApi.getClassFiles({
                            classId: cls.classId,
                        });
                        const raw = res?.data as unknown;
                        const files = Array.isArray(raw)
                            ? (raw as { fileName: string }[])
                            : Array.isArray(
                                    (raw as { files?: { fileName: string }[] })
                                        ?.files
                                )
                              ? (raw as { files: { fileName: string }[] }).files
                              : ([] as { fileName: string }[]);
                        return files.map((f: { fileName: string }) => ({
                            planId: 0,
                            classId: cls.classId,
                            className: cls.name,
                            fileName: cleanFileName(f.fileName),
                            originalFileName: f.fileName,
                        }));
                    } catch {
                        return [] as Plan[];
                    }
                })
            );
            const flat = results.flat();
            const withIds = flat.map((r, idx) => ({ ...r, planId: idx + 1 }));
            setRows(withIds);
        };
        fetchAll();
    }, [classStore.classes]);

    const onAdd = async () => {
        if (selectedClassId == null) return;
        await handlePlanAdd(
            { classId: selectedClassId, file: selectedFile },
            () => {
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        );
        const cls = classStore.classes.find(
            (c) => c.classId === selectedClassId
        );
        if (cls && selectedFile) {
            setRows((prev) => [
                {
                    planId: prev.length + 1,
                    classId: cls.classId,
                    className: cls.name,
                    fileName: cleanFileName(selectedFile.name),
                    originalFileName: selectedFile.name,
                },
                ...prev,
            ]);
        }
    };

    const onDelete = async (plan: Plan) => {
        await handlePlanDelete(plan.originalFileName);
        setRows((prev) => prev.filter((r) => r.planId !== plan.planId));
    };

    return (
        <Table
            data={rows}
            columns={getColumns(t, onDelete)}
            headerClassName={(id) => headerClasses[id] ?? ""}
            cellClassName={(id) =>
                id === "className"
                    ? s.firstColPadding
                    : id === "actions"
                      ? s.rightColCenter
                      : ""
            }
            renderExtraRowTop={() => (
                <tr className={s.line}>
                    <td>
                        <SelectClass
                            selected={selectedClassId}
                            setSelected={setSelectedClassId}
                            array={classStore.classes}
                            variant="table"
                            getLabel={(item) => item.name}
                            getValue={(item) => item.classId}
                        />
                    </td>
                    <td>
                        <div className={s.file}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className={s.input}
                                onChange={(e) =>
                                    setSelectedFile(e.target.files?.[0] ?? null)
                                }
                            />
                        </div>
                    </td>
                    <td className={s.rightColCenter}>
                        <button
                            type="button"
                            className={s.actionCell}
                            onClick={onAdd}
                        >
                            <Plus />
                        </button>
                    </td>
                    <td />
                </tr>
            )}
            renderEmptyRow
        />
    );
});
