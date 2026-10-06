import {
    adjustLightness, ensureContrast, hexToHsl, hslToHex, mix, readableOn, rgbString,
} from './color'

export type Mode = 'light' | 'dark'
export type Tokens = Record<string, string>
export interface FontChoice { family: string; category: string; weights?: number[] }
export const ALERT_KEYS = ['success', 'error', 'warning', 'info'] as const
export type AlertKey = (typeof ALERT_KEYS)[number]

export const SHADE_TOKENS = {
    hover: '--bd-color-primary-hover',
    edge: '--bd-color-primary-edge',
    light: '--bd-color-primary-light',
    medium: '--bd-color-primary-medium',
} as const
export type ShadeId = keyof typeof SHADE_TOKENS
export const SHADE_IDS = Object.keys(SHADE_TOKENS) as ShadeId[]

/** null = valeur calculée à partir des réglages simples. Les tailles de texte sont en rem, le reste en px. */
export interface AdvancedInput {
    spaceSm: number | null
    spaceMd: number | null
    spaceLg: number | null
    radiusSm: number | null
    borderWidth: number
    borderStrong: number
    focusWidth: number
    focusOffset: number
    stripeWidth: number
    buttonEdge: number
    controlHeight: number
    closeSize: number
    fontSm: number
    fontMd: number
    fontLg: number
    alerts: Record<Mode, Record<AlertKey, string | null>>
}
export type NumberKey = Exclude<keyof AdvancedInput, 'alerts'>

export const defaultAdvanced: AdvancedInput = {
    spaceSm: null,
    spaceMd: null,
    spaceLg: null,
    radiusSm: null,
    borderWidth: 1,
    borderStrong: 2,
    focusWidth: 3,
    focusOffset: 2,
    stripeWidth: 4,
    buttonEdge: 3,
    controlHeight: 44,
    closeSize: 36,
    fontSm: 0.85,
    fontMd: 1,
    fontLg: 1.25,
    alerts: {
        light: { success: null, error: null, warning: null, info: null },
        dark: { success: null, error: null, warning: null, info: null },
    },
}

export interface ThemeInput {
    primary: string
    accent: string
    bg: string
    text: string
    autoShades: boolean
    overrides: Record<Mode, Tokens>
    /** 0 à 100 : 50 donne 8 / 16 / 32. */
    spaceScale: number
    radius: number
    shadow: 'soft' | 'strong'
    title: FontChoice | null
    body: FontChoice | null
    advanced: AdvancedInput
}

export const defaultInput: ThemeInput = {
    primary: '#6242f0',
    accent: '#f6bd60',
    bg: '#ffffff',
    text: '#1c1a33',
    autoShades: true,
    overrides: { light: {}, dark: {} },
    title: null,
    body: null,
    spaceScale: 50,
    radius: 12,
    shadow: 'soft',
    advanced: defaultAdvanced
}

const SYSTEM_STACK = 'system-ui, -apple-system, "Segoe UI", sans-serif'
const GENERIC: Record<string, string> = {
    'sans-serif': 'sans-serif',
    serif: 'serif',
    monospace: 'monospace',
    handwriting: 'cursive',
    display: 'sans-serif',
}
const fontStack = ({ family, category }: FontChoice) =>
    `"${family}", ${GENERIC[category] ?? 'sans-serif'}`

function shadows(preset: ThemeInput['shadow'], mode: Mode): Tokens {
    const dark = mode === 'dark'
    const c = dark ? '0, 0, 0' : '23, 23, 56'
    const layer = (offset: string, alpha: number) => `${offset} rgba(${c}, ${alpha})`

    if (preset === 'strong') {
        return {
            '--bd-shadow-1': layer('0 2px 0', dark ? 0.6 : 0.25),
            '--bd-shadow-2': layer('0 4px 0', dark ? 0.7 : 0.3),
            '--bd-shadow-3': layer('0 8px 0', dark ? 0.8 : 0.35),
        }
    }
    return dark
        ? {
            '--bd-shadow-1': `${layer('0 1px 2px', 0.4)}, ${layer('0 1px 3px', 0.3)}`,
            '--bd-shadow-2': `${layer('0 4px 8px', 0.4)}, ${layer('0 2px 4px', 0.3)}`,
            '--bd-shadow-3': `${layer('0 12px 24px', 0.5)}, ${layer('0 4px 8px', 0.35)}`,
        }
        : {
            '--bd-shadow-1': `${layer('0 1px 2px', 0.08)}, ${layer('0 1px 3px', 0.06)}`,
            '--bd-shadow-2': `${layer('0 4px 8px', 0.08)}, ${layer('0 2px 4px', 0.06)}`,
            '--bd-shadow-3': `${layer('0 12px 24px', 0.12)}, ${layer('0 4px 8px', 0.08)}`,
        }
}

function modeTokens(input: ThemeInput, mode: Mode): Tokens {
    const dark = mode === 'dark'
    const hue = hexToHsl(input.primary).h
    const sat = hexToHsl(input.primary).s

    const bg = dark ? hslToHex({ h: hue, s: 40, l: 10 }) : input.bg
    const text = dark ? hslToHex({ h: hue, s: 50, l: 94 }) : input.text
    const primary = dark ? ensureContrast(input.primary, bg, 4.5) : input.primary
    const accent = input.accent

    const primaryDark = dark
        ? hslToHex({ h: hue, s: 70, l: 93 })
        : hslToHex({ h: hue, s: Math.min(sat, 55), l: 15 })
    const surface = dark ? hslToHex({ h: hue, s: 36, l: 15 }) : mix(primary, bg, 0.03)
    const muted = ensureContrast(mix(text, bg, dark ? 0.68 : 0.72), bg, 4.5)
    const alertColor = (key: AlertKey, fallback: string) => input.advanced.alerts[mode][key] ?? fallback
    const tokens: Tokens = {
        '--bd-color-primary': primary,
        '--bd-color-primary-rgb': rgbString(primary),
        '--bd-color-primary-hover': adjustLightness(primary, dark ? 8 : -8),
        '--bd-color-primary-edge': adjustLightness(primary, dark ? -12 : -18),
        '--bd-color-on-primary': readableOn(primary, '#ffffff', dark ? bg : primaryDark),        '--bd-color-primary-dark': primaryDark,
        '--bd-color-primary-medium': mix(primary, bg, dark ? 0.3 : 0.45),
        '--bd-color-primary-light': mix(primary, bg, dark ? 0.2 : 0.08),
        '--bd-color-accent': accent,
        '--bd-color-accent-rgb': rgbString(accent),
        '--bd-color-on-accent': readableOn(accent, '#ffffff', '#2b1d03'),
        '--bd-color-accent-light': mix(accent, bg, dark ? 0.15 : 0.22),
        '--bd-color-bg': bg,
        '--bd-color-surface': surface,
        '--bd-color-text': text,
        '--bd-color-text-muted': muted,
        '--bd-color-border': mix(primary, bg, dark ? 0.2 : 0.12),
        '--bd-color-border-strong': ensureContrast(mix(text, bg, 0.45), bg, 3),
        '--bd-color-focus': ensureContrast(accent, bg, 3),
        '--bd-color-success': alertColor('success', dark ? '#4ade80' : '#15803d'),
        '--bd-color-error': alertColor('error', dark ? '#f87171' : '#b91c1c'),
        '--bd-color-warning': alertColor('warning', dark ? '#f6bd60' : '#b45309'),
        '--bd-color-info': alertColor('info', primary),
        '--bd-color-overlay': dark ? 'rgba(0, 0, 0, .6)' : 'rgba(23, 23, 56, .45)',
        ...shadows(input.shadow, mode),
    }

    if (!input.autoShades) Object.assign(tokens, input.overrides[mode])
    return tokens
}

function sharedTokens(input: ThemeInput): Tokens {
    const a = input.advanced
    const unit = Math.round(4 + (input.spaceScale / 100) * 8)
    const px = (n: number) => `${n}px`

    return {
        '--bd-font-title': input.title ? fontStack(input.title) : 'var(--bd-font-main)',
        '--bd-font-main': input.body ? fontStack(input.body) : SYSTEM_STACK,
        '--bd-font-size-sm': `${a.fontSm}rem`,
        '--bd-font-size-md': `${a.fontMd}rem`,
        '--bd-font-size-lg': `${a.fontLg}rem`,
        '--bd-space-sm': px(a.spaceSm ?? unit),
        '--bd-space-md': px(a.spaceMd ?? unit * 2),
        '--bd-space-lg': px(a.spaceLg ?? unit * 4),
        '--bd-radius-sm': px(a.radiusSm ?? Math.round(input.radius / 2)),
        '--bd-radius-md': px(input.radius),
        '--bd-radius-full': '999px',
        '--bd-control-height': px(a.controlHeight),
        '--bd-close-size': px(a.closeSize),
        '--bd-overlay-width': '448px',
        '--bd-border-width': px(a.borderWidth),
        '--bd-border-width-strong': px(a.borderStrong),
        '--bd-alert-stripe-width': px(a.stripeWidth),
        '--bd-focus-ring-width': px(a.focusWidth),
        '--bd-focus-ring-offset': px(a.focusOffset),
        '--bd-button-edge': px(a.buttonEdge),
        '--bd-z-modal': '1000',
        '--bd-z-alert': '1100',
        '--bd-transition-fast': '.15s ease',
        '--bd-transition-base': '.25s ease',
    }
}

export function generateTheme(input: ThemeInput) {
    return {
        shared: sharedTokens(input),
        modes: { light: modeTokens(input, 'light'), dark: modeTokens(input, 'dark') },
    }
}