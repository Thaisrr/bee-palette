<script setup lang="ts" generic="T extends string">
import { useId } from 'vue'

defineProps<{
  legend: string
  options: { value: T; label: string; hint: string }[]
}>()
const model = defineModel<T>({ required: true })
const name = useId()
</script>

<template>
  <fieldset class="radios">
    <legend class="radios__legend">{{ legend }}</legend>
    <label v-for="option in options" :key="option.value" class="radios__option">
      <input v-model="model" class="radios__input" type="radio" :name="name" :value="option.value" />
      <span class="radios__text">
        {{ option.label }}
        <span class="radios__hint">{{ option.hint }}</span>
      </span>
    </label>
  </fieldset>
</template>

<style scoped>
.radios {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
.radios__legend {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
.radios__option {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
}
.radios__input {
  margin: 3px 0 0;
  accent-color: var(--bd-color-primary);
}
.radios__input:focus-visible {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: var(--bd-focus-ring-offset);
}
.radios__text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.radios__hint {
  font-size: 12px;
  color: var(--bd-color-text-muted);
}
</style>