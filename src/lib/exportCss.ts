import { beedesignDefaults } from './beeDesignDefault.ts'
import { defaultInput, generateTheme, type FontChoice, type ThemeInput, type Tokens } from './theme'

export interface CssComments {
    header: string
    noChanges: string
}
export type ExportKind = 'beedesign' | 'starter'


const DEFAULT_WEIGHTS = [400, 500, 700]
const DARK_SELECTOR = '.dark,\n[data-theme="dark"]'

export function googleFontsUrl(input: ThemeInput): string | null {
    const fonts = [input.title, input.body].filter((f): f is FontChoice => f !== null)
    if (fonts.length === 0) return null

    const byFamily = new Map<string, Set<number>>()
    for (const font of fonts) {
        const weights = byFamily.get(font.family) ?? new Set<number>()
        for (const w of font.weights ?? DEFAULT_WEIGHTS) weights.add(w)
        byFamily.set(font.family, weights)
    }

    const params = [...byFamily]
        .map(([family, weights]) => {
            const sorted = [...weights].sort((a, b) => a - b).join(';')
            return `family=${family.trim().replace(/\s+/g, '+')}:wght@${sorted}`
        })
        .join('&')

    return `https://fonts.googleapis.com/css2?${params}&display=swap`
}

const block = (selector: string, tokens: Tokens): string => {
    const lines = Object.entries(tokens).map(([key, value]) => `  ${key}: ${value};`)
    return `${selector} {\n${lines.join('\n')}\n}`
}

/** Compare sans tenir compte des espaces, de la casse ni de "0.08" contre ".08". */
const normalize = (v: string) =>
    v.trim().toLowerCase().replace(/\s+/g, ' ').replace(/\b0\.(\d)/g, '.$1')

const sameValue = (a: string | undefined, b: string | undefined) =>
    normalize(a ?? '') === normalize(b ?? '')

/**
 * Une couleur calculée qui ne dépend d'aucune couleur modifiée par l'utilisateur
 * reprend la valeur exacte de la lib (nos formules ne la reproduisent qu'à peu près).
 */
function snapToLib(tokens: Tokens, baseline: Tokens, ref: Tokens): Tokens {
    const out: Tokens = {}
    for (const [key, value] of Object.entries(tokens)) {
        const lib = ref[key]
        const untouched = key.startsWith('--bd-color-') && sameValue(value, baseline[key])
        out[key] = untouched && lib !== undefined ? lib : value
    }
    return out
}

const onlyDifferent = (tokens: Tokens, ref: Tokens): Tokens =>
    Object.fromEntries(Object.entries(tokens).filter(([k, v]) => !sameValue(v, ref[k])))

/** Les variables -rgb n'existent pas dans la lib : on les garde seulement avec leur couleur. */
const dropOrphanRgb = (tokens: Tokens): Tokens =>
    Object.fromEntries(
        Object.entries(tokens).filter(
            ([k]) => !k.endsWith('-rgb') || k.replace(/-rgb$/, '') in tokens,
        ),
    )

function beedesignDiff(input: ThemeInput): { light: Tokens; dark: Tokens } {
    const actual = generateTheme(input)
    const baseline = generateTheme({
        ...input,
        primary: defaultInput.primary,
        accent: defaultInput.accent,
        bg: defaultInput.bg,
        text: defaultInput.text,
        autoShades: true,
        overrides: defaultInput.overrides,
        advanced: { ...input.advanced, alerts: defaultInput.advanced.alerts },
    })

    const lightRef = beedesignDefaults.light
    // Valeurs réellement appliquées en mode sombre par la lib : :root puis surcharge .dark
    const darkRef = { ...lightRef, ...beedesignDefaults.dark }

    const light = dropOrphanRgb(
        onlyDifferent(
            snapToLib({ ...actual.shared, ...actual.modes.light }, baseline.modes.light, lightRef),
            lightRef,
        ),
    )

    const darkSnapped = snapToLib(actual.modes.dark, baseline.modes.dark, darkRef)
    // Si le :root change, on réécrit aussi la valeur sombre : notre :root passe après
    // celui de la lib et écraserait sinon son mode sombre.
    const dark = dropOrphanRgb(
        Object.fromEntries(
            Object.entries(darkSnapped).filter(([k, v]) => k in light || !sameValue(v, darkRef[k])),
        ),
    )

    return { light, dark }
}

const RESET = `*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  min-height: 100vh;
  background: var(--bd-color-bg);
  color: var(--bd-color-text);
  font-family: var(--bd-font-main);
  font-size: var(--bd-font-size-md);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--bd-font-title);
  line-height: 1.2;
}

a {
  color: var(--bd-color-primary);
}

a:hover {
  color: var(--bd-color-primary-hover);
}

:focus-visible {
  outline: var(--bd-focus-ring-width) solid var(--bd-color-focus);
  outline-offset: var(--bd-focus-ring-offset);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0s !important;
  }
}`

export function generateCss(input: ThemeInput, kind: ExportKind, comments: CssComments): string {
    const parts: string[] = [`/* ${comments.header} */`]

    // @import doit rester avant toute règle
    const fontsUrl = googleFontsUrl(input)
    if (fontsUrl) parts.push(`@import url("${fontsUrl}");`)

    if (kind === 'starter') {
        const { shared, modes } = generateTheme(input)
        parts.push(block(':root', { ...shared, ...modes.light }), block(DARK_SELECTOR, modes.dark), RESET)
    } else {
        const { light, dark } = beedesignDiff(input)
        const hasLight = Object.keys(light).length > 0
        const hasDark = Object.keys(dark).length > 0
        if (!hasLight && !hasDark) {
            parts.push(`/* ${comments.noChanges} */`)
        }
        if (hasLight) parts.push(block(':root', light))
        if (hasDark) parts.push(block(DARK_SELECTOR, dark))
    }

    return parts.join('\n\n') + '\n'
}