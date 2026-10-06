<script setup lang="ts">
import { ref, useId, watch } from 'vue'
import { BeeGrid } from '@thaisrr/beedesign'
import { normalizeHex } from '../../lib/color'

defineProps<{ label: string; pickerLabel: string }>()

const model = defineModel<string>({ required: true })

const id = useId()
const draft = ref(model.value.toUpperCase())
const invalid = ref(false)

watch(model, (value) => {
  draft.value = value.toUpperCase()
  invalid.value = false
})

function onPick(event: Event) {
  model.value = (event.target as HTMLInputElement).value
}

function onType(event: Event) {
  draft.value = (event.target as HTMLInputElement).value
  invalid.value = normalizeHex(draft.value) === null
  // On n'émet qu'à 6 chiffres : "#abc" deviendrait "#aabbcc" en pleine saisie
  if (/^#?[0-9a-f]{6}$/i.test(draft.value.trim())) {
    const hex = normalizeHex(draft.value)
    if (hex) model.value = hex
  }
}

function onBlur() {
  const hex = normalizeHex(draft.value)
  if (hex) model.value = hex
  draft.value = (hex ?? model.value).toUpperCase()
  invalid.value = false
}
</script>

<template>
  <BeeGrid :columns="3" gap="sm" class="color-field">
    <label :for="id" class="color-field__label">{{ label }}</label>
    <input
        class="color-field__swatch"
        type="color"
        :value="model"
        :aria-label="pickerLabel"
        @input="onPick"
    />
    <input
        :id="id"
        class="color-field__hex"
        :class="{ 'is-invalid': invalid }"
        type="text"
        :value="draft"
        maxlength="7"
        spellcheck="false"
        autocomplete="off"
        @input="onType"
        @blur="onBlur"
    />
  </BeeGrid>
</template>

<style scoped>
.color-field {
  min-block-size: var(--bd-control-height);
}
.color-field__label {
  flex: 1;
}
.color-field__swatch {
  box-sizing: border-box;
  flex: none;
  inline-size: 28px;
  block-size: 28px;
  padding: 0;
  border: var(--bd-border-width) solid var(--bd-color-border-strong);
  border-radius: var(--bd-radius-sm);
  background: none;
  cursor: pointer;
}
.color-field__swatch::-webkit-color-swatch-wrapper {
  padding: 0;
}
.color-field__swatch::-webkit-color-swatch {
  border: 0;
  border-radius: calc(var(--bd-radius-sm) - 1px);
}
.color-field__swatch::-moz-color-swatch {
  border: 0;
  border-radius: calc(var(--bd-radius-sm) - 1px);
}
.color-field__hex {
  box-sizing: border-box;
  inline-size: 94px;
  block-size: 32px;
  padding: 0 10px;
  border: var(--bd-border-width) solid var(--bd-color-border-strong);
  border-radius: var(--bd-radius-sm);
  background: var(--bd-color-bg);
  color: var(--bd-color-text);
  font: 500 13px var(--bd-font-main);
}
.color-field__hex.is-invalid {
  border-color: var(--bd-color-error);
}
.color-field__swatch:focus-visible,
.color-field__hex:focus-visible {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: var(--bd-focus-ring-offset);
}
</style>