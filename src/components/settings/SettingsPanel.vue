<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { BeeAlert, BeeFlex } from '@thaisrr/beedesign'
import { useTheme } from '../../composables/useTheme'
import { useGoogleFonts } from '../../composables/useGoogleFont'
import { pickWeights } from '../../services/googleFont'
import type { FontChoice } from '../../lib/theme'
import ColorsSection from './ColorSection.vue'
import SettingsSection from '../ui/SettingSection.vue'
import FontPicker from '../ui/FontPicker.vue'
import SliderField from '../ui/SliderField.vue'
import SegmentedControl from '../ui/SegmentedControl.vue'
import { ref } from 'vue'
import { SHADE_IDS } from '../../lib/theme'
import DisclosureSection from '../ui/DisclosureSection.vue'
import AdvancedPanel from './AdvancedPanel.vue'

const { t } = useI18n()
const { state, tokens, mode, setAutoShades, setShade } = useTheme()

const advancedOpen = ref(false)
const autoShades = computed({ get: () => state.autoShades, set: setAutoShades })
const modeName = computed(() => t(`settings.modeName.${mode.value}`))

const shades = computed(() => [
  { id: 'hover', label: t('settings.shades.hover'), color: token('--bd-color-primary-hover') },
  { id: 'edge', label: t('settings.shades.edge'), color: token('--bd-color-primary-edge') },
  { id: 'light', label: t('settings.shades.light'), color: token('--bd-color-primary-light') },
  { id: 'medium', label: t('settings.shades.medium'), color: token('--bd-color-primary-medium') },
])

function onShade(id: string, color: string) {
  const shade = SHADE_IDS.find((s) => s === id)
  if (shade) setShade(shade, color)
}const { fonts, status, errorCode, load } = useGoogleFonts()
onMounted(load)

const families = computed(() => fonts.value.map((f) => f.family))
const fontsLoading = computed(() => status.value === 'loading')

const token = (key: string) => tokens.value[key] ?? ''
const px = (key: string) => Number.parseInt(token(key), 10)

const colorLabels = computed(() => ({
  title: t('settings.colors.title'),
  primary: t('settings.colors.primary'),
  accent: t('settings.colors.accent'),
  background: t('settings.colors.background'),
  text: t('settings.colors.text'),
  autoShades: t('settings.colors.autoShades'),
  picker: (name: string) => t('settings.colors.picker', { name }),
  shadesNote: t('settings.advanced.shadesNote', { mode: modeName.value }),
}))

const spacingText = computed(
    () => `${px('--bd-space-sm')} / ${px('--bd-space-md')} / ${px('--bd-space-lg')}`,
)

const shadowOptions = computed<{ value: 'soft' | 'strong'; label: string }[]>(() => [
  { value: 'soft', label: t('settings.shadows.soft') },
  { value: 'strong', label: t('settings.shadows.strong') },
])

function toFontChoice(family: string | null): FontChoice | null {
  if (!family) return null
  const font = fonts.value.find((f) => f.family === family)
  return font ? { family: font.family, category: font.category, weights: pickWeights(font) } : null
}
</script>

<template>
  <aside class="settings" :aria-label="t('settings.ariaLabel')">
    <BeeFlex direction="column" :gap="24" align="stretch">
      <ColorsSection
          v-model:primary="state.primary"
          v-model:accent="state.accent"
          v-model:bg="state.bg"
          v-model:text="state.text"
          v-model:autoShades="autoShades"
          @shade="onShade"
          :shades="shades"
          :labels="colorLabels"
      />

      <SettingsSection :title="t('settings.typography.title')">
        <BeeAlert v-if="errorCode" type="error">{{ t(`fonts.error.${errorCode}`) }}</BeeAlert>
        <FontPicker
            :label="t('settings.typography.headings')"
            :model-value="state.title?.family ?? null"
            :families="families"
            :loading="fontsLoading"
            :placeholder="t('settings.typography.placeholder')"
            :no-results-text="t('settings.typography.noResults')"
            :no-options-text="t('settings.typography.loading')"
            @update:model-value="state.title = toFontChoice($event)"
        />
        <FontPicker
            :label="t('settings.typography.body')"
            :model-value="state.body?.family ?? null"
            :families="families"
            :loading="fontsLoading"
            :placeholder="t('settings.typography.placeholder')"
            :no-results-text="t('settings.typography.noResults')"
            :no-options-text="t('settings.typography.loading')"
            @update:model-value="state.body = toFontChoice($event)"
        />
      </SettingsSection>

      <SettingsSection :title="t('settings.spacing.title')">
        <SliderField
            v-model="state.spaceScale"
            :label="t('settings.spacing.scale')"
            :min="0"
            :max="100"
            :value-text="spacingText"
        />
      </SettingsSection>

      <SettingsSection :title="t('settings.radius.title')">
        <SliderField
            v-model="state.radius"
            :label="t('settings.radius.medium')"
            :min="0"
            :max="32"
            :value-text="`${state.radius} px`"
        />
      </SettingsSection>

      <SettingsSection :title="t('settings.shadows.title')">
        <SegmentedControl
            v-model="state.shadow"
            :legend="t('settings.shadows.legend')"
            :options="shadowOptions"
        />
      </SettingsSection>
      <DisclosureSection v-model:open="advancedOpen" :title="t('settings.advanced.title')">
        <AdvancedPanel />
      </DisclosureSection>
    </BeeFlex>
  </aside>
</template>

<style scoped>
.settings {
  box-sizing: border-box;
  padding: var(--bd-space-md);
  font-family: var(--bd-font-main);
  color: var(--bd-color-text);
}
</style>