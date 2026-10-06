<script setup lang="ts">
import { BeeButton } from '@thaisrr/beedesign'
import AppIcon from '../ui/AppIcon.vue'
import IconButton from '../ui/IconButton.vue'

defineProps<{
  title: string
  dark: boolean
  modeLabel: string
  localeLabel: string
  localeCode: string
  exportLabel: string
}>()

const emit = defineEmits<{ toggleMode: []; cycleLocale: []; export: [] }>()
</script>

<template>
  <header class="header">
    <span class="header__logo" aria-hidden="true"><i /><i /><i /></span>
    <h1 class="header__title">{{ title }}</h1>
    <span class="header__spacer" />

    <IconButton :label="localeLabel" @click="emit('cycleLocale')">
      <AppIcon name="globe" />
      <span>{{ localeCode }}</span>
    </IconButton>
    <IconButton :label="modeLabel" @click="emit('toggleMode')">
      <AppIcon :name="dark ? 'sun' : 'moon'" />
    </IconButton>
    <BeeButton rounded @click="emit('export')">{{ exportLabel }}</BeeButton>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  inset-block-start: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 14px;
  box-sizing: border-box;
  border-block-end: var(--bd-border-width) solid var(--bd-color-border);
  background: var(--bd-color-bg);
  flex-wrap: nowrap;
  block-size: var(--app-header-height);
  padding: 0 24px;
}
.header__logo {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 3px;
  inline-size: 32px;
  block-size: 32px;
  border-radius: 10px;
  background: var(--bd-color-primary);
}
.header__logo i {
  inline-size: 4px;
  border-radius: 2px;
  background: var(--bd-color-on-primary);
}
.header__logo i:nth-child(1) {
  block-size: 14px;
}
.header__logo i:nth-child(2) {
  block-size: 20px;
  background: var(--bd-color-accent);
}
.header__logo i:nth-child(3) {
  block-size: 10px;
}
.header__title {
  margin: 0;
  font-family: var(--bd-font-title);
  font-size: 21px;
  font-weight: 700;
}
.header__spacer {
  flex: 1;
}
</style>