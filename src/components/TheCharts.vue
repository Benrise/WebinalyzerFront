<template>
  <div class="graphs">
    <div v-show="!isFetching" class="graphs__container">
      <div class="graphs__item">
        <div><canvas id="msg_length" ref="msgLength"></canvas></div>
      </div>
      <div class="graphs__item">
        <div><canvas id="msg_emotions" ref="msgEmotions"></canvas></div>
      </div>
      <div class="graphs__item">
        <div><canvas id="msg_length_time" ref="msgLengthTime"></canvas></div>
      </div>
      <div class="graphs__item">
        <div class="graphs__additionals">
          <AdditionalCard
            v-for="(card, index) in cardsConfig"
            :key="index"
            :type="card.type"
            :value="card.value"
            :description="card.description"
            :backgroundColor="card.backgroundColor"
            :secondaryColor="card.secondaryColor"
            :mainColor="card.mainColor"
            :emotion="card.emotion"
          />
        </div>
      </div>
    </div>
    <div v-if="isFetching" class="graphs__container">
      <BaseSkeleton v-for="i in 4" :key="i" type="graphs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto';
import { computed, onMounted, ref, watch } from 'vue';

import { useGraphsStore } from '@/store/graphs';
import { useLessonsStore } from '@/store/lessons';

import BaseSkeleton from '@/components/BaseSkeleton.vue';
import AdditionalCard from '@/components/AdditionalCard.vue';
import type { CardProps } from '@/components/AdditionalCard.vue';

import type { GraphsDto } from '@/api/dto';

const graphsStore = useGraphsStore();
const lessonsStore = useLessonsStore();

const isFetching = computed(() => graphsStore.isFetching);
const currentGraphs = computed(() => graphsStore.currentGraphs);

const integerSelectedLesson = computed(() => parseInt(lessonsStore.selectedLesson));

const getTotalMessages = (graphs: GraphsDto) => {
  if (graphs && graphs.msg_length) {
    return graphs.msg_length[integerSelectedLesson.value].total_messages.toString();
  }
  return '?';
};

const msgLength = ref<any>(null);
const msgCount = ref<any>(null);
const msgLengthTime = ref<any>(null);
const msgEmotions = ref<any>(null);

let ctxMsgEmotions: any;
let ctxMsgLength: any;
let ctxMsgLengthTime: any;

let chartMsgLength: Chart;
let chartMsgEmotions: Chart;
let chartMsgLengthTime: Chart;

onMounted(() => {
  ctxMsgEmotions = document.getElementById('msg_emotions') as HTMLCanvasElement;
  ctxMsgLength = document.getElementById('msg_length') as HTMLCanvasElement;
  ctxMsgLengthTime = document.getElementById('msg_length_time') as HTMLCanvasElement;

  updateCharts(currentGraphs.value);
  updateCardsConfig(currentGraphs.value);
});

watch(
  () => currentGraphs.value,
  (newGraphs) => {
    if (newGraphs) {
      updateCharts(newGraphs);
      updateCardsConfig(newGraphs);
    }
  }
);

const updateCharts = async (graphs: GraphsDto) => {
  msgLength.value = graphs.msg_length ? graphs.msg_length[integerSelectedLesson.value] : null;
  msgEmotions.value = graphs.msg_emotions ? graphs.msg_emotions : null;
  msgLengthTime.value = graphs.msg_length_time
    ? graphs.msg_length_time[integerSelectedLesson.value]
    : null;
  msgCount.value = graphs.msg_count ? graphs.msg_count[integerSelectedLesson.value] : null;

  if (chartMsgLength) {
    chartMsgLength.destroy();
  }

  if (chartMsgEmotions) {
    chartMsgEmotions.destroy();
  }

  if (chartMsgLengthTime) {
    chartMsgLengthTime.destroy();
  }

  if (msgLength.value) {
    chartMsgLength = new Chart(ctxMsgLength, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Длина сообщения',
            data: msgLength.value.hist.map((value: number, index: number) => ({
              x: index,
              y: value,
            })),
            backgroundColor: 'rgb(255,165,0)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Распределение длины сообщений после распределения' },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Длина сообщения',
              padding: { top: 10, left: 0, right: 0, bottom: 0 },
            },
          },
          y: {
            title: {
              display: true,
              text: 'Частота',
              padding: { top: 0, left: 0, right: 0, bottom: 10 },
            },
          },
        },
      },
    });
  }

  if (msgEmotions.value) {
    const sentimentCounts = {
      Нейтрален: 0,
      Интересно: 0,
      Неинтересно: 0,
      Негативен: 0,
      Позитивен: 0,
    };

    msgEmotions.value.forEach((item: any) => {
      switch (item.Sentiment) {
        case 'neutral':
          sentimentCounts['Нейтрален']++;
          break;
        case 'speech':
          sentimentCounts['Интересно']++;
          break;
        case 'skip':
          sentimentCounts['Неинтересно']++;
          break;
        case 'negative':
          sentimentCounts['Негативен']++;
          break;
        case 'positive':
          sentimentCounts['Позитивен']++;
          break;
        default:
          break;
      }
    });

    const data = Object.values(sentimentCounts);

    const maxSentiment = Object.entries(sentimentCounts).reduce(
      (max: [string, number], curr: [string, number]) => {
        return curr[1] > max[1] ? curr : max;
      },
      ['', 0]
    )[0];

    graphsStore.setPopularSentiment(maxSentiment);

    chartMsgEmotions = new Chart(ctxMsgEmotions, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'My First Dataset',
            data: data,
            backgroundColor: [
              'rgba(255, 205, 86, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(75, 192, 192, 0.5)',
            ],
            borderWidth: 1,
          },
        ],
        labels: Object.keys(sentimentCounts),
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Распределение сентиментов' },
        },
      },
    });
  }

  if (msgLengthTime.value) {
    chartMsgLengthTime = new Chart(ctxMsgLengthTime, {
      type: 'bubble',
      data: {
        datasets: [
          {
            data: msgLengthTime.value.minutes_since_start.map((x: number, index: number) => ({
              x: x,
              y: msgLengthTime.value.message_lengths[index],
              r: 5,
            })),
            backgroundColor: 'rgb(255, 99, 132)',
            order: 1,
          },
          {
            label: 'Длина сообщения в зависимости от длительности урока',
            data: msgCount.value,
            backgroundColor: 'rgba(160,32,240, 0.5)',
            type: 'bar',
            order: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Распределение длины сообщений после распределения' },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Минуты с начала урока',
              padding: { top: 10, left: 0, right: 0, bottom: 0 },
            },
          },
          y: {
            title: {
              display: true,
              text: 'Длина сообщения',
              padding: { top: 0, left: 0, right: 0, bottom: 10 },
            },
            position: 'left',
          },
          y2: {
            title: {
              display: true,
              text: 'Количество сообщений',
              padding: { top: 0, left: 0, right: 0, bottom: 10 },
            },
            position: 'right',
          },
        },
      },
    });
  }
};

const cardsConfig = ref<CardProps[]>([]);

const updateCardsConfig = (graphs: GraphsDto) => {
  const totalMessages = getTotalMessages(graphs);
  const popularSentiment = computed(() => graphsStore.popularSentiment);

  const updatedCardsConfig: CardProps[] = [
    {
      type: 'message',
      value: totalMessages,
      description: 'cообщений всего',
      backgroundColor: '#ECEDFF',
      mainColor: '#004DFF',
      secondaryColor: '#D2D4FF',
    },
    {
      type: 'emotion',
      value: popularSentiment.value,
      description: 'основной сентимент',
      emotion: popularSentiment.value,
    },
    {
      type: 'satisfaction',
      value: '100%',
      description: 'удовлетворенность',
      backgroundColor: '#FBE3FF',
      mainColor: '#FF00E6',
      secondaryColor: '#FED2FF',
    },
  ];
  cardsConfig.value = updatedCardsConfig;
};
</script>

<style scoped lang="scss">
.graphs {
  &__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 24px;
    align-items: center;
    justify-items: center;
    height: 100%;
  }

  &__item {
    width: 100%;
    position: relative;
  }

  &__additionals {
    display: flex;
    flex-direction: row;
    gap: 16px;
    height: 100%;
  }
}
</style>
