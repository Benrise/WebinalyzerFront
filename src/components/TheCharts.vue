<template>
    <div class="graphs">
        <div v-show="!isFetching" class="graphs__container">
            <div class="graphs__item">
                <div><canvas id="msg_length" ref="msg_length"></canvas></div>
            </div>
            <div class="graphs__item">
                <div><canvas id="msg_count" ref="msg_count"></canvas></div>
            </div>
            <div class="graphs__item">
                <div><canvas id="msg_length_time" ref="msg_length_time"></canvas></div>
            </div>
            <div class="graphs__item">
                
            </div>
        </div>
        <div v-if="isFetching" class="graphs__container">
            <BaseSkeleton v-for="i in 4" :key="i" type="graphs"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto';
import { computed, onMounted, ref, watch } from 'vue';

import { useGraphsStore } from "@/store/graphs";
import { useLessonsStore } from "@/store/lessons";

import BaseSkeleton from '@/components/BaseSkeleton.vue'
import { isEmptyObject } from '@/shared/lib/utils';
import type { GraphsDto } from '@/api/dto';

const graphsStore = useGraphsStore()
const lessonsStore = useLessonsStore()

const isFetching = computed(() => graphsStore.isFetching)
const currentGraphs = computed(() => graphsStore.currentGraphs)

const msgLength = ref<any>(null);
const msgCount = ref<any>(null);
const msgLengthTime = ref<any>(null);

let ctxMsgCount: any;
let ctxMsgLength: any;
let ctxMsgLengthTime: any;

onMounted(() => {
    ctxMsgCount = document.getElementById('msg_count') as HTMLCanvasElement;
    ctxMsgLength = document.getElementById('msg_length') as HTMLCanvasElement;
    ctxMsgLengthTime = document.getElementById('msg_length_time') as HTMLCanvasElement;

    updateCharts(currentGraphs.value);
});

watch(() => currentGraphs.value, (newGraphs) => {
      if (newGraphs) {
        const normalCount = [msgLength.value, msgCount.value, msgLengthTime.value].filter(value => value !== null && !isEmptyObject(value)).length;
        graphsStore.setActiveGraphsCount(normalCount);
        updateCharts(newGraphs);
      }
});

let chartMsgLength: Chart
let chartMsgCount: Chart
let chartMsgLengthTime: Chart


const updateCharts = (graphs: GraphsDto) => {
    const integerSelectedLesson = parseInt(lessonsStore.selectedLesson);
    msgLength.value = graphs.msg_length ? graphs.msg_length[integerSelectedLesson] : null;
    msgCount.value = graphs.msg_count ? graphs.msg_count[integerSelectedLesson] : null;
    msgLengthTime.value = graphs.msg_length_time ? graphs.msg_length_time[integerSelectedLesson] : null;

    if (chartMsgLength) {
        chartMsgLength.destroy();
    }

    if (chartMsgCount) {
        chartMsgCount.destroy();
    }

    if (chartMsgLengthTime) {
        chartMsgLengthTime.destroy();
    }

    if (msgLength.value) {
        chartMsgLength = new Chart(ctxMsgLength, {
            type: 'scatter',
            data: {
            datasets: [{
                label: 'Длина сообщения',
                data: msgLength.value.hist.map((value: number, index: number) => ({ x: index, y: value })),
                backgroundColor: 'rgb(255,165,0)'
            }]
            },
            options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Распределение длины сообщений после распределения' },
            },
            scales: {
                x: { title: { display: true, text: 'Длина сообщения', padding: { top: 10, left: 0, right: 0, bottom: 0 } } },
                y: { title: { display: true, text: 'Частота', padding: { top: 0, left: 0, right: 0, bottom: 10 } } }
            }
            }
        });

    }

    if (msgCount.value) {
        chartMsgCount = new Chart(ctxMsgCount, {
            type: 'bar',
            data: {
            datasets: [{
                label: 'Длина сообщения в зависимости от длительности урока',
                data: msgCount.value,
                backgroundColor: 'rgb(160,32,240)'
            }]
            },
            options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Длина сообщений в зависимости от времени с начала урока' }
            },
            scales: {
                x: { title: { display: true, text: 'Минуты с начала урока', padding: { top: 10, left: 0, right: 0, bottom: 0 } } },
                y: { title: { display: true, text: 'Длина сообщения', padding: { top: 0, left: 0, right: 0, bottom: 10 } } }
            }
            }
        });
    }

    if (msgLengthTime.value) {
        chartMsgLengthTime = new Chart(ctxMsgLengthTime, {
            type: 'bubble',
            data: {
            datasets: [{
                data: msgLengthTime.value.minutes_since_start.map((x: number, index: number) => ({
                x: x,
                y: msgLengthTime.value.message_lengths[index],
                r: 5
                })),
                backgroundColor: 'rgb(255, 99, 132)'
            }]
            },
            options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Распределение длины сообщений после распределения' },
            },
            scales: {
                x: { title: { display: true, text: 'Минуты с начала урока', padding: { top: 10, left: 0, right: 0, bottom: 0 } } },
                y: { title: { display: true, text: 'Длина сообщения', padding: { top: 0, left: 0, right: 0, bottom: 10 } } }
            }
            }
        });
    }
};

</script>

<style scoped lang="scss">

.graphs {
    &__container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 20px;
    }

    &__item {
        width: 100%;
    }
}

</style>