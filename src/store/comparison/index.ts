import { defineStore } from 'pinia';
import { GraphsDto } from '@/api/dto';
import http from '@/api/http';

export const useComparisonStore = defineStore('comparison', {
  state: () => ({
    graphs: {} as Record<string, GraphsDto>,
  }),
  actions: {
    async setGraph(lesson: string) {
      const graph = (await http.graphs.get(lesson)).data;
      this.graphs[lesson] = graph;
    },
    removeGraph(lesson: string) {
      delete this.graphs[lesson];
    },
    resetGraphs() {
      this.graphs = {};
    },
    getGraph(lesson: string) {
      return this.graphs[lesson];
    }
  },
});