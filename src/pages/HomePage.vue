<template>
  <ContentSection :title="title1">
    <template #actions>
      <TheUploadDrawer>
        <template #trigger>
          <Button size="sm"><IconPlus /></Button>
        </template>
      </TheUploadDrawer>
    </template>
    <template #content>
      <TheFiles :lessons="lessons" />
    </template>
  </ContentSection>
  <div class="flex flex-col gap-5">
    <ContentSection :title="title2" :tabs="tabs"></ContentSection>
  </div>
</template>

<script lang="ts" setup>
import { ContentSection } from '@/shared/ui/content-section';
import type { ITabsConfig } from '@/shared/ui/tabs';

import { Button } from '@/shared/ui/button';

import TheCharts from '@/components/TheCharts.vue';
import TheFiles from '@/components/TheFiles.vue';
import TheUploadDrawer from '@/components/TheUploadDrawer.vue';
import TheComparison from '@/components/TheComparison.vue';
import TheSummary from '@/components/TheSummary.vue';

import IconPlus from '~icons/heroicons/plus-16-solid';

import { computed, onMounted, ref, watch } from 'vue';

import { useLessonsStore } from '@/store/lessons';
import { useGraphsStore } from '@/store/graphs';

const lessonsStore = useLessonsStore();
const graphsStore = useGraphsStore();

const title1 = 'Данные';
const title2 = 'Дашборд';

const tabs: ITabsConfig[] = [
  {
    value: 'community',
    title: 'Инфографика',
    content: TheCharts,
  },
  {
    value: 'recommendations',
    title: 'Сводка',
    content: TheSummary,
  },
  {
    value: 'comparison',
    title: 'Сравненительный анализ',
    content: TheComparison,
  },
];

onMounted(() => {
  lessonsStore.fetchLessons();
});

const lessons = computed(() => lessonsStore.lessons);

watch(
  () => lessonsStore.selectedLesson,
  (selectedLesson) => {
    if (selectedLesson) {
      graphsStore.fetchGraphs(selectedLesson);
    }
  }
);
</script>

<style lang="scss" scoped></style>
