<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { BeeFlex } from '@thaisrr/beedesign'
import { useTheme } from '../../composables/useTheme'
import { formatRatio, type TextSize } from '../../lib/contrast'
import { SURFACES, SURFACE_GROUPS } from '../../lib/surface'
import ContrastSection from './ContrastSection.vue'
import SurfaceSection from './SurfaceSection.vue'
import { usePreviewHighlight } from '../../composables/usePreviewHighlight'
import ExportPanel from "@/components/analysis/ExportPanel.vue";

const { highlight } = usePreviewHighlight()

function onHighlight(id: string | null) {
  highlight.value = SURFACES.find((s) => s.role === id)?.role ?? null
}

const { t, locale } = useI18n()
const { checks, textSize, tokens, uiChecks } = useTheme()

const percent = computed(
    () => new Intl.NumberFormat(locale.value, { style: 'percent', maximumFractionDigits: 0 }),
)

const sizeOptions = computed<{ value: TextSize; label: string }[]>(() => [
  { value: 'normal', label: t('analysis.contrast.normal') },
  { value: 'large', label: t('analysis.contrast.large') },
])

const contrastRows = computed(() =>
    checks.value.map((c) => {
      const largeOnly = c.level === 'fail' && c.ratio >= 3
      const badgeLabel =
          c.level === 'AAA' ? t('analysis.level.aaa')
              : c.level === 'AA' ? t('analysis.level.aa')
                  : largeOnly ? t('analysis.level.largeOnly')
                      : t('analysis.level.fail')
      const tone = c.level === 'fail' ? (largeOnly ? 'warn' : 'bad') : 'good'
      return {
        id: c.id,
        label: t(`analysis.contrast.${c.id}`),
        ratioText: formatRatio(c.ratio, locale.value),
        badgeLabel,
        tone,
        fg: c.fg,
        bg: c.bg,
      } as const
    }),
)

const uiRows = computed(() =>
    uiChecks.value.map((c) => {
      const pass = c.ratio >= 3
      return {
        id: c.id,
        label: t(`analysis.ui.${c.id}`),
        ratioText: formatRatio(c.ratio, locale.value),
        badgeLabel: pass ? t('analysis.level.pass') : t('analysis.level.fail'),
        tone: pass ? 'good' : 'bad',
        fg: c.fg,
        bg: c.bg,
      } as const
    }),
)

const total = SURFACES.reduce((sum, s) => sum + s.weight, 0)

const surfaceItems = computed(() =>
    SURFACES.map((s) => ({
      id: s.role,
      label: t(`analysis.surfaces.roles.${s.role}`),
      color: tokens.value[s.token] ?? 'transparent',
      percent: s.weight,
      percentText: percent.value.format(s.weight / total),
    })),
)

const surfaceGroups = computed(() =>
    SURFACE_GROUPS.map((g) => {
      const weight = SURFACES.filter((s) => g.roles.includes(s.role)).reduce((n, s) => n + s.weight, 0)
      return {
        id: g.id,
        label: t(`analysis.surfaces.groups.${g.id}`),
        percentText: percent.value.format(weight / total),
      }
    }),
)
</script>

<template>
  <aside class="analysis" :aria-label="t('analysis.ariaLabel')">
    <BeeFlex direction="column" :gap="24" align="stretch">
      <ContrastSection
          v-model="textSize"
          :title="t('analysis.contrast.title')"
          :size-legend="t('analysis.contrast.sizeLegend')"
          :size-options="sizeOptions"
          :hint="t('analysis.contrast.hint')"
          :rows="contrastRows"
          :ui-title="t('analysis.contrast.uiTitle')"
          :ui-rows="uiRows"
      />
      <SurfaceSection
          :title="t('analysis.surfaces.title')"
          :bar-label="t('analysis.surfaces.barLabel')"
          :note="t('analysis.surfaces.note')"
          :items="surfaceItems"
          :groups="surfaceGroups"
      />
      <ExportPanel id="export" tabindex="-1" />
    </BeeFlex>
  </aside>
</template>

<style scoped>
.analysis {
  box-sizing: border-box;
  padding: var(--bd-space-md);
  font-family: var(--bd-font-main);
  color: var(--bd-color-text);
}
</style>