<template>
  <div class="comparison">
    <div class="comparison__graph">
      <div><canvas id="comparison" ref="comparison"></canvas></div>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Настройки</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="comparison__select">
          <div class="comparison__select-item">
            <div class="flex gap-2 items-center">
              <span>Файл сравнения №1</span>
            </div>
            <ComparisonCombobox @update:selected="setData($event)" />
          </div>
          <div class="comparison__select-item">
            <span>Файл сравнения №2</span>
            <ComparisonCombobox @update:selected="setData($event)" />
          </div>
          <div class="flex flex-row gap-2">
            <Button @click="compare" class="w-full" :disabled="graphs.length !== 2 || isFetching">
              <IconLoader class="animate-spin mr-2" v-if="isFetching" />
              Сравнить
            </Button>
            <Button @click="clearData" variant="outline">Обнулить график</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

import ComparisonCombobox from '@/components/ComparisonCombobox.vue';
import { useComparisonStore } from '@/store/comparison';

import IconLoader from '~icons/tabler/loader-2';

import { Button } from '@/shared/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

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

const compare = () => {
  if (graphs.value.length === 2 && !isFetching.value && graphs.value[0] && graphs.value[1]) {
    const sentimentCounts1 = {
      Нейтрален: 0,
      Интересно: 0,
      Неинтересно: 0,
      Негативен: 0,
      Позитивен: 0,
    };

    graphs.value[0].msg_emotions.forEach((item: any) => {
      switch (item.Sentiment) {
        case 'neutral':
          sentimentCounts1['Нейтрален']++;
          break;
        case 'speech':
          sentimentCounts1['Интересно']++;
          break;
        case 'skip':
          sentimentCounts1['Неинтересно']++;
          break;
        case 'negative':
          sentimentCounts1['Негативен']++;
          break;
        case 'positive':
          sentimentCounts1['Позитивен']++;
          break;
        default:
          break;
      }
    });

    const sentimentCounts2 = {
      Нейтрален: 0,
      Интересно: 0,
      Неинтересно: 0,
      Негативен: 0,
      Позитивен: 0,
    };

    graphs.value[1].msg_emotions.forEach((item: any) => {
      switch (item.Sentiment) {
        case 'neutral':
          sentimentCounts2['Нейтрален']++;
          break;
        case 'speech':
          sentimentCounts2['Интересно']++;
          break;
        case 'skip':
          sentimentCounts2['Неинтересно']++;
          break;
        case 'negative':
          sentimentCounts2['Негативен']++;
          break;
        case 'positive':
          sentimentCounts2['Позитивен']++;
          break;
        default:
          break;
      }
    });

    const toxicity1 = sentimentCounts1['Негативен'] || 0;
    const toxicity2 = sentimentCounts2['Негативен'] || 0;

    addData(chart, toxicity1, graphs.value[0].id, 0);
    addData(chart, toxicity2, graphs.value[1].id, 1);

    const count1 = graphs.value[0].msg_length[graphs.value[0].id].total_messages || 0;
    const count2 = graphs.value[0].msg_length[graphs.value[0].id].total_messages || 0;

    addData(chart, count1, graphs.value[0].id, 0);
    addData(chart, count2, graphs.value[1].id, 1);
  }
};

async function setData(newData: any) {
  console.log(newData);
  await comparisonStore.setGraph(newData);
}

function addData(chart: Chart, newData: any, label: string, index: number) {
  chart.data.datasets[index].data.push(newData);
  chart.data.datasets[index].label = label;
  chart.update();
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
            data: [66, 23, 0, 0, 25, 30, 60],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
          },
          {
            label: 'Файл №2 (пусто)',
            data: [30, 60, 0, 1, 50, 60, 45],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
          },
        ],
        labels: [
          'Кол-во сообщений',
          'Интерес',
          'Токсичность',
          'Технические неполадки',
          'Активность',
          'Удовлетворенность',
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
  gap: 24px;
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
