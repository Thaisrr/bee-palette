<script setup lang="ts" generic="T extends string">
import { useId } from 'vue'

defineProps<{
  legend: string
  options: { value: T; label: string }[]
}>()
const model = defineModel<T>({ required: true })
const name = useId()
</script>

<template>
  <fieldset class="segmented">
    <legend class="segmented__legend">{{ legend }}</legend>
    <label v-for="option in options" :key="option.value" class="segmented__option">
      <input v-model="model" class="segmented__input" type="radio" :name="name" :value="option.value" />
      <span class="segmented__text">{{ option.label }}</span>
    </label>
  </fieldset>
</template>

<style scoped>
.segmented {
  display: flex;
  gap: 4px;
  min-inline-size: 0;
  margin: 0;
  padding: 3px;
  border: var(--bd-border-width) solid var(--bd-color-border);
  border-radius: var(--bd-radius-md);
  background: var(--bd-color-surface);
}
.segmented__legend {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
.segmented__option {
  position: relative;
  flex: 1;
}
.segmented__input {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}
.segmented__text {
  display: flex;
  align-items: center;
  justify-content: center;
  min-block-size: 38px;
  border-radius: var(--bd-radius-sm);
  font-size: 13px;
  font-weight: 500;
}
.segmented__input:checked + .segmented__text {
  background: var(--bd-color-primary);
  color: var(--bd-color-on-primary);
}
.segmented__input:focus-visible + .segmented__text {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: var(--bd-focus-ring-offset);
}
</style>