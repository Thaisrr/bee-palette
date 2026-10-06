<script setup lang="ts">
import { BeeFlex } from '@thaisrr/beedesign'

withDefaults(defineProps<{ title: string; level?: 2 | 3 }>(), { level: 2 })
</script>

<template>
  <section class="section">
    <component :is="`h${level}`" class="section__title" :class="{ 'section__title--sub': level === 3 }">
      {{ title }}
    </component>
    <BeeFlex direction="column" gap="sm" align="stretch">
      <slot />
    </BeeFlex>
  </section>
</template>

<style scoped>
.section__title {
  margin: 0 0 var(--bd-space-sm);
  font-family: var(--bd-font-title);
  font-size: 1.0625rem;
  font-weight: 700;
}
.section__title--sub {
  font-size: 0.9375rem;
}
</style>