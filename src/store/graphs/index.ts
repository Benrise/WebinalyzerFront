import { GraphsDto } from '@/api/dto';
import http from '@/api/http';
import { defineStore } from 'pinia';

export const useGraphsStore = defineStore('graphs', {
  state: () => ({
    currentGraphs: {} as GraphsDto,
    isFetching: true as Boolean,
    activeGraphsCount: 0 as number,
    popularSentiment: '' as string,
  }),
  actions: {
    async fetchGraphs(lessonId: string) {
      try {
        this.isFetching = true;
        this.currentGraphs = (await http.graphs.get(lessonId)).data;
      } catch (error) {
        console.error('Error fetching graphs:', error);
      } finally {
        this.isFetching = false;
      }
    },
    async setPopularSentiment(sentiment: string) {
      this.popularSentiment = sentiment;
    },
  },
});
