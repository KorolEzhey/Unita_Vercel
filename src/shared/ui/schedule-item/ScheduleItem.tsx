import type { FC } from 'react';

import { ScheduleText } from '../text/';
import s from './ScheduleItem.module.scss';

export interface ScheduleItemProps {
  time: string;
  subject: string;
  teacher: string;
}

export const ScheduleItem: FC<ScheduleItemProps> = ({
  time,
  subject,
  teacher,
}) => (
  <>
    <ScheduleText variant="time">{time}</ScheduleText>
    <li className={s.item}>
      <ScheduleText variant="subject">{subject}</ScheduleText>
      <ScheduleText variant="teacher">{teacher}</ScheduleText>
    </li>
  </>
);
