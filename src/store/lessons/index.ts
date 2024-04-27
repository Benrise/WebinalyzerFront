import { LessonsDto } from '@/api/dto';
import http from '@/api/http';
import { defineStore } from 'pinia';

export const useLessonsStore = defineStore('lesson', {
  state: () => ({
    files: [] as LessonsDto[],
  }),
  actions: {
    async fetchLessons() {
      try {
        const files = await http.lessons.get();
        console.log(files)
        this.files = files;
      } catch (error) {
        console.error('Error fetching lessons:', error);
        throw error;
      }
    },
  },
});
