import { GraphsDto } from '@/api/dto';
import http from '@/api/http';
import { defineStore } from 'pinia';

export const useGraphsStore = defineStore('graphs', {
  state: () => ({
    currentGraphs: {} as GraphsDto,
    isFetching: true as Boolean,
    activeGraphsCount: 0 as number,
  }),
  actions: {
    async fetchGraphs(lesson: string) {
        try {
            this.isFetching = true;
            this.currentGraphs = (await http.graphs.get(lesson)).data;
        } catch (error) {
            console.error('Error fetching graphs:', error);
        }
        finally {
            this.isFetching = false;
        }
        
    },
    async setActiveGraphsCount(count: number) {
      this.activeGraphsCount = count
    }
  },
});
