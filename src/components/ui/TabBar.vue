<script setup lang="ts" generic="T extends string">
defineProps<{
  label: string
  idPrefix: string
  tabs: { value: T; label: string }[]
}>()
const model = defineModel<T>({ required: true })

function onKeydown(event: KeyboardEvent, list: { value: T }[], index: number) {
  const count = list.length
  const next =
      event.key === 'ArrowRight' ? (index + 1) % count
          : event.key === 'ArrowLeft' ? (index - 1 + count) % count
              : event.key === 'Home' ? 0
                  : event.key === 'End' ? count - 1
                      : -1
  const target = list[next]
  if (!target) return
  event.preventDefault()
  model.value = target.value
  const buttons = (event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLElement>('[role="tab"]')
  buttons?.[next]?.focus()
}
</script>

<template>
  <div class="tabs" role="tablist" :aria-label="label">
    <button
        v-for="(tab, index) in tabs"
        :id="`${idPrefix}-tab-${tab.value}`"
        :key="tab.value"
        class="tabs__tab"
        type="button"
        role="tab"
        :aria-selected="model === tab.value"
        :aria-controls="`${idPrefix}-panel`"
        :tabindex="model === tab.value ? 0 : -1"
        @click="model = tab.value"
        @keydown="onKeydown($event, tabs, index)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: var(--bd-space-md);
}
.tabs__tab {
  min-block-size: var(--bd-control-height);
  padding: 0 4px;
  border: 0;
  border-block-end: 3px solid transparent;
  background: none;
  color: var(--bd-color-text-muted);
  font: 500 var(--bd-font-size-md) var(--bd-font-main);
  cursor: pointer;
}
.tabs__tab[aria-selected='true'] {
  border-block-end-color: var(--bd-color-primary);
  color: var(--bd-color-text);
  font-weight: 700;
}
.tabs__tab:hover {
  color: var(--bd-color-text);
}
.tabs__tab:focus-visible {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: -2px;
  border-radius: var(--bd-radius-sm);
}
</style>