import { makeAutoObservable, runInAction } from 'mobx';

import type { Grade } from '@/shared/lib/constants';

import { gradeService } from '../api/gradeService';

class GradeStore {
  grades: Grade[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGrades() {
    this.isLoading = true;
    this.error = null;

    try {
      const grades = await gradeService.getGrades();
      runInAction(() => {
        this.grades = grades;
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Ошибка при загрузке оценок';
        this.isLoading = false;
      });
    }
  }

  get sortedGrades() {
    return [...this.grades].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
}

export const gradeStore = new GradeStore();
