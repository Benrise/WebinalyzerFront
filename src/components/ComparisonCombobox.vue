<template>
  <TagsInput class="px-0 gap-0 w-80" :model-value="modelValue">
    <div class="flex gap-2 flex-wrap items-center px-3">
      <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>
    </div>
    <ComboboxRoot
      v-model="modelValue"
      v-model:open="open"
      v-model:searchTerm="searchTerm"
      class="w-full"
    >
      <ComboboxAnchor v-if="modelValue.length === 0" as-child>
        <ComboboxInput placeholder="Найти и выбрать файл" as-child>
          <TagsInputInput
            class="w-full px-3"
            :class="modelValue.length > 0 ? 'mt-2' : ''"
            @keydown.enter.prevent
          />
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <CommandList
          position="popper"
          class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <CommandEmpty />
          <CommandGroup>
            <CommandItem
              v-for="(lesson, index) in filteredLessons"
              :key="index"
              :value="lesson"
              @select.prevent="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    searchTerm = '';
                    modelValue.push(ev.detail.value);
                    $emit('update:selected', modelValue);
                  }

                  if (filteredLessons.length === 0 || modelValue.length === 1) {
                    open = false;
                  }
                }
              "
            >
              {{ lesson }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </ComboboxPortal>
    </ComboboxRoot>
  </TagsInput>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ComboboxAnchor, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue';
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/shared/ui/command';
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/shared/ui/tags-input';

import { useLessonsStore } from '@/store/lessons';

const lessonsStore = useLessonsStore();

const lessons = computed(() => lessonsStore.lessons.map((i) => i.id));

const modelValue = ref<string[]>([]);
const open = ref(false);
const searchTerm = ref('');

const filteredLessons = computed(() =>
  lessons.value.filter((i: string) => !modelValue.value.includes(i))
);
</script>
