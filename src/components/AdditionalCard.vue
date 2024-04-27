<template>
    <div class="card">
        <div class="card__icon">
            <IconMessages class="card__icon-body" v-if="type === 'message'"/>
            <IconSmile class="card__icon-body" v-if="type === 'emotion' && emotion === 'smile'"/>
            <IconFrown class="card__icon-body" v-if="type === 'emotion' && emotion === 'frown'"/>
            <IconMeh class="card__icon-body" v-if="type === 'emotion' && emotion === 'meh'"/>
            <IconAngry class="card__icon-body" v-if="type === 'emotion' && emotion === 'angry'"/>
            <IconPending class="card__icon-body" v-if="type === 'emotion' && emotion === 'pending'"/>
            <IconChevronDoubleUp class="card__icon-body" v-if="type === 'satisfaction'"/>
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
import IconPending from '~icons/carbon/face-pending';
import IconChevronDoubleUp from '~icons/heroicons/chevron-double-up-solid';

export interface CardProps {
    type: 'message' | 'emotion' | 'satisfaction',
    emotion?: 'smile' | 'frown' | 'meh' | 'angry' | 'pending',
    value: string,
    description: string
    mainColor: string,
    secondaryColor: string,
    backgroundColor: string,
}

const props = defineProps<CardProps>()

</script>

<style scoped lang="scss">

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 48px;
    width: 100%;
    height: 100%;
    padding: 24px;
    border-radius: 24px;

    background-color: v-bind('props.backgroundColor');

    &__icon {
        width: 72px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: v-bind('props.secondaryColor');
        border-radius: 999px;
    }

    &__icon-body {
        width: 40px;
        height: 40px;
        color: v-bind('props.mainColor');
    }

    &__value {
        font-size: 32px;
        font-weight: bold;
        color: v-bind('props.mainColor');
    }
}

</style>