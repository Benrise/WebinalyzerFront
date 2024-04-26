<template>
    <div class="default-layout">
      <div class="default-layout__content">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style lang="scss">
  .default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    gap: 40px;
  
    &__content {
      margin: 40px 80px 40px;
      display: grid;
      height: 100%;
      grid-template-columns: 20% 80%;
      gap: 20px;
    }
  }
  </style>
  