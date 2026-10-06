<script setup lang="ts">
defineProps<{ label: string; tone: 'good' | 'warn' | 'bad' }>()
</script>

<template>
  <span class="badge" :class="`badge--${tone}`">{{ label }}</span>
</template>

<style scoped>
.badge {
  flex: none;
  padding: 3px 10px;
  border: var(--bd-border-width) solid currentColor;
  border-radius: var(--bd-radius-full);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}
.badge--good {
  color: var(--bd-color-success);
  background: color-mix(in srgb, var(--bd-color-success) 12%, var(--bd-color-bg));
}
.badge--warn {
  color: var(--bd-color-warning);
  background: color-mix(in srgb, var(--bd-color-warning) 12%, var(--bd-color-bg));
}
.badge--bad {
  color: var(--bd-color-error);
  background: color-mix(in srgb, var(--bd-color-error) 12%, var(--bd-color-bg));
}
</style>