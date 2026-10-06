<script setup lang="ts">
import SkeletonShape from './SkeletonShape.vue'
</script>

<template>
  <section class="feature" data-uses="bg">
    <div class="feature__media" data-uses="surface border">
      <SkeletonShape class="feature__disc" tone="light" width="56px" :height="56" circle />
      <SkeletonShape class="feature__bar" tone="accent" width="60px" />
    </div>
    <div class="feature__text">
      <SkeletonShape tone="text" width="44%" :height="18" />
      <div class="feature__lines">
        <SkeletonShape tone="muted" width="96%" :height="9" />
        <SkeletonShape tone="muted" width="90%" :height="9" />
        <SkeletonShape tone="muted" width="94%" :height="9" />
        <SkeletonShape tone="muted" width="62%" :height="9" />
      </div>
      <SkeletonShape tone="primary" width="84px" :height="3" />
    </div>
  </section>
</template>

<style scoped>
.feature {
  display: flex;
  gap: 24px;
  padding: 8px 28px 18px;
}
.feature__media {
  position: relative;
  flex: none;
  box-sizing: border-box;
  inline-size: 148px;
  block-size: 168px;
  border: var(--bd-border-width) solid var(--bd-color-border);
  border-radius: var(--bd-radius-md);
  background: var(--bd-color-surface);
}
.feature__disc {
  position: absolute;
  inset-inline-start: 18px;
  inset-block-start: 18px;
}
.feature__bar {
  position: absolute;
  inset-inline-start: 16px;
  inset-block-end: 16px;
}
.feature__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 11px;
  min-inline-size: 0;
  padding-block-start: 6px;
}
.feature__lines {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>