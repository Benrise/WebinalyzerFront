import http from '@/api/http';
import { defineStore } from 'pinia';
import { useToast } from '@/shared/ui/toast/use-toast';
import type { LessonsDto } from '@/api/dto/lessons.dto';

const { toast } = useToast();

export const useLessonsStore = defineStore('lessons', {
  state: () => ({
    lessons: [] as LessonsDto[],
    isFetching: true as boolean,
    selectedLessonId: '' as string,
  }),
  actions: {
    async fetchLessons() {
      try {
        this.isFetching = true;
        const response = await http.lessonsStatuses.list();
        if (response.status === 200) {
          this.lessons = response.data.slice(0, 100);
          if (!this.selectedLessonId) {
            this.selectedLessonId = this.lessons[0].id;
          }
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
        throw error;
      } finally {
        this.isFetching = false;
      }
    },
    setSelectedLesson(lesson: string) {
      this.selectedLessonId = lesson;
    },
    async sendFile(file: File) {
      try {
        this.isFetching = true;
        const response = await http.load_file.sendFile(file);
        if (response.status === 200) {
          this.fetchLessons();
          toast({
            variant: 'default',
            title: 'Успех',
            description: `Файл ${file.name} успешно загружен`,
            class: 'bg-green-200 text-green-900',
          });
        }
      } catch (error) {
        console.error('Error sending file:', error);
        toast({
          variant: 'destructive',
          title: `Ошибка при загрузке файла`,
          description: `Файл ${file.name} не загружен. Проверьте правильность формата файла (.xlsx).`,
        });
      } finally {
        this.isFetching = false;
      }
    },
  },
});
