export type DiveResponse = {
    diveID: number;
    name: string;
    startTime: string;
    endTime: string;
    subjectID: number;
};

export type NewDive = {
    name: string;
    startTime: string;
    endTime: string;
    subjectID: number;
};

export type UpdateDive = {
    name?: string;
    startTime?: string;
    endTime?: string;
    subjectID?: number;
};
