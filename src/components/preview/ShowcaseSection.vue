<script setup lang="ts">
defineProps<{ title: string; wide?: boolean }>()
</script>

<template>
  <section class="section" :class="{ 'section--wide': wide }" data-uses="bg border">
    <h3 class="section__title">{{ title }}</h3>
    <slot />
  </section>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  min-inline-size: 0;
  padding: var(--bd-space-md);
  border: var(--bd-border-width) solid var(--bd-color-border);
  border-radius: var(--bd-radius-md);
  background: var(--bd-color-bg);
}
.section--wide {
  grid-column: 1 / -1;
}
.section__title {
  margin: 0;
  font: 700 11px var(--bd-font-main);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--bd-color-text-muted);
}
</style>