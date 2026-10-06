<script setup lang="ts">
import { BeeAlert } from '@thaisrr/beedesign'
import SkeletonShape from './SkeletonShape.vue'
</script>

<template>
  <div class="toast">
    <BeeAlert type="success" closable>
      <span class="toast__lines">
        <SkeletonShape tone="text" width="66%" />
        <SkeletonShape tone="muted" width="40%" />
      </span>
    </BeeAlert>
  </div>
</template>

<style scoped>
.toast {
  position: absolute;
  inset-inline-end: 20px;
  inset-block-end: 76px;
  inline-size: 250px;
  border-radius: var(--bd-radius-md);
  box-shadow: var(--bd-shadow-2);
}
.toast__lines {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-block-start: 4px;
}
</style>