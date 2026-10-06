<script setup lang="ts">
import LevelBadge from './LevelBadge.vue'

defineProps<{
  label: string
  ratioText: string
  badgeLabel: string
  tone: 'good' | 'warn' | 'bad'
  fg: string
  bg: string
}>()
</script>

<template>
  <div class="row">
    <span class="row__sample" aria-hidden="true" :style="{ color: fg, background: bg }">Aa</span>
    <span class="row__text">
      <span class="row__label">{{ label }}</span>
      <span class="row__ratio">{{ ratioText }}</span>
    </span>
    <LevelBadge :label="badgeLabel" :tone="tone" />
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: var(--bd-space-sm);
  min-block-size: var(--bd-control-height);
}
.row__sample {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  inline-size: 40px;
  block-size: 40px;
  border: var(--bd-border-width) solid var(--bd-color-border-strong);
  border-radius: var(--bd-radius-sm);
  font-weight: 700;
}
.row__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-inline-size: 0;
}
.row__label {
  font-size: 14px;
}
.row__ratio {
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--bd-color-text-muted);
}
</style>