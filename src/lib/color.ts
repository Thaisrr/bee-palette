export type RGB = { r: number; g: number; b: number }
export type HSL = { h: number; s: number; l: number }

export function normalizeHex(input: string): string | null {
    let v = input.trim().replace('#', '')
    if (/^[0-9a-f]{3}$/i.test(v)) v = v.split('').map((c) => c + c).join('')
    return /^[0-9a-f]{6}$/i.test(v) ? `#${v.toLowerCase()}` : null
}

export function hexToRgb(hex: string): RGB {
    const n = parseInt(hex.slice(1), 16)
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export function rgbToHex({ r, g, b }: RGB): string {
    return (
        '#' +
        [r, g, b]
            .map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0'))
            .join('')
    )
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
    const rn = r / 255, gn = g / 255, bn = b / 255
    const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
    const l = (max + min) / 2
    const d = max - min
    if (d === 0) return { h: 0, s: 0, l: l * 100 }
    const s = d / (1 - Math.abs(2 * l - 1))
    let h: number
    if (max === rn) h = ((gn - bn) / d) % 6
    else if (max === gn) h = (bn - rn) / d + 2
    else h = (rn - gn) / d + 4
    h = (h * 60 + 360) % 360
    return { h, s: s * 100, l: l * 100 }
}

export function hslToRgb({ h, s, l }: HSL): RGB {
    const hh = ((h % 360) + 360) % 360
    const sn = s / 100, ln = l / 100
    const c = (1 - Math.abs(2 * ln - 1)) * sn
    const x = c * (1 - Math.abs(((hh / 60) % 2) - 1))
    const m = ln - c / 2
    let r = 0, g = 0, b = 0
    if (hh < 60) [r, g, b] = [c, x, 0]
    else if (hh < 120) [r, g, b] = [x, c, 0]
    else if (hh < 180) [r, g, b] = [0, c, x]
    else if (hh < 240) [r, g, b] = [0, x, c]
    else if (hh < 300) [r, g, b] = [x, 0, c]
    else [r, g, b] = [c, 0, x]
    return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 }
}

export const hslToHex = (hsl: HSL) => rgbToHex(hslToRgb(hsl))
export const hexToHsl = (hex: string) => rgbToHsl(hexToRgb(hex))
export const rgbString = (hex: string) => {
    const { r, g, b } = hexToRgb(hex)
    return `${r}, ${g}, ${b}`
}

export function adjustLightness(hex: string, delta: number): string {
    const hsl = hexToHsl(hex)
    return hslToHex({ ...hsl, l: Math.max(0, Math.min(100, hsl.l + delta)) })
}

/** Mélange : weightA = part de la couleur a (0 à 1). */
export function mix(a: string, b: string, weightA: number): string {
    const ca = hexToRgb(a), cb = hexToRgb(b)
    return rgbToHex({
        r: ca.r * weightA + cb.r * (1 - weightA),
        g: ca.g * weightA + cb.g * (1 - weightA),
        b: ca.b * weightA + cb.b * (1 - weightA),
    })
}

const channel = (v: number): number => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export function luminance(hex: string): number {
    const { r, g, b } = hexToRgb(hex)
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export function contrastRatio(a: string, b: string): number {
    const la = luminance(a), lb = luminance(b)
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

export function readableOn(bg: string, light: string, dark: string): string {
    return contrastRatio(bg, light) >= contrastRatio(bg, dark) ? light : dark
}

/** Assombrit ou éclaircit `color` (selon le fond) jusqu'à atteindre le ratio minimum. */
export function ensureContrast(color: string, against: string, min: number): string {
    const darken = contrastRatio(against, '#000000') > contrastRatio(against, '#ffffff')
    let out = color
    for (let i = 0; i < 50 && contrastRatio(out, against) < min; i++) {
        out = adjustLightness(out, darken ? -2 : 2)
    }
    return out
}