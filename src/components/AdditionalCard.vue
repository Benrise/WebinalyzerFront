<template>
  <div class="card" :class="type === 'emotion' ? getClassByEmotion(emotion) : ''">
    <div class="card__icon">
      <IconMessages class="card__icon-body" v-if="type === 'message'" />
      <IconSmile class="card__icon-body" v-if="type === 'emotion' && emotion === 'Позитивен'" />
      <IconFrown class="card__icon-body" v-if="type === 'emotion' && emotion === 'Неинтересно'" />
      <IconMeh class="card__icon-body" v-if="type === 'emotion' && emotion === 'Нейтрален'" />
      <IconAngry class="card__icon-body" v-if="type === 'emotion' && emotion === 'Негативен'" />
      <IconPending class="card__icon-body" v-if="type === 'emotion' && emotion === 'Интересно'" />
      <IconChevronDoubleUp class="card__icon-body" v-if="type === 'satisfaction'" />
    </div>
    <div class="card__value">
      {{ props.value }}
    </div>
    <div class="card__description">
      {{ props.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import IconMessages from '~icons/heroicons/chat-bubble-left-right';
import IconSmile from '~icons/heroicons/face-smile';
import IconFrown from '~icons/heroicons/face-frown';
import IconMeh from '~icons/fa6-regular/face-meh';
import IconAngry from '~icons/fa6-regular/face-angry';
import IconChevronDoubleUp from '~icons/heroicons/chevron-double-up-solid';
import IconPending from '~icons/carbon/face-pending';

export type Emotion = 'Позитивен' | 'Неинтересно' | 'Нейтрален' | 'Негативен' | 'Интересно';

export interface CardProps {
  type: 'message' | 'emotion' | 'satisfaction';
  emotion?: Emotion;
  value: string;
  description: string;
  mainColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
}

const props = defineProps<CardProps>();

const getClassByEmotion = (emotion: Emotion | undefined) => {
  switch (emotion) {
    case 'Позитивен':
      return 'positive';
    case 'Негативен':
      return 'negative';
    case 'Неинтересно':
      return 'deault';
    case 'Нейтрален':
      return 'neutral';
    case 'Интересно':
      return 'primary';
    default:
      return 'default';
  }
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  height: 100%;
  padding: 24px;
  border-radius: 24px;

  background-color: v-bind('props.backgroundColor');

  &__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: v-bind('props.secondaryColor');
    border-radius: 999px;
  }

  &__icon-body {
    width: 24px;
    height: 24px;
    color: v-bind('props.mainColor');
  }

  &__value {
    font-size: 24px;
    font-weight: bold;
    color: v-bind('props.mainColor');
  }

  &__description {
    font-size: 16px;
  }
}

.positive {
  background-color: #eeffe6;
  .card__icon {
    background-color: #d0ffc0;
  }
  .card__icon-body {
    color: #008000;
  }
  .card__value {
    color: #008000;
  }
}

.negative {
  background-color: #ffe1e1;
  .card__icon {
    background-color: #ffcfcf;
  }
  .card__icon-body {
    background-color: #ff0000;
  }
  .card__value {
    color: #ff0000;
  }
}

.default {
  background-color: #f3f3f3;
  .card__icon {
    background-color: #e7e7e7;
  }
  .card__icon-body {
    color: #1d1d1d;
  }
  .card__value {
    color: #1d1d1d;
  }
}

.neutral {
  background-color: #fff4ce !important;
  .card__icon {
    background-color: #ffe0a4 !important;
  }
  .card__icon-body {
    color: #ff842c !important;
  }
  .card__value {
    color: #ff842c !important;
  }
}

.primary {
  background-color: #c8ebff;
  .card__icon {
    background-color: #9dd0ff;
  }
  .card__icon-body {
    color: #0000ff;
  }
  .card__value {
    color: #0000ff;
  }
}
</style>
