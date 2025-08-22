import type { DiveResponse } from "@/entities/dive";

export type ModuleResponse = {
    moduleID: number;
    name: string;
    classID: number;
    dives: DiveResponse[];
};

export type NewModule = {
    name: string;
    classID: number;
};

export type UpdateModule = {
    name?: string;
    classID?: number;
    dives?: number[];
};
