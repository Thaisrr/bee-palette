<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../../composables/useTheme'
import { useClipboard } from '../../composables/useClipboard'
import { generateCss, type ExportKind } from '../../lib/exportCss'
import { downloadText } from '../../lib/download'
import ExportSection from './ExportSection.vue'

const { t } = useI18n()
const { state } = useTheme()
const { status, copy } = useClipboard()

const format = ref<ExportKind>('beedesign')

const formats = computed<{ value: ExportKind; label: string; hint: string }[]>(() => [
  { value: 'beedesign', label: t('export.formats.beedesign.label'), hint: t('export.formats.beedesign.hint') },
  { value: 'starter', label: t('export.formats.starter.label'), hint: t('export.formats.starter.hint') },
])

const css = computed(() =>
    generateCss(state, format.value, {
      header: t('export.comment.header'),
      noChanges: t('export.comment.noChanges'),
    }),
)

const linesText = computed(() => t('export.lines', css.value.trimEnd().split('\n').length))

const statusText = computed(() =>
    status.value === 'copied' ? t('export.copied') : status.value === 'failed' ? t('export.copyFailed') : '',
)

function download() {
  downloadText(format.value === 'beedesign' ? 'beedesign-theme.css' : 'styles.css', css.value, 'text/css')
}
</script>

<template>
  <ExportSection
      v-model="format"
      :title="t('export.title')"
      :format-legend="t('export.formatLegend')"
      :formats="formats"
      :code="css"
      :code-label="t('export.codeLabel')"
      :lines-text="linesText"
      :copy-label="t('export.copy')"
      :download-label="t('export.download')"
      :status-text="statusText"
      @copy="copy(css)"
      @download="download"
  />
</template>