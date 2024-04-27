<template>
    <div class="skeleton">
        <div v-if="props.type === 'lessons'" class="skeleton__lessons">
            <div v-for="i in 8"  class="skeleton__lessons-items" :key="i">
                <div class="skeleton__lessons-item">
                  <Skeleton class="h-4 w-full" />
                  <Skeleton class="h-4 max-w-[200px]" />
                </div>
              </div>
        </div>

        <div v-if="props.type === 'graphs'" class="skeleton__graphs">
            <div class="skeleton__graphs-loader">
                <IconLoader class="w-16 h-16 animate-spin text-gray-400"></IconLoader>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/shared/ui/skeleton'
import IconLoader from '~icons/tabler/loader-2';

interface SkeletonProps {
    type: 'lessons' | 'graphs',
}

const props = defineProps<SkeletonProps>()
</script>

<style lang="scss" scoped>

.skeleton {
  &__lessons {
      display: flex;
      flex-direction: column;
      gap: 24px;
  }

  &__graphs {
    width: 100%;
    height: 400px;
  }

  &__graphs-loader {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
  }

  &__lessons-items {
      height: 100%;
  }

  &__lessons-item {
      display: flex;
      flex-direction: column;
      gap: 12px;
  }
}
</style>