export type Load = {
    loadId: number;
    teacherId: number;
    teacherName: string;
    fileName: string; // очищенное имя для отображения
    originalFileName: string; // полное имя для операций с сервером
};
