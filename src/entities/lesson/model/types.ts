export type MaterialFile = {
    id: string;
    name: string;
    url: string;
};

export type LessonTopic = {
    id: string;
    title: string;
    description?: string;
    materials?: MaterialFile[];
};

export type Lesson = {
    id: string;
    title: string;
    teacher: string;
    startTime: string;
    endTime: string;
    description?: string;
    classroom?: string;
    topics: LessonTopic[];
};
