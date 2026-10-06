<script setup lang="ts">
defineProps<{ title: string }>()
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <details class="disclosure" :open="open" @toggle="open = ($event.target as HTMLDetailsElement).open">
    <summary class="disclosure__summary">
      <span class="disclosure__title">{{ title }}</span>
      <svg class="disclosure__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
    <div class="disclosure__body"><slot /></div>
  </details>
</template>

<style scoped>
.disclosure {
  border-block-start: var(--bd-border-width) solid var(--bd-color-border);
  padding-block-start: var(--bd-space-md);
}
.disclosure__summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-block-size: var(--bd-control-height);
  list-style: none;
  cursor: pointer;
}
.disclosure__summary::-webkit-details-marker {
  display: none;
}
.disclosure__summary:focus-visible {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: var(--bd-focus-ring-offset);
  border-radius: var(--bd-radius-sm);
}
.disclosure__title {
  font-family: var(--bd-font-title);
  font-size: 1.0625rem;
  font-weight: 700;
}
.disclosure__chevron {
  transition: transform var(--bd-transition-fast);
}
.disclosure[open] .disclosure__chevron {
  transform: rotate(180deg);
}
.disclosure__body {
  padding-block: var(--bd-space-md);
}
</style>