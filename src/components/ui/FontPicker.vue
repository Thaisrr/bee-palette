<script setup lang="ts">
import { useId } from 'vue'
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

defineProps<{
  label: string
  families: string[]
  placeholder: string
  noResultsText: string
  noOptionsText: string
  loading?: boolean
}>()
const model = defineModel<string | null>({ required: true })

const id = useId()
const labelId = `${id}-label`
</script>

<template>
  <div class="font-picker">
    <span :id="labelId" class="font-picker__label">{{ label }}</span>
    <Multiselect
        :id="id"
        v-model="model"
        :options="families"
        :loading="loading"
        :limit="50"
        :aria="{ 'aria-labelledby': labelId }"
        searchable
        can-clear
        :placeholder="placeholder"
        :no-results-text="noResultsText"
        :no-options-text="noOptionsText"
    />
  </div>
</template>

<style scoped>
.font-picker {
  display: flex;
  flex-direction: column;
  gap: 6px;
  --ms-font-size: var(--bd-font-size-md);
  --ms-line-height: 1.4;
  --ms-bg: var(--bd-color-bg);
  --ms-border-color: var(--bd-color-border-strong);
  --ms-border-width: var(--bd-border-width);
  --ms-radius: var(--bd-radius-sm);
  --ms-ring-color: var(--bd-color-focus);
  --ms-ring-width: var(--bd-focus-ring-width);
  --ms-placeholder-color: var(--bd-color-text-muted);
  --ms-dropdown-bg: var(--bd-color-bg);
  --ms-dropdown-border-color: var(--bd-color-border-strong);
  --ms-option-bg-pointed: var(--bd-color-primary-light);
  --ms-option-color-pointed: var(--bd-color-primary-dark);
  --ms-option-bg-selected: var(--bd-color-primary);
  --ms-option-color-selected: var(--bd-color-on-primary);
  --ms-option-bg-selected-pointed: var(--bd-color-primary-hover);
  --ms-option-color-selected-pointed: var(--bd-color-on-primary);
  --ms-spinner-color: var(--bd-color-primary);
  --ms-caret-color: var(--bd-color-text-muted);
  --ms-clear-color: var(--bd-color-text-muted);
  --ms-clear-color-hover: var(--bd-color-text);
}
</style>