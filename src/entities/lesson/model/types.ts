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
    classroom: string;
    class: string;
    weekPattern: number;
    topics: LessonTopic[];
};

export type LessonResponse = {
    lessonID: number;
    classID: number;
    subjectID: number;
    teacherID: number;
    startTime: string;
    endTime: string;
    theme: string;
    description: string;

    class: {
        classID: number;
        name: string;
    };

    subject: {
        subjectID: number;
        name: string;
    };

    teacher: {
        userID: number;
        user: {
            userID: number;
            fullName: string;
            role: string;
        };
    };
};

export type NewLesson = {
    classID: number;
    subjectID: number;
    teacherID: number;
    startTime: string;
    endTime: string;
    theme: string;
    description: string;
};
