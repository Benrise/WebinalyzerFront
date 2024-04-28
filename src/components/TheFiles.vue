<template>
  <div class="relative w-full max-w-sm items-center">
    <Input type="text" placeholder="Найти файл" class="pl-10" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <IconSearch class="size-6 text-muted-foreground" />
    </span>
  </div>
  <div class="files">
    <div v-if="!isFetching" class="files__container">
      <Toggle
        :pressed="isSelected(lesson)"
        @click="selectLesson(lesson)"
        v-for="(lesson, index) in props.lessons"
        class="files__item"
        :key="index"
      >
        <IconFile />
        <div class="text-m font-normal">{{ lesson }}</div>
        <IconClock class="text-amber-500" />
      </Toggle>
    </div>
    <BaseSkeleton v-else type="lessons"></BaseSkeleton>
  </div>
</template>

<script lang="ts" setup>
import { Toggle } from '@/shared/ui/toggle';
import IconFile from '~icons/mdi/file';

import BaseSkeleton from '@/components/BaseSkeleton.vue';
import { Input } from '@/shared/ui/input';

import IconClock from '~icons/heroicons/clock';
import IconSearch from '~icons/radix-icons/magnifying-glass';

import { useLessonsStore } from '@/store/lessons';
import { computed } from 'vue';

const lessonsStore = useLessonsStore();
const isFetching = computed(() => lessonsStore.isFetching);

interface LessonsProps {
  lessons: string[];
}

const props = defineProps<LessonsProps>();

const selectLesson = (lesson: string) => {
  lessonsStore.setSelectedLesson(lesson);
};

const isSelected = (lesson: string) => {
  return lessonsStore.selectedLesson === lesson;
};
</script>

<style lang="scss" scoped>
.files {
  height: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-height: 780px;
    overflow-y: auto;
    padding-right: 10px;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px;
    height: 36px;
  }
}
</style>
