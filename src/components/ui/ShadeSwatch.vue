<script setup lang="ts">
import { BeeFlex } from '@thaisrr/beedesign'

defineProps<{ shades: { label: string; color: string }[] }>()
</script>

<template>
  <BeeFlex align="center" justify="flex-start" gap="sm">
    <div class="shades">
      <span
          v-for="shade in shades"
          :key="shade.label"
          class="shades__item"
          role="img"
          :aria-label="`${shade.label} : ${shade.color}`"
          :title="`${shade.label} : ${shade.color}`"
          :style="{ background: shade.color }"
      />
    </div>
    <small class="shades__caption">{{ shades.map((s) => s.label).join(', ') }}</small>
  </BeeFlex>
</template>

<style scoped>
.shades {
  display: flex;
  gap: var(--bd-space-sm);
}
.shades__item {
  box-sizing: border-box;
  inline-size: 30px;
  block-size: 30px;
  border: var(--bd-border-width) solid var(--bd-color-border-strong);
  border-radius: var(--bd-radius-sm);
}
.shades__caption {
  color: var(--bd-color-text-muted);
}
</style>