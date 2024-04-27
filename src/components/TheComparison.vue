<template>
    <div class="comparison">
        <div class="comparison__select-file">
            <span>Файл сравнения №1</span>
            <ComparisonCombobox/>
        </div>
        <div class="comparison__graph">
            <div><canvas id="comparison" ref="comparison"></canvas></div>
        </div>
        <div class="comparison__select-file">
            <span>Файл сравнения №2</span>
            <ComparisonCombobox/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

import ComparisonCombobox from '@/components/ComparisonCombobox.vue'
import { useComparisonStore } from "@/store/comparison";

const ctx = ref<HTMLCanvasElement | null>(null)
let chart: Chart

const comparisonStore = useComparisonStore()

const graphs = computed(() => comparisonStore.graphs)

onMounted(() => {

    ctx.value = document.getElementById('comparison') as HTMLCanvasElement;

    if (ctx.value) {
        chart = new Chart(ctx.value, {
            type: 'radar',
            data: {
                datasets: [
                    {
                    label: 'Файл 307751',
                    data: [5, 15, 20, 30, 40, 50, 60],
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    },
                    {
                    label: 'Файл 307752',
                    data: [10, 25, 35, 45, 55, 65, 70],
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.5)',
                    }
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
                    text: 'Сравнительный анализ'
                }
                }
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
    &__select-file {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: small;
    }
}


</style>