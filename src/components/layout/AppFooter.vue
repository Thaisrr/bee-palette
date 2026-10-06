<script setup lang="ts">
defineProps<{
  madeBy: string
  author: string
  portfolioUrl: string
  portfolioLabel: string
  sourceUrl: string
  sourceLabel: string
}>()
</script>

<template>
  <footer class="footer">
    <p class="footer__text">
      {{ madeBy }}
      <a :href="portfolioUrl" target="_blank" rel="noopener noreferrer">{{ author }}</a>
    </p>
    <nav class="footer__links">
      <a :href="portfolioUrl" target="_blank" rel="noopener noreferrer">{{ portfolioLabel }}</a>
      <a :href="sourceUrl" target="_blank" rel="noopener noreferrer">{{ sourceLabel }}</a>
    </nav>
  </footer>
</template>

<style scoped>
.footer {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  block-size: 36px;
  padding: 0 24px;
  border-block-start: 1px solid var(--bd-color-border);
  font-size: 0.85rem;
}

.footer__text {
  margin: 0;
  opacity: 0.8;
}

.footer__links {
  display: flex;
  gap: 16px;
}

.footer a {
  color: inherit;
  text-underline-offset: 3px;
}

.footer a:hover,
.footer a:focus-visible {
  color: var(--bd-color-primary);
}
</style>