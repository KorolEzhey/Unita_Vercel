import { createColumnHelper, type Row } from "@tanstack/react-table";

import { Calendar as CalendarComponent } from "@/features/calendar";
import _Calendar from "@/shared/icons/Calendar.svg";
import Close from "@/shared/icons/Close.svg";
import Trash from "@/shared/icons/Trash.svg";
import { Select as SelectSubject } from "@/shared/ui/select";

import type { Dive, ModuleType } from "../model/types";
import s from "./Module.module.scss";

const columnHelper = createColumnHelper<Dive>();

export const getColumns = (
    module: ModuleType,
    subjects: any[],
    setSelected: (value: string) => void,
    t: (key: string) => string,
    deleteModule: (id: number) => void,
    updateDive?: (diveId: number, data: any) => void,
    deleteDive?: (diveId: number) => void
) => [
    columnHelper.accessor("diveID", {
        header: "№",
        cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("subject", {
        header: "Погружения",
        cell: ({ row }: { row: Row<Dive> }) => (
            <SelectSubject
                selected={row.original.subjectID || 0}
                setSelected={(subjectId) => {
                    if (updateDive && row.original.diveID) {
                        updateDive(row.original.diveID, {
                            subjectID: subjectId,
                        });
                    }
                }}
                array={subjects}
                variant="table"
                getLabel={(item) => item.name}
                getValue={(item) => item.subjectId}
            />
        ),
    }),
    columnHelper.display({
        id: "period",
        header: t("dive_table.period"),
        cell: ({ row }: { row: Row<Dive> }) => {
            const { startTime, endTime } = row.original;

            const formatDate = (dateString: string) => {
                if (dateString.includes("T")) {
                    return dateString.split("T")[0];
                }
                if (dateString.includes("00:00:00.000Z")) {
                    return dateString.replace("T00:00:00.000Z", "");
                }
                return dateString;
            };

            return (
                <div className={s.periodInputs}>
                    <CalendarComponent
                        value={startTime ? formatDate(startTime) : ""}
                        onChange={(date) => {
                            if (updateDive && row.original.diveID) {
                                updateDive(row.original.diveID, {
                                    startTime: date,
                                });
                            }
                        }}
                        className={s.dateInput}
                    />
                    <span>—</span>
                    <CalendarComponent
                        value={endTime ? formatDate(endTime) : ""}
                        onChange={(date) => {
                            if (updateDive && row.original.diveID) {
                                updateDive(row.original.diveID, {
                                    endTime: date,
                                });
                            }
                        }}
                        className={s.dateInput}
                    />
                </div>
            );
        },
    }),
    columnHelper.display({
        id: "actions",
        header: () => (
            <button
                className={s.actionCell}
                onClick={() => deleteModule(module.id)}
            >
                <Trash />
            </button>
        ),
        cell: ({ row }: { row: Row<Dive> }) => (
            <button
                className={s.actionCell}
                onClick={() => {
                    if (deleteDive && row.original.diveID) {
                        deleteDive(row.original.diveID);
                    }
                }}
                style={{ cursor: "pointer" }}
            >
                <Close />
            </button>
        ),
    }),
];
