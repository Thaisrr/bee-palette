<script setup lang="ts">
defineProps<{ label: string }>()
const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="toggle">
    <span>{{ label }}</span>
    <input v-model="model" class="toggle__input" type="checkbox" role="switch" />
    <span class="toggle__track" aria-hidden="true">
      <span class="toggle__thumb" />
    </span>
  </label>
</template>

<style scoped>
.toggle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--bd-space-sm);
  min-block-size: var(--bd-control-height);
  cursor: pointer;
}
.toggle__input {
  position: absolute;
  inset-inline-end: 0;
  inline-size: 44px;
  block-size: 26px;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}
.toggle__track {
  display: flex;
  flex: none;
  align-items: center;
  box-sizing: border-box;
  inline-size: 44px;
  block-size: 26px;
  padding: 3px;
  border-radius: var(--bd-radius-full);
  background: var(--bd-color-border-strong);
  transition: background-color var(--bd-transition-fast);
}
.toggle__thumb {
  inline-size: 20px;
  block-size: 20px;
  border-radius: var(--bd-radius-full);
  background: #fff;
  transition: transform var(--bd-transition-fast);
}
.toggle__input:checked + .toggle__track {
  background: var(--bd-color-primary);
}
.toggle__input:checked + .toggle__track .toggle__thumb {
  transform: translateX(18px);
}
.toggle__input:focus-visible + .toggle__track {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: var(--bd-focus-ring-offset);
}
</style>