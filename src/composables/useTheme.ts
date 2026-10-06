import { computed, reactive, ref } from 'vue'
import { contrastRatio, normalizeHex } from '../lib/color'
import { wcagLevel, type TextSize } from '../lib/contrast'
import {
    ALERT_KEYS,
    SHADE_TOKENS,
    defaultAdvanced,
    defaultInput,
    generateTheme,
    type AlertKey,
    type Mode,
    type ShadeId,
    type ThemeInput,
} from '../lib/theme'

// État partagé entre tous les composants (singleton de module)
const state = reactive<ThemeInput>(structuredClone(defaultInput))
const mode = ref<Mode>('light')
const textSize = ref<TextSize>('normal')

const theme = computed(() => generateTheme(state))
const tokens = computed(() => ({ ...theme.value.shared, ...theme.value.modes[mode.value] }))

const get = (key: string) => tokens.value[key] ?? '#000000'

const checks = computed(() => {
    const pairs = [
        { id: 'text', fg: get('--bd-color-text'), bg: get('--bd-color-bg') },
        { id: 'muted', fg: get('--bd-color-text-muted'), bg: get('--bd-color-bg') },
        { id: 'onPrimary', fg: get('--bd-color-on-primary'), bg: get('--bd-color-primary') },
        { id: 'accent', fg: get('--bd-color-accent'), bg: get('--bd-color-bg') },
    ] as const
    return pairs.map((p) => {
        const ratio = contrastRatio(p.fg, p.bg)
        return { ...p, ratio, level: wcagLevel(ratio, textSize.value) }
    })
})

/** Éléments d'interface (icônes, bandes) : 3:1 minimum. */
const uiChecks = computed(() =>
    ALERT_KEYS.map((key) => {
        const fg = get(`--bd-color-${key}`)
        const bg = get('--bd-color-bg')
        return { id: key, fg, bg, ratio: contrastRatio(fg, bg) }
    }),
)

type ColorKey = 'primary' | 'accent' | 'bg' | 'text'

/** Retourne false si la saisie n'est pas un hexadécimal valide (l'état ne change pas). */
function setColor(key: ColorKey, value: string): boolean {
    const hex = normalizeHex(value)
    if (!hex) return false
    state[key] = hex
    return true
}

/** En passant en manuel, on fige les nuances actuelles (sans écraser celles déjà modifiées). */
function setAutoShades(value: boolean) {
    state.autoShades = value
    if (value) return
    for (const m of ['light', 'dark'] as const) {
        const derived = theme.value.modes[m]
        for (const token of Object.values(SHADE_TOKENS)) {
            const current = derived[token]
            if (current !== undefined && state.overrides[m][token] === undefined) {
                state.overrides[m][token] = current
            }
        }
    }
}

function setShade(id: ShadeId, color: string) {
    state.overrides[mode.value][SHADE_TOKENS[id]] = color
}

function setAlertColor(key: AlertKey, color: string) {
    state.advanced.alerts[mode.value][key] = color
}

function resetAdvanced() {
    state.advanced = structuredClone(defaultAdvanced)
}

export function useTheme() {
    return {
        state,
        mode,
        textSize,
        theme,
        tokens,
        checks,
        uiChecks,
        setColor,
        setAutoShades,
        setShade,
        setAlertColor,
        resetAdvanced,
    }
}