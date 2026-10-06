<script setup lang="ts">
import { useId } from 'vue'
import { BeeFlex } from '@thaisrr/beedesign'

defineProps<{
  label: string
  min: number
  max: number
  valueText: string
  step?: number
}>()
const model = defineModel<number>({ required: true })
const id = useId()
</script>

<template>
  <BeeFlex align="center" gap="sm" class="slider">
    <label :for="id" class="slider__label">{{ label }}</label>
    <input
        :id="id"
        v-model.number="model"
        class="slider__input"
        type="range"
        :min="min"
        :max="max"
        :step="step ?? 1"
        :aria-valuetext="valueText"
    />
    <output :for="id" class="slider__value">{{ valueText }}</output>
  </BeeFlex>
</template>

<style scoped>
.slider {
  min-block-size: var(--bd-control-height);
}
.slider__label {
  flex: none;
  inline-size: 108px;
  white-space: nowrap;
}
.slider__input {
  flex: 1;
  min-inline-size: 0;
  accent-color: var(--bd-color-primary);
}
.slider__value {
  flex: none;
  min-inline-size: 72px;
  text-align: end;
  font-size: 13px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
</style>