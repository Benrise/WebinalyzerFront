<template>
  <ContentSection :title="title1"></ContentSection>
  <div class="flex flex-col gap-5">
    <ContentSection :title="title2" :tabs="tabs"></ContentSection>
  </div>
</template>

<script lang="ts" setup>
import { ContentSection } from "@/shared/ui/content-section";
import type { ITabsConfig } from "@/shared/ui/tabs";

const title1 = "Активные вебинары";
const title2 = "Сводная информация";

const tabs: ITabsConfig[] = [
  {
    value: "community",
    title: "Дашборд",
    content: {},
  },
  {
    value: "recommendations",
    title: "Логи",
    content: {},
  },
];
</script>

<style lang="scss" scoped>
.features {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
</style>
