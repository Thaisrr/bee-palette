<script setup lang="ts">
defineProps<{
  label: string
  segments: { id: string; color: string; percent: number }[]
}>()
</script>

<template>
  <div class="bar" role="img" :aria-label="label">
    <span
        v-for="s in segments"
        :key="s.id"
        class="bar__segment"
        :style="{ flex: `${s.percent} 1 0`, background: s.color }"
    />
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  block-size: 22px;
  border: var(--bd-border-width) solid var(--bd-color-border-strong);
  border-radius: var(--bd-radius-sm);
}
.bar__segment {
  min-inline-size: 0;
}
</style>