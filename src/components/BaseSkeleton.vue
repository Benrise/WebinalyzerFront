<template>
    <div class="skeleton">
        <div v-if="props.type === 'lessons'" class="skeleton__lessons">
            <div v-for="i in 8"  class="skeleton__lessons-items" :key="i">
                <div class="skeleton__lessons-item">
                  <Skeleton class="h-4 w-[250px]" />
                  <Skeleton class="h-4 w-[200px]" />
                </div>
              </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/shared/ui/skeleton'

interface SkeletonProps {
    type: 'lessons' | 'charts',
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