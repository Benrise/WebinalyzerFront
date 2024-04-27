<template>
    <div class="files">
      <div class="files__container">
        <Toggle v-for="file in props.files" class="files__item" :key="file.id">
          <IconFile/>
          <div class="text-lg font-normal">{{ file.id }}</div>
        </Toggle>
      </div>
      
    </div>
</template>

<script lang="ts" setup>
import { Toggle } from '@/shared/ui/toggle'
import IconFile from '~icons/mdi/file';

interface File {
  id: string
}

interface FilesProps {
  files: File[]
}

const props = defineProps<FilesProps>()
</script>

<style lang="scss" scoped>

.files {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>