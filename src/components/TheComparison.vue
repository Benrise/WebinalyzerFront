<template>
  <div class="comparison">
    <div class="comparison__graph">
      <div><canvas id="comparison" ref="comparison"></canvas></div>
    </div>
    <div class="comparison__select">
      <div class="comparison__select-item">
        <div class="flex gap-2 items-center">
          <span>Файл сравнения №1</span>
        </div>
        <ComparisonCombobox @update:selected="addData(chart, $event)" />
      </div>
      <div class="comparison__select-item">
        <span>Файл сравнения №2</span>
        <ComparisonCombobox @update:selected="addData(chart, $event)" />
      </div>
      <div class="flex flex-row gap-2">
        <Button class="w-full" :disabled="graphs.length !== 2 || isFetching">
          <IconLoader class="animate-spin mr-2" v-if="isFetching" />
          Сравнить
        </Button>
        <Button @click="clearData" variant="outline">Обнулить график</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

import ComparisonCombobox from '@/components/ComparisonCombobox.vue';
import { useComparisonStore } from '@/store/comparison';

import IconLoader from '~icons/tabler/loader-2';

import { Button } from '@/shared/ui/button';

const ctx = ref<HTMLCanvasElement | null>(null);
let chart: Chart;

const comparisonStore = useComparisonStore();

const graphs = computed(() => comparisonStore.graphs);

const isFetching = computed(() => comparisonStore.isFetching);
function removeData(chart: Chart) {
  if (chart) {
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }
}

const clearData = () => {
  removeData(chart);
};
function addData(chart: Chart, newData: any) {
  const data = comparisonStore.setGraph(newData);

  console.log(data);
  //   chart.data.datasets.forEach((dataset) => {
  //     dataset.data.push(newData);
  //   });
  //   chart.update();
  return;
}

onMounted(() => {
  ctx.value = document.getElementById('comparison') as HTMLCanvasElement;

  if (ctx.value) {
    chart = new Chart(ctx.value, {
      type: 'radar',
      data: {
        datasets: [
          {
            label: 'Файл №1 (пусто)',
            data: [],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
          },
          {
            label: 'Файл №2 (пусто)',
            data: [],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
          },
        ],
        labels: [
          'Токсичность',
          'Технические неполадки',
          'Активность',
          'Удовлетворенность',
          'Кол-во сообщений',
          'Интерес',
          'Длительность урока',
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Сравнительный анализ',
          },
        },
        scales: {
          r: {
            pointLabels: {
              font: {
                size: 16,
              },
            },
          },
        },
      },
    });
  }
});
</script>

<style scoped lang="scss">
.comparison {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &__graph {
    width: 60%;
  }
  &__select {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  &__select-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: small;
  }
}
</style>
