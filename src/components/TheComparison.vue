<template>
    <div class="comparison">
        <div class="comparison__graph">
            <div><canvas id="comparison" ref="comparison"></canvas></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const comparison = ref<HTMLCanvasElement | null>(null)
let chartMsgLength: Chart

onMounted(() => {
    if (comparison.value) {
        chartMsgLength = new Chart(comparison.value, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                    label: 'Dataset 1',
                    data: [5, 15, 20, 30, 40, 50, 60],
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    },
                    {
                    label: 'Dataset 2',
                    data: [10, 25, 35, 45, 55, 65, 70],
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.5)',
                    }
                ]
            },
        });
    }
});
</script>

<style scoped>

</style>