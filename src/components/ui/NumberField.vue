<script setup lang="ts">
import { ref, useId, watch } from 'vue'

const props = defineProps<{ label: string; min: number; max: number; step: number; unit: string }>()
const model = defineModel<number>({ required: true })

const id = useId()
const unitId = `${id}-unit`
const decimals = (props.step.toString().split('.')[1] ?? '').length
const round = (n: number) => Number(n.toFixed(decimals))
const clamp = (n: number) => Math.min(props.max, Math.max(props.min, n))

function parse(raw: string): number | null {
  if (raw.trim() === '') return null
  const n = Number(raw.replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

const draft = ref(String(round(model.value)))

watch(model, (value) => {
  // on ne réécrit pas le champ pendant la frappe
  if (parse(draft.value) !== round(value)) draft.value = String(round(value))
})

function onInput(event: Event) {
  draft.value = (event.target as HTMLInputElement).value
  const n = parse(draft.value)
  if (n !== null && n >= props.min && n <= props.max) model.value = round(n)
}

function onBlur() {
  const n = parse(draft.value)
  if (n === null) {
    draft.value = String(round(model.value))
    return
  }
  model.value = round(clamp(n))
  draft.value = String(model.value)
}
</script>

<template>
  <div class="number-field">
    <label :for="id" class="number-field__label">{{ label }}</label>
    <input
        :id="id"
        class="number-field__input"
        type="number"
        inputmode="decimal"
        :min="min"
        :max="max"
        :step="step"
        :value="draft"
        :aria-describedby="unitId"
        @input="onInput"
        @blur="onBlur"
    />
    <span :id="unitId" class="number-field__unit">{{ unit }}</span>
  </div>
</template>

<style scoped>
.number-field {
  display: grid;
  grid-template-columns: 1fr 84px 32px;
  align-items: center;
  column-gap: var(--bd-space-sm);
  min-block-size: 40px;
}
.number-field__input {
  box-sizing: border-box;
  inline-size: 100%;
  block-size: 32px;
  padding: 0 10px;
  border: var(--bd-border-width) solid var(--bd-color-border-strong);
  border-radius: var(--bd-radius-sm);
  background: var(--bd-color-bg);
  color: var(--bd-color-text);
  font: 500 13px var(--bd-font-main);
  text-align: end;
  font-variant-numeric: tabular-nums;
}
.number-field__input:focus-visible {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: var(--bd-focus-ring-offset);
}
.number-field__unit {
  font-size: 12px;
  color: var(--bd-color-text-muted);
}
</style>