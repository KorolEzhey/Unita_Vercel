import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { filesApi } from "@/entities/file/api/fileApi";
import { teacherStore } from "@/entities/teacher";
import Plus from "@/shared/icons/Plus.svg";
import { cleanFileName } from "@/shared/lib";
import { Select as SelectTeacher } from "@/shared/ui/select";
import { Table } from "@/shared/ui/table";

import { handleLoadAdd, handleLoadDelete } from "../model/handlers";
import type { Load } from "../model/types";
import { getColumns } from "./columns";
import s from "./LoadsTable.module.scss";

export const LoadsTable = observer(function LoadsTable() {
    const headerClasses: Record<string, string> = {
        teacher: s.teacher,
        fileName: s.fileName,
        actions: s.action,
    };
    const t = useTranslations();
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(
        null
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [rows, setRows] = useState<Load[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        teacherStore.fetchAll();
    }, []);

    useEffect(() => {
        if (teacherStore.teachers.length > 0 && selectedTeacherId === null) {
            setSelectedTeacherId(teacherStore.teachers[0].teacherId);
        }
    }, [selectedTeacherId]);

    useEffect(() => {
        const fetchAll = async () => {
            if (teacherStore.teachers.length === 0) return;
            const results = await Promise.all(
                teacherStore.teachers.map(async (tch) => {
                    try {
                        const res = await filesApi.getTeacherFilesById({
                            teacherId: tch.teacherId,
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
                            loadId: 0,
                            teacherId: tch.teacherId,
                            teacherName: tch.fullName,
                            fileName: cleanFileName(f.fileName),
                            originalFileName: f.fileName,
                        }));
                    } catch {
                        return [] as Load[];
                    }
                })
            );
            const flat = results.flat();
            const withIds = flat.map((r, idx) => ({ ...r, loadId: idx + 1 }));
            setRows(withIds);
        };
        fetchAll();
    }, []);

    const onAdd = async () => {
        if (selectedTeacherId == null) return;
        await handleLoadAdd(
            { teacherId: selectedTeacherId, file: selectedFile },
            () => {
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        );
        const tch = teacherStore.teachers.find(
            (t) => t.teacherId === selectedTeacherId
        );
        if (tch && selectedFile) {
            setRows((prev) => [
                {
                    loadId: prev.length + 1,
                    teacherId: tch.teacherId,
                    teacherName: tch.fullName,
                    fileName: cleanFileName(selectedFile.name),
                    originalFileName: selectedFile.name,
                },
                ...prev,
            ]);
        }
    };

    const onDelete = async (load: Load) => {
        await handleLoadDelete(load.originalFileName);
        setRows((prev) => prev.filter((r) => r.loadId !== load.loadId));
    };

    return (
        <Table
            data={rows}
            columns={getColumns(t, onDelete)}
            headerClassName={(id) => headerClasses[id] ?? ""}
            cellClassName={(id) => (id === "teacherName" ? s.teacher : "")}
            renderExtraRowTop={() => (
                <tr className={s.line}>
                    <td>
                        <SelectTeacher
                            selected={selectedTeacherId}
                            setSelected={setSelectedTeacherId}
                            array={teacherStore.teachers}
                            variant="table"
                            getLabel={(item) => item.fullName}
                            getValue={(item) => item.teacherId}
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
                    <td>
                        <button
                            type="button"
                            onClick={onAdd}
                            className={s.actionCell}
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
