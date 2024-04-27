import http from '@/api/http';
import { defineStore } from 'pinia';

export const useLessonsStore = defineStore('lesson', {
  state: () => ({
    lessons: [] as string[],
    isFetching: false,
    selectedLesson: '' as string,
  }),
  actions: {
    async fetchLessons() {
      try {
        this.isFetching = true;
        const lessons = await http.lessons.get();
        this.lessons = lessons.data.slice(0, 100);
        if (!this.selectedLesson) {
          this.selectedLesson = this.lessons[0];
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
        throw error;
      }
      finally {
        this.isFetching = false;
      }
    },
    setSelectedLesson(lesson: string) {
      this.selectedLesson = lesson
    }
  },
});
