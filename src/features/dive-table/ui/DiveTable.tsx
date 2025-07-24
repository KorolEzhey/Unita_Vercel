import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import {
  type DiveTableData,
  type DiveTableRow,
  GRADE_THRESHOLDS,
} from '@/shared/lib/constants';

import styles from './DiveTable.module.scss';

const getGradeClass = (grade: number) => {
  if (grade < GRADE_THRESHOLDS.UNSATISFACTORY) return styles['grade-red'];
  if (grade < GRADE_THRESHOLDS.SATISFACTORY) return styles['grade-orange'];
  if (grade < GRADE_THRESHOLDS.GOOD) return styles['grade-yellow'];
  return styles['grade-green'];
};

const columnHelper = createColumnHelper<DiveTableRow>();

type DiveTableProps = {
  data: DiveTableData;
};

export const DiveTable: FC<DiveTableProps> = ({ data }) => {
  const t = useTranslations('dive_table');

  const columns = [
    columnHelper.accessor('week', {
      header: t('week'),
    }),
    columnHelper.accessor('subject', {
      header: t('subject'),
    }),
    columnHelper.accessor('mark', {
      header: t('mark'),
      cell: (info) => {
        const value = info.getValue();
        return <span className={clsx(styles.mark)}>{value}</span>;
      },
    }),
    columnHelper.accessor('actions', {
      header: '',
    }),
  ];

  // Вычисление среднего балла
  const calculateAverageGrade = () => {
    const grades = data
      .map((row) => row.mark)
      .filter((grade) => typeof grade === 'number');
    if (grades.length === 0) return 0;
    return (
      Math.round((grades.reduce((a, b) => a + b, 0) / grades.length) * 10) / 10
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const averageGrade = calculateAverageGrade();

  return (
    <table className={styles.table}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className={styles.header}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className={styles.row}>
            {row.getVisibleCells().map((cell) => {
              const isMark = cell.column.id === 'mark';
              const className = isMark
                ? getGradeClass(cell.getValue() as number)
                : undefined;
              return (
                <td key={cell.id} className={className}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))}
        <tr className={clsx(styles.row, styles['average-row'])}>
          <td>{t('average')}</td>
          <td />
          <td className={getGradeClass(averageGrade)}>{averageGrade}</td>
          <td />
        </tr>
      </tbody>
    </table>
  );
};
