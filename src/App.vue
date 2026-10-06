<script setup lang="ts">
import '@thaisrr/beedesign/style.css'
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from './components/layout/AppHeader.vue'
import SettingsPanel from './components/settings/SettingsPanel.vue'
import PreviewPane from './components/preview/PreviewPane.vue'
import AnalysisPanel from './components/analysis/AnalysisPanel.vue'
import { useTheme } from './composables/useTheme'
import { googleFontsUrl } from './lib/exportCss'
import type { Mode } from './lib/theme'
import { setPageFonts } from './services/fontLoader'
import { setLocale, type Locale } from './i18n'

const { t, locale } = useI18n()
const { state, mode } = useTheme()

watch(() => googleFontsUrl(state), setPageFonts, { immediate: true })
watchEffect(() => {
  document.title = t('app.title')
})

const LOCALES = [
  { value: 'fr', code: 'FR', name: 'Français' },
  { value: 'en', code: 'EN', name: 'English' },
] as const

const current = computed(() => LOCALES.find((l) => l.value === locale.value) ?? LOCALES[0])
const next = computed(() => LOCALES[(LOCALES.indexOf(current.value) + 1) % LOCALES.length] ?? LOCALES[0])

const localeLabel = computed(() =>
    t('header.language', { current: current.value.name, code: current.value.code, next: next.value.name }),
)

function cycleLocale() {
  setLocale(next.value.value)
}

const isDark = computed(() => mode.value === 'dark')
const modeLabel = computed(() => t(isDark.value ? 'header.lightMode' : 'header.darkMode'))

function toggleMode() {
  mode.value = isDark.value ? 'light' : 'dark'
}

function goToExport() {
  const section = document.getElementById('export')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  section?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  section?.focus({ preventScroll: true })
}
</script>

<template>
  <div class="app">
    <AppHeader
        title="BeePalette"
        :dark="isDark"
        :mode-label="modeLabel"
        :locale-label="localeLabel"
        :locale-code="current.code"
        :export-label="t('header.export')"
        @toggle-mode="toggleMode"
        @cycle-locale="cycleLocale"
        @export="goToExport"
    />
    <div class="app__body">
      <div class="app__side app__side--left"><SettingsPanel /></div>
      <PreviewPane class="app__center" />
      <div class="app__side app__side--right"><AnalysisPanel /></div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  background: var(--bd-color-bg);
  color: var(--bd-color-text);
  font-family: var(--bd-font-main);
}
html:root {
  --bd-font-main: "DM Sans", system-ui, sans-serif;
  --bd-font-title: "Libre Bodoni", Georgia, serif;
  --app-header-height: 64px;

}
#export {
  scroll-margin-block-start: 16px;
}

.app__side--left {
  border-inline-end: 1px solid var(--bd-color-border);
}
.app__side--right {
  border-inline-start: 1px solid var(--bd-color-border);
}.app {
   display: flex;
   flex-direction: column;
   block-size: 100vh;
   block-size: 100dvh;
   overflow: hidden;
 }

.app__body {
  display: flex;
  flex: 1;
  min-block-size: 0; /* indispensable pour que les enfants puissent scroller */
}

.app__side {
  flex: none;
  inline-size: 340px;
  min-block-size: 0;
  overflow-y: auto;
  overscroll-behavior: contain; /* le scroll ne "déborde" pas sur la page */
}

.app__center {
  flex: 1;
  min-inline-size: 0;
  min-block-size: 0;
  block-size: 100%;
}
/* Une colonne Beedesign ne doit pas passer à la ligne : sinon sa largeur suit le contenu le plus large */
html .bd-flex.bd-flex--direction-column {
  flex-wrap: nowrap;
}

/* En dessous de 1000 px, trois colonnes ne tiennent plus : on empile et on désactive le sticky */
@media (max-width: 1000px) {
  .app {
    block-size: auto;
    overflow: visible;
  }
  .app__body {
    flex-direction: column;
  }
  .app__side {
    inline-size: auto;
    overflow-y: visible;
  }
  .app__side--left {
    border-inline-end: 0;
    border-block-end: 1px solid var(--bd-color-border);
  }
  .app__side--right {
    border-inline-start: 0;
    border-block-start: 1px solid var(--bd-color-border);
  }
  .app__center {
    block-size: auto;
  }
}
</style>