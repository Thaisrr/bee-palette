<script setup lang="ts">
import { BeeButton } from '@thaisrr/beedesign'
import SkeletonShape from './SkeletonShape.vue'
</script>

<template>
  <div class="nav" data-uses="bg border">
    <SkeletonShape tone="primary" width="28px" :height="28" :radius="8" />
    <SkeletonShape tone="text" width="70px" :height="10" />
    <span class="nav__spacer" />
    <SkeletonShape v-for="n in 3" :key="n" tone="muted" width="44px" />
    <BeeButton data-uses="primary">
      <SkeletonShape tone="onPrimary" width="32px" />
    </BeeButton>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 28px;
  border-block-end: var(--bd-border-width) solid var(--bd-color-border);
}
.nav__spacer {
  flex: 1;
}
</style>