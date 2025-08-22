import type { DiveResponse as _DiveResponse } from "@/entities/dive";
import type { ModuleResponse as _ModuleResponse } from "@/entities/module";

export type Dive = {
    diveID: number;
    subject: string;

    // Поля для работы с бэкендом
    subjectID?: number;
    startTime?: string;
    endTime?: string;
};

export type ModuleType = {
    id: number;
    name?: string;
    classID?: number;
    dives?: Dive[];
};

// Типы для работы с бэкендом
export type DiveFormData = {
    name: string;
    startTime: string;
    endTime: string;
    subjectID: number;
};

export type ModuleFormData = {
    name: string;
    classID: number;
    dives: DiveFormData[];
};
