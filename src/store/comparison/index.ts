import { defineStore } from 'pinia';
import { GraphsDto } from '@/api/dto';
import http from '@/api/http';
import type { LessonsDto } from '@/api/dto/lessons.dto';

export const useComparisonStore = defineStore('comparison', {
  state: () => ({
    graphs: [] as GraphsDto[],
    isFetching: false as Boolean,
  }),
  actions: {
    async setGraph(lesson: LessonsDto) {
      try {
        this.isFetching = true;
        const graph = (await http.graphs.get(lesson.id)).data;
        this.graphs.push(graph);
        return graph;
      } catch (error) {
        console.error('Error fetching graphs:', error);
      } finally {
        this.isFetching = false;
      }
    },
    removeGraph(lesson: LessonsDto) {
      const graphToRemove = this.graphs.find((g) => g?.id === lesson.id);
      if (graphToRemove) {
        const index = this.graphs.indexOf(graphToRemove);
        if (index !== -1) {
          this.graphs.splice(index, 1);
        }
      }
    },
    resetGraphs() {
      this.graphs = [];
    },
    getGraph(lesson: LessonsDto) {
      return this.graphs.find((g) => g?.id === lesson.id);
    },
  },
});
