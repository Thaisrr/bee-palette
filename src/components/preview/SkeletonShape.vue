<script setup lang="ts">
import { computed } from 'vue'

const TONES = {
  text: ['--bd-color-text', 'text'],
  muted: ['--bd-color-text-muted', 'muted'],
  primary: ['--bd-color-primary', 'primary'],
  onPrimary: ['--bd-color-on-primary', 'primary'],
  primaryDark: ['--bd-color-primary-dark', 'primary'],
  light: ['--bd-color-primary-light', 'primaryLight'],
  medium: ['--bd-color-primary-medium', 'primaryLight'],
  accent: ['--bd-color-accent', 'accent'],
  border: ['--bd-color-border', 'border'],
} as const

const props = withDefaults(
    defineProps<{
      tone: keyof typeof TONES
      width?: string
      height?: number
      radius?: number
      circle?: boolean
    }>(),
    { width: '100%', height: 8 },
)

const style = computed(() => ({
  inlineSize: props.width,
  blockSize: `${props.height}px`,
  borderRadius: props.circle ? '999px' : `${props.radius ?? Math.min(6, props.height / 2)}px`,
  background: `var(${TONES[props.tone][0]})`,
}))
</script>

<template>
  <span class="shape" :style="style" :data-uses="TONES[tone][1]" />
</template>

<style scoped>
.shape {
  display: block;
  flex: none;
}
</style>