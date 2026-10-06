<script setup lang="ts">
import SettingsSection from '../ui/SettingSection.vue'
import ColorField from '../ui/ColorField.vue'

defineProps<{
  title: string
  note?: string
  fields: { id: string; label: string; color: string; pickerLabel: string }[]
}>()
const emit = defineEmits<{ update: [id: string, color: string] }>()
</script>

<template>
  <SettingsSection :title="title" :level="3">
    <small v-if="note" class="note">{{ note }}</small>
    <ColorField
        v-for="f in fields"
        :key="f.id"
        :label="f.label"
        :picker-label="f.pickerLabel"
        :model-value="f.color"
        @update:model-value="emit('update', f.id, $event)"
    />
  </SettingsSection>
</template>

<style scoped>
.note {
  font-size: 12px;
  color: var(--bd-color-text-muted);
}
</style>