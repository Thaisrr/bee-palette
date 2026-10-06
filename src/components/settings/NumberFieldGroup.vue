<script setup lang="ts">
import SettingsSection from '../ui/SettingSection.vue'
import NumberField from '../ui/NumberField.vue'

defineProps<{
  title: string
  hint?: string
  fields: { id: string; label: string; value: number; min: number; max: number; step: number; unit: string }[]
}>()
const emit = defineEmits<{ update: [id: string, value: number] }>()
</script>

<template>
  <SettingsSection :title="title" :level="3">
    <small v-if="hint" class="hint">{{ hint }}</small>
    <NumberField
        v-for="f in fields"
        :key="f.id"
        :label="f.label"
        :model-value="f.value"
        :min="f.min"
        :max="f.max"
        :step="f.step"
        :unit="f.unit"
        @update:model-value="emit('update', f.id, $event)"
    />
    <slot />
  </SettingsSection>
</template>

<style scoped>
.hint {
  font-size: 12px;
  color: var(--bd-color-text-muted);
}
</style>