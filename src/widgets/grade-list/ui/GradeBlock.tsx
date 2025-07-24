import clsx from 'clsx';
import type { FC } from 'react';

import { GRADE_THRESHOLDS } from '@/shared/lib/constants';

import styles from './GradeBlock.module.scss';

type GradeBlockProps = {
  grade: number;
  subject: string;
  week: string;
  onClick?: () => void;
};

const getGradeClass = (grade: number) => {
  if (grade < GRADE_THRESHOLDS.UNSATISFACTORY) return styles['grade-red'];
  if (grade < GRADE_THRESHOLDS.SATISFACTORY) return styles['grade-orange'];
  if (grade < GRADE_THRESHOLDS.GOOD) return styles['grade-yellow'];
  return styles['grade-green'];
};

export const GradeBlock: FC<GradeBlockProps> = ({
  grade,
  subject,
  week,
  onClick,
}) => {
  return (
    <div
      className={clsx(styles.gradeBlock, getGradeClass(grade))}
      onClick={onClick}
    >
      <span className={styles.grade}>{grade}</span>
      <span className={styles.subject}>{subject}</span>
      <span className={styles.week}>{week}</span>
    </div>
  );
};
