<script setup lang="ts">
import SkeletonShape from './SkeletonShape.vue'
</script>

<template>
  <div class="footer" data-uses="surface border">
    <SkeletonShape v-for="n in 3" :key="n" tone="muted" width="48px" />
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  box-sizing: border-box;
  block-size: 56px;
  border-block-start: var(--bd-border-width) solid var(--bd-color-border);
  background: var(--bd-color-surface);
}
</style>