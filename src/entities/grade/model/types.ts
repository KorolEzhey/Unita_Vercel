export type GradeResponse = {
    gradeID: number;
    diveID: number;
    userID: number;
    score: number;
};

export type NewGrade = {
    diveID: number;
    userID: number;
    score: number;
};

export type UpdateGrade = {
    diveID?: number;
    userID?: number;
    score?: number;
};

export type StudentModuleGrades = {
    studentId: number;
    moduleId: number;
    grades: GradeResponse[];
};

export type StudentModuleAverage = {
    moduleID: number;
    name: string;
    classID: number;
    averageScore: number | null;
    totalDives: number;
    gradedDives: number;
};

export type StudentModulesAverageResponse = {
    modules: StudentModuleAverage[];
};

export type StudentDiveGrade = {
    diveID: number;
    diveName: string;
    startTime: string;
    endTime: string;
    subjectID: number;
    subjectName: string;
    score: number | null;
    gradeID: number | null;
};
