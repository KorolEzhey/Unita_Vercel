export type Lesson = {
  id: string;
  time: string;
  subject: string;
  teacher: string;
};

export const mockLessons: Lesson[] = [
  {
    id: 'math-1',
    time: '08:30-11:10',
    subject: 'Математика',
    teacher: 'Иванова И.И.',
  },
  {
    id: 'rus-1',
    time: '11:20-14:00',
    subject: 'Русский язык',
    teacher: 'Петров П.П.',
  },
  {
    id: 'phys-1',
    time: '14:10-16:50',
    subject: 'Физика',
    teacher: 'Сидоров С.С.',
  },
];
