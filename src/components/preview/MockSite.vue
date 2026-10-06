<script setup lang="ts">
import MockBrowserChrome from './MockBrowerChrome.vue'
import MockNavbar from './MockNavBar.vue'
import MockHero from './MockHero.vue'
import MockFeature from './MockFeature.vue'
import MockCards from './MockCard.vue'
import MockFooter from './MockFooter.vue'
import MockToast from './MockToast.vue'

defineProps<{ label: string }>()
</script>

<template>
  <!-- Image décorative : inert la retire de la navigation clavier et des lecteurs d'écran -->
  <div class="site" role="img" :aria-label="label" :inert="true" data-uses="bg border">
    <MockBrowserChrome />
    <div class="site__page" data-uses="bg">
      <MockNavbar />
      <MockHero />
      <MockFeature />
      <MockCards />
      <MockFooter />
      <MockToast />
    </div>
  </div>
</template>

<style scoped>
.site {
  overflow: hidden;
  box-sizing: border-box;
  max-inline-size: 920px;
  margin-inline: auto;
  border: var(--bd-border-width) solid var(--bd-color-border);
  border-radius: var(--bd-radius-md);
  background: var(--bd-color-bg);
  box-shadow: var(--bd-shadow-2);
}
.site__page {
  position: relative;
  background: var(--bd-color-bg);
}
</style>