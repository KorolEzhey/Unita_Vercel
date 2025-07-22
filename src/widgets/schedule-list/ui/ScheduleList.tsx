import { ScheduleItem } from "@/shared/ui/schedule-item";
import { mockLessons } from "@/shared/ui/text";

import s from "./ScheduleList.module.scss";

// TODO: Заменить тестовые данные на получение реального расписания с бэкенда

export const ScheduleList = () => (
    <div className={s.root}>
        <ul className={s.list}>
            {mockLessons.map((lesson) => (
                <ScheduleItem
                    key={lesson.id}
                    time={lesson.time}
                    subject={lesson.subject}
                    teacher={lesson.teacher}
                />
            ))}
        </ul>
    </div>
);
