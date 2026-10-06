<script setup lang="ts">
import SettingsSection from '../ui/SettingSection.vue'
import SurfaceBar from '../ui/SurfaceBar.vue'

defineProps<{
  title: string
  barLabel: string
  note: string
  items: { id: string; label: string; color: string; percent: number; percentText: string }[]
  groups: { id: string; label: string; percentText: string }[]
}>()

const emit = defineEmits<{ highlight: [id: string | null] }>()
</script>

<template>
  <SettingsSection :title="title" @highlight="onHighlight">
    <SurfaceBar :label="barLabel" :segments="items" />
    <ul class="list">
      <li
          v-for="item in items"
          :key="item.id"
          class="list__row"
          tabindex="0"
          @mouseenter="emit('highlight', item.id)"
          @mouseleave="emit('highlight', null)"
          @focus="emit('highlight', item.id)"
          @blur="emit('highlight', null)"
      >
        <span class="list__dot" aria-hidden="true" :style="{ background: item.color }" />
        <span class="list__label">{{ item.label }}</span>
        <span class="list__value">{{ item.percentText }}</span>
      </li>
    </ul>
    <p class="groups">
      <span v-for="g in groups" :key="g.id"><strong>{{ g.percentText }}</strong> {{ g.label }}</span>
    </p>
    <small class="note">{{ note }}</small>
  </SettingsSection>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.list__row {
  display: grid;
  grid-template-columns: 14px 1fr auto;
  align-items: center;
  column-gap: var(--bd-space-sm);
  font-size: 14px;
}
.list__dot {
  box-sizing: border-box;
  inline-size: 14px;
  block-size: 14px;
  border: var(--bd-border-width) solid var(--bd-color-border-strong);
  border-radius: var(--bd-radius-full);
}
.list__value {
  font-variant-numeric: tabular-nums;
}

.list__row:focus-visible {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: 2px;
  border-radius: var(--bd-radius-sm);
}

.groups {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bd-space-sm) var(--bd-space-md);
  margin: 0;
  font-size: 13px;
}
.note {
  font-size: 12px;
  color: var(--bd-color-text-muted);
}
</style>