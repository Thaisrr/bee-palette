import { Abra } from 'abra.js'
const abra = Abra.getInstance()

export class MissingApiKeyError extends Error {
    constructor() {
        super('Missing Google Fonts API key (VITE_GOOGLE_FONTS_API_KEY)')
    }
}

export interface GoogleFont {
    family: string
    category: string
    variants: string[]
}

interface ApiResponse {
    items: GoogleFont[]
}

const API_URL = 'https://www.googleapis.com/webfonts/v1/webfonts'
const CACHE_KEY = 'beepalette:google-fonts:v1'
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000

let memory: GoogleFont[] | null = null

function readCache(): GoogleFont[] | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (!raw) return null
        const { at, fonts } = JSON.parse(raw) as { at: number; fonts: GoogleFont[] }
        return Date.now() - at < CACHE_TTL ? fonts : null
    } catch {
        return null
    }
}

function writeCache(fonts: GoogleFont[]) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), fonts }))
    } catch {
        // quota dépassé ou stockage indisponible : on s'en passe
    }
}

export async function fetchFonts(): Promise<GoogleFont[]> {
    if (memory) return memory
    const cached = readCache()
    if (cached) return (memory = cached)

    const key = import.meta.env.VITE_GOOGLE_FONTS_API_KEY as string | undefined
    if (!key) throw new MissingApiKeyError();

    const { data } = await abra.get<ApiResponse>(API_URL, {
        params: { key, sort: 'popularity' },
        timeout: 15000,
    })

    if (!data) {
        return [];
    }
    // On ne garde que les champs utiles : la réponse complète est très lourde
    memory = data.items.map(({ family, category, variants }) => ({ family, category, variants }))
    writeCache(memory)
    return memory
}

/** Graisses droites (non italiques) proposées par la police. */
export function availableWeights(font: GoogleFont): number[] {
    return font.variants
        .filter((v) => !v.includes('italic'))
        .map((v) => (v === 'regular' ? 400 : Number.parseInt(v, 10)))
        .filter((n) => Number.isFinite(n))
        .sort((a, b) => a - b)
}

/** Garde les graisses voulues qui existent, sinon la première disponible. */
export function pickWeights(font: GoogleFont, wanted: number[] = [400, 500, 700]): number[] {
    const available = availableWeights(font)
    const picked = wanted.filter((w) => available.includes(w))
    if (picked.length > 0) return picked
    const first = available[0]
    return first !== undefined ? [first] : [400]
}