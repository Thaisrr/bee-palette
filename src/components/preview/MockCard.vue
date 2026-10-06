<script setup lang="ts">
import { BeeCard, BeeGrid, BeeTag } from '@thaisrr/beedesign'
import SkeletonShape from './SkeletonShape.vue'

const tones = ['light', 'medium', 'light'] as const
</script>

<template>
  <div class="cards" data-uses="bg">
    <BeeGrid :columns="3" gap="md" :responsive="false">
      <BeeCard v-for="(tone, i) in tones" :key="i" :elevation="1" padding="sm" data-uses="surface border">
        <div class="card">
          <SkeletonShape :tone="tone" :height="66" :radius="8" />
          <BeeTag data-uses="primaryLight border" class="card__tag">
            <SkeletonShape tone="text" width="24px" :height="6" />
          </BeeTag>
          <div class="card__lines">
            <SkeletonShape tone="text" width="82%" :height="9" />
            <SkeletonShape tone="muted" width="60%" />
          </div>
          <SkeletonShape tone="primary" width="54px" :height="3" />
        </div>
      </BeeCard>
    </BeeGrid>
  </div>
</template>

<style scoped>
.cards {
  padding: 6px 28px 22px;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card__tag {
  align-self: flex-start;
}
.card__lines {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
</style>