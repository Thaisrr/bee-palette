<script setup lang="ts">
import SettingsSection from '../ui/SettingSection.vue'
import ColorField from '../ui/ColorField.vue'
import ToggleSwitch from '../ui/ToggleSwitch.vue'
import ShadeSwatches from '../ui/ShadeSwatch.vue'

defineProps<{
  shades: { id: string; label: string; color: string }[]
  labels: {
    title: string
    primary: string
    accent: string
    background: string
    text: string
    autoShades: string
    shadesNote: string
    picker: (name: string) => string
  }
}>()

const primary = defineModel<string>('primary', { required: true })
const accent = defineModel<string>('accent', { required: true })
const bg = defineModel<string>('bg', { required: true })
const text = defineModel<string>('text', { required: true })
const autoShades = defineModel<boolean>('autoShades', { required: true })

const emit = defineEmits<{ shade: [id: string, color: string] }>()
</script>

<template>
  <SettingsSection :title="labels.title">
    <ColorField v-model="primary" :label="labels.primary" :picker-label="labels.picker(labels.primary)" />
    <ColorField v-model="accent" :label="labels.accent" :picker-label="labels.picker(labels.accent)" />
    <ColorField v-model="bg" :label="labels.background" :picker-label="labels.picker(labels.background)" />
    <ColorField v-model="text" :label="labels.text" :picker-label="labels.picker(labels.text)" />
    <ToggleSwitch v-model="autoShades" :label="labels.autoShades" />
    <ShadeSwatches v-if="autoShades" :shades="shades" />
    <template v-else>
      <small class="note">{{ labels.shadesNote }}</small>
      <ColorField
          v-for="shade in shades"
          :key="shade.id"
          :label="shade.label"
          :picker-label="labels.picker(shade.label)"
          :model-value="shade.color"
          @update:model-value="emit('shade', shade.id, $event)"
      />
    </template>
  </SettingsSection>
</template>

<style scoped>
.note {
  font-size: 12px;
  color: var(--bd-color-text-muted);
}
</style>