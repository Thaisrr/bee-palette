<script setup lang="ts" generic="T extends string">
import { BeeButton, BeeFlex } from '@thaisrr/beedesign'
import SettingsSection from '../ui/SettingSection.vue'
import RadioOptions from '../ui/RadioOptions.vue'
import CodePreview from '../ui/CodePreview.vue'

defineProps<{
  title: string
  formatLegend: string
  formats: { value: T; label: string; hint: string }[]
  code: string
  codeLabel: string
  linesText: string
  copyLabel: string
  downloadLabel: string
  statusText: string
}>()

const format = defineModel<T>({ required: true })
const emit = defineEmits<{ copy: []; download: [] }>()
</script>

<template>
  <SettingsSection :title="title">
    <RadioOptions v-model="format" :legend="formatLegend" :options="formats" />
    <CodePreview :label="codeLabel" :code="code" />
    <small class="meta">{{ linesText }}</small>
    <BeeFlex gap="sm" justify="flex-start" align="center">
      <BeeButton variant="secondary" rounded class="action action--copy" @click="emit('copy')">
        {{ copyLabel }}
      </BeeButton>
      <BeeButton rounded class="action action--download" @click="emit('download')">
        {{ downloadLabel }}
      </BeeButton>
    </BeeFlex>
    <p class="status" role="status">{{ statusText }}</p>
  </SettingsSection>
</template>

<style scoped>
.meta {
  font-size: 12px;
  color: var(--bd-color-text-muted);
}
.action {
  flex: 1 1 0;
}
.action--download {
  flex-grow: 1.4;
}
.status {
  min-block-size: 1.3em;
  margin: 0;
  font-size: 12px;
  color: var(--bd-color-text-muted);
}
</style>