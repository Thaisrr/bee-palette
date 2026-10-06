<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <button class="icon-button" type="button" :aria-label="label" :title="label">
    <slot />
  </button>
</template>

<style scoped>
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-sizing: border-box;
  min-inline-size: 40px;
  block-size: 40px;
  padding: 0 10px;
  border: 0;
  border-radius: var(--bd-radius-full);
  background: transparent;
  color: var(--bd-color-text-muted);
  font: 700 12px var(--bd-font-main);
  letter-spacing: 0.04em;
  cursor: pointer;
  transition:
      background-color var(--bd-transition-fast),
      color var(--bd-transition-fast);
}
.icon-button:hover {
  background: var(--bd-color-primary-light);
  color: var(--bd-color-primary-dark);
}
.icon-button:focus-visible {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: var(--bd-focus-ring-offset);
}
</style>