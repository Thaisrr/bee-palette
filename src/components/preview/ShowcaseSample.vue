<script setup lang="ts">
defineProps<{ caption: string }>()
</script>

<template>
  <figure class="sample">
    <slot />
    <figcaption class="sample__caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.sample {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  margin: 0;
}
.sample__caption {
  font: 12px ui-monospace, SFMono-Regular, Menlo, monospace;
  color: var(--bd-color-text-muted);
}
</style>