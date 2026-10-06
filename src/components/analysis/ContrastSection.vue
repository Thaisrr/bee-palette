<script setup lang="ts">
import type { TextSize } from '../../lib/contrast'
import SettingsSection from '../ui/SettingSection.vue'
import SegmentedControl from '../ui/SegmentedControl.vue'
import ContrastRow from '../ui/ContrastRow.vue'

interface Row {
  id: string
  label: string
  ratioText: string
  badgeLabel: string
  tone: 'good' | 'warn' | 'bad'
  fg: string
  bg: string
}

defineProps<{
  title: string
  sizeLegend: string
  sizeOptions: { value: TextSize; label: string }[]
  hint: string
  rows: Row[]
  uiTitle: string
  uiRows: Row[]
}>()

const size = defineModel<TextSize>({ required: true })
</script>

<template>
  <SettingsSection :title="title">
    <SegmentedControl v-model="size" :legend="sizeLegend" :options="sizeOptions" />
    <small class="hint">{{ hint }}</small>
    <ContrastRow
        v-for="row in rows"
        :key="row.id"
        :label="row.label"
        :ratio-text="row.ratioText"
        :badge-label="row.badgeLabel"
        :tone="row.tone"
        :fg="row.fg"
        :bg="row.bg"
    />
    <h3 class="subtitle">{{ uiTitle }}</h3>
    <ContrastRow
        v-for="row in uiRows"
        :key="row.id"
        :label="row.label"
        :ratio-text="row.ratioText"
        :badge-label="row.badgeLabel"
        :tone="row.tone"
        :fg="row.fg"
        :bg="row.bg"
    />
  </SettingsSection>
</template>

<style scoped>
.hint {
  font-size: 12px;
  color: var(--bd-color-text-muted);
}
.subtitle {
  margin: var(--bd-space-sm) 0 0;
  font-size: 0.9375rem;
  font-family: var(--bd-font-title);
}
</style>