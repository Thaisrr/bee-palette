<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../../composables/useTheme'
import { usePreviewHighlight } from '../../composables/usePreviewHighlight'
import TabBar from '../ui/TabBar.vue'
import MockSite from './MockSite.vue'
import ComponentsShowcase from './ComponentsShowcase.vue'

type Tab = 'mockup' | 'components'

const { t } = useI18n()
const { tokens } = useTheme()
const { highlight } = usePreviewHighlight()

const tab = ref<Tab>('mockup')
const idPrefix = useId()

const tabs = computed<{ value: Tab; label: string }[]>(() => [
  { value: 'mockup', label: t('preview.tabs.mockup') },
  { value: 'components', label: t('preview.tabs.components') },
])

const labels = computed(() => ({
  button: t('preview.components.button'),
  tags: [t('preview.components.tagA'), t('preview.components.tagB'), t('preview.components.tagC')],
  cardTitle: t('preview.components.cardTitle'),
  cardText: t('preview.components.cardText'),
  closeLabel: t('preview.components.closeLabel'),
  alerts: {
    success: t('preview.components.alerts.success'),
    error: t('preview.components.alerts.error'),
    warning: t('preview.components.alerts.warning'),
    info: t('preview.components.alerts.info'),
  },
}))
</script>

<template>
  <section class="pane" :aria-label="t('preview.title')">
    <div class="pane__header">
      <TabBar v-model="tab" :label="t('preview.tabs.label')" :id-prefix="idPrefix" :tabs="tabs" />
    </div>

    <div
        :id="`${idPrefix}-panel`"
        class="pane__stage"
        role="tabpanel"
        tabindex="0"
        :aria-labelledby="`${idPrefix}-tab-${tab}`"
    >
      <div class="scope" :style="tokens" :data-highlight="highlight ?? undefined">
        <MockSite v-if="tab === 'mockup'" :label="t('preview.mockupLabel')" />
        <ComponentsShowcase v-else :labels="labels" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.pane {
  display: flex;
  flex-direction: column;
  block-size: 100%;
  min-block-size: 0;
}
.pane__header {
  padding: 0 24px;
  border-block-end: var(--bd-border-width) solid var(--bd-color-border);
  background: var(--bd-color-bg);
}
.pane__stage {
  flex: 1;
  min-block-size: 0;
  box-sizing: border-box;
  padding: 24px;
  overflow: auto;
  container-type: inline-size;
}
.scope {
  font-family: var(--bd-font-main);
  color: var(--bd-color-text);
}

/* Survol d'une couleur dans le panneau de droite : on entoure tout ce qui l'utilise */
.scope[data-highlight='bg'] :deep([data-uses~='bg']),
.scope[data-highlight='surface'] :deep([data-uses~='surface']),
.scope[data-highlight='text'] :deep([data-uses~='text']),
.scope[data-highlight='muted'] :deep([data-uses~='muted']),
.scope[data-highlight='primary'] :deep([data-uses~='primary']),
.scope[data-highlight='primaryLight'] :deep([data-uses~='primaryLight']),
.scope[data-highlight='border'] :deep([data-uses~='border']),
.scope[data-highlight='accent'] :deep([data-uses~='accent']) {
  outline: 2px solid var(--bd-color-focus);
  outline-offset: 2px;
}
</style>