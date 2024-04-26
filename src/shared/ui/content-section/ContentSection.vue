<template>
  <div class="content-section">
    <div class="content-section__tabs">
      <Tabs v-if="tabs" :default-value="defaultTab" class="flex flex-col w-full gap-6">
        <div class="content-section__tabs-header">
          <div class="text-2xl font-medium">{{ title }}</div>
          <TabsList>
            <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
              {{ tab.title }}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value">
          <component :key="tab.value" :is="tab.content" />
          <slot name="content" />
        </TabsContent>
      </Tabs>
      <div v-if="!tabs && title" class="flex flex-col w-full gap-6">
        <div class="content-section__tabs-header">
          <div class="text-2xl font-medium">{{ title }}</div>
          <slot name="actions" />
        </div>
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger, type ITabsConfig } from "@/shared/ui/tabs";

import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  tabs: {
    type: Array as () => ITabsConfig[],
    default: null
  },
})

const defaultTab = props.tabs && props.tabs[0].value;
</script>

<style lang="scss" scoped>
.content-section {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 24px;
  padding: 24px;
  height: 100%;

  &__actions-header,
  &__tabs-header {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  }
}
</style>
