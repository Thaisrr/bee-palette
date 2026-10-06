<template>
  <div class="chrome" data-uses="surface border">
    <span class="chrome__dots" data-uses="border">
      <i v-for="n in 3" :key="n" />
    </span>
    <span class="chrome__url" data-uses="bg border" />
  </div>
</template>

<style scoped>
.chrome {
  display: flex;
  align-items: center;
  gap: 14px;
  box-sizing: border-box;
  block-size: 40px;
  padding: 0 16px;
  border-block-end: var(--bd-border-width) solid var(--bd-color-border);
  background: var(--bd-color-surface);
}
.chrome__dots {
  display: flex;
  gap: 6px;
}
.chrome__dots i {
  inline-size: 10px;
  block-size: 10px;
  border-radius: var(--bd-radius-full);
  background: var(--bd-color-border-strong);
}
.chrome__url {
  flex: 1;
  box-sizing: border-box;
  block-size: 22px;
  border: var(--bd-border-width) solid var(--bd-color-border);
  border-radius: var(--bd-radius-full);
  background: var(--bd-color-bg);
}
</style>