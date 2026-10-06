<script setup lang="ts">
import { BeeButton, BeeFlex, BeeTag } from '@thaisrr/beedesign'
import SkeletonShape from './SkeletonShape.vue'
</script>

<template>
  <section class="hero" data-uses="bg">
    <BeeFlex direction="column" align="stretch" justify="flex-start" gap="md" class="hero__text">
      <BeeFlex gap="sm" justify="flex-start">
        <BeeTag v-for="w in ['28px', '40px', '20px']" :key="w" data-uses="primaryLight border">
          <SkeletonShape tone="text" :width="w" :height="6" />
        </BeeTag>
      </BeeFlex>
      <div class="hero__lines hero__lines--title">
        <SkeletonShape tone="text" :height="26" />
        <SkeletonShape tone="text" width="74%" :height="26" />
      </div>
      <div class="hero__lines">
        <SkeletonShape tone="muted" width="92%" :height="9" />
        <SkeletonShape tone="muted" width="84%" :height="9" />
        <SkeletonShape tone="muted" width="58%" :height="9" />
      </div>
      <BeeFlex gap="sm" justify="flex-start">
        <BeeButton data-uses="primary"><SkeletonShape tone="onPrimary" width="47px" /></BeeButton>
        <BeeButton variant="secondary" data-uses="primary">
          <SkeletonShape tone="primaryDark" width="47px" />
        </BeeButton>
      </BeeFlex>
    </BeeFlex>

    <div class="art" data-uses="surface border">
      <SkeletonShape class="art__panel" tone="light" width="128px" :height="92" :radius="10" />
      <SkeletonShape class="art__disc" tone="medium" width="76px" :height="76" circle />
      <SkeletonShape class="art__sun" tone="accent" width="46px" :height="46" circle />
      <div class="art__lines">
        <SkeletonShape tone="muted" width="96px" />
        <SkeletonShape tone="muted" width="64px" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 28px 28px 22px;
}
.hero__text {
  flex: 1;
  min-inline-size: 0;
}
.hero__lines {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hero__lines--title {
  gap: 10px;
}
.art {
  position: relative;
  flex: none;
  box-sizing: border-box;
  inline-size: 252px;
  block-size: 244px;
  border: var(--bd-border-width) solid var(--bd-color-border);
  border-radius: var(--bd-radius-md);
  background: var(--bd-color-surface);
  box-shadow: var(--bd-shadow-1);
}
.art__panel {
  position: absolute;
  inset-inline-start: 24px;
  inset-block-start: 28px;
}
.art__disc {
  position: absolute;
  inset-inline-end: 24px;
  inset-block-end: 26px;
}
.art__sun {
  position: absolute;
  inset-inline-end: -10px;
  inset-block-start: -10px;
}
.art__lines {
  position: absolute;
  inset-inline-start: 24px;
  inset-block-end: 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
@media (max-width: 800px) {
  .art {
    display: none;
  }
}
</style>