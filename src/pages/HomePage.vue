<template>
  <ContentSection :title="title1">
    <template #actions>
      <TheUploadDrawer>
        <template #trigger>
          <Button size="sm"><IconPlus/></Button>
        </template>
      </TheUploadDrawer>
    </template>
    <template #content>
      <div class="relative w-full max-w-sm items-center">
        <Input type="text" placeholder="Найти файл" class="pl-10"/>
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <IconSearch class="size-6 text-muted-foreground"/>
        </span>
      </div>
      <TheFiles :files="files"/>
    </template>
  </ContentSection>
  <div class="flex flex-col gap-5">
    <ContentSection :title="title2" :tabs="tabs"></ContentSection>
  </div>
</template>

<script lang="ts" setup>
import { ContentSection } from "@/shared/ui/content-section";
import type { ITabsConfig } from "@/shared/ui/tabs";

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

import TheCharts from '@/components/TheCharts.vue'
import TheFiles from '@/components/TheFiles.vue'
import TheUploadDrawer from "@/components/TheUploadDrawer.vue";

import IconPlus from '~icons/heroicons/plus-16-solid';
import IconSearch from '~icons/radix-icons/magnifying-glass';
import { onMounted } from "vue";
import { useLessonsStore } from "@/store/lessons";

const title1 = "Данные";
const title2 = "Сводная информация";

const tabs: ITabsConfig[] = [
  {
    value: "community",
    title: "Дашборд",
    content: TheCharts,
  },
  {
    value: "recommendations",
    title: "Логи",
    content: {},
  },
];

const lessonStore = useLessonsStore();

onMounted(() => {
  lessonStore.fetchLessons();
});

const files = lessonStore.files


</script>

<style lang="scss" scoped>
.features {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
</style>
