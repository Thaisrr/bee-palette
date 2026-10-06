<script setup lang="ts">
defineProps<{ label: string; code: string }>()
</script>

<template>
  <pre class="code" role="region" tabindex="0" :aria-label="label"><code>{{ code }}</code></pre>
</template>

<style scoped>
.code {
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
  max-inline-size: 100%;
  max-block-size: 280px;
  margin: 0;
  padding: 12px 14px;
  overflow: auto;
  border-radius: 10px;
  background: #171738;
  color: #ecebfa;
  font: 12px / 1.65 ui-monospace, Menlo, Consolas, monospace;
  tab-size: 2;
}

.code:focus-visible {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: var(--bd-focus-ring-offset);
}
</style>