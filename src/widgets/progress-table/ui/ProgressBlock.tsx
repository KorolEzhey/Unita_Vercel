import clsx from 'clsx';
import type { FC } from 'react';

import styles from './ProgressBlock.module.scss';

type ProgressBlockProps = {
  isSelected?: boolean;
  onClick?: () => void;
  value?: string;
};

export const ProgressBlock: FC<ProgressBlockProps> = ({
  isSelected = false,
  onClick,
  value = '1',
}) => {
  return (
    <div
      className={clsx(styles.progressBlock, isSelected && styles.selected)}
      onClick={onClick}
    >
      {value}
    </div>
  );
};
