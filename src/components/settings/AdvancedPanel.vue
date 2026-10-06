<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { BeeAlert, BeeButton, BeeFlex } from '@thaisrr/beedesign'
import { useTheme } from '../../composables/useTheme'
import { ALERT_KEYS, type NumberKey } from '../../lib/theme'
import NumberFieldGroup from './NumberFieldGroup.vue'
import ColorFieldGroup from './ColorFieldGroup.vue'

interface FieldDef {
  key: NumberKey
  /** Si renseigné, la valeur affichée est celle réellement appliquée (calculée ou forcée). */
  token?: string
  min: number
  max: number
  step: number
  unit: 'px' | 'rem'
}

const px = (key: NumberKey, token: string, min = 0, max = 64): FieldDef => ({ key, token, min, max, step: 1, unit: 'px' })
const plain = (key: NumberKey, min: number, max: number): FieldDef => ({ key, min, max, step: 1, unit: 'px' })
const rem = (key: NumberKey): FieldDef => ({ key, min: 0.5, max: 2.5, step: 0.05, unit: 'rem' })

const groups = [
  {
    id: 'spacing',
    hint: true,
    fields: [
      px('spaceSm', '--bd-space-sm'),
      px('spaceMd', '--bd-space-md'),
      px('spaceLg', '--bd-space-lg', 0, 128),
    ],
  },
  {
    id: 'shape',
    fields: [
      px('radiusSm', '--bd-radius-sm', 0, 32),
      plain('borderWidth', 0, 6),
      plain('borderStrong', 0, 8),
      plain('focusWidth', 1, 8),
      plain('focusOffset', 0, 8),
      plain('stripeWidth', 0, 12),
      plain('buttonEdge', 0, 8),
    ],
  },
  { id: 'controls', fields: [plain('controlHeight', 16, 96), plain('closeSize', 16, 64)] },
  { id: 'text', fields: [rem('fontSm'), rem('fontMd'), rem('fontLg')] },
] as const

const { t } = useI18n()
const { state, tokens, mode, setAlertColor, resetAdvanced } = useTheme()

const NUMBER_KEYS = groups.flatMap((g) => g.fields.map((f) => f.key))

function valueOf(def: FieldDef): number {
  if (def.token) return Number.parseFloat(tokens.value[def.token] ?? '0')
  return state.advanced[def.key] ?? 0
}

const numberGroups = computed(() =>
    groups.map((group) => ({
      id: group.id,
      title: t(`settings.advanced.groups.${group.id}`),
      hint: 'hint' in group ? t('settings.advanced.spacingHint') : undefined,
      fields: group.fields.map((def) => ({
        id: def.key,
        label: t(`settings.advanced.fields.${def.key}`),
        value: valueOf(def),
        min: def.min,
        max: def.max,
        step: def.step,
        unit: def.unit,
      })),
    })),
)

function onNumber(id: string, value: number) {
  const key = NUMBER_KEYS.find((k) => k === id)
  if (key) state.advanced[key] = value
}

const modeName = computed(() => t(`settings.modeName.${mode.value}`))

const alertFields = computed(() =>
    ALERT_KEYS.map((key) => {
      const label = t(`settings.advanced.alerts.${key}`)
      return {
        id: key,
        label,
        color: tokens.value[`--bd-color-${key}`] ?? '#000000',
        pickerLabel: t('settings.colors.picker', { name: label }),
      }
    }),
)

function onAlert(id: string, color: string) {
  const key = ALERT_KEYS.find((k) => k === id)
  if (key) setAlertColor(key, color)
}

/** WCAG 2.2 AA : 24 px minimum. 44 px est la taille recommandée pour les boutons. */
const targetAlert = computed(() => {
  const { controlHeight, closeSize } = state.advanced
  if (Math.min(controlHeight, closeSize) < 24) return 'error' as const
  if (controlHeight < 44) return 'warning' as const
  return null
})
</script>

<template>
  <BeeFlex direction="column" :gap="24" align="stretch">
    <NumberFieldGroup
        v-for="group in numberGroups"
        :key="group.id"
        :title="group.title"
        :hint="group.hint"
        :fields="group.fields"
        @update="onNumber"
    >
      <BeeAlert v-if="group.id === 'controls' && targetAlert" :type="targetAlert">
        {{ t(`settings.advanced.targets.${targetAlert}`) }}
      </BeeAlert>
    </NumberFieldGroup>

    <ColorFieldGroup
        :title="t('settings.advanced.groups.alerts')"
        :note="t('settings.advanced.alertsNote', { mode: modeName })"
        :fields="alertFields"
        @update="onAlert"
    />

    <BeeButton variant="ghost" @click="resetAdvanced">{{ t('settings.advanced.reset') }}</BeeButton>
  </BeeFlex>
</template>