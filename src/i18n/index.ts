import { createI18n } from 'vue-i18n'
import fr from './locale/fr.json'
import en from './locale/en.json'

export type MessageSchema = typeof fr
export type Locale = 'fr' | 'en'

const STORAGE_KEY = 'beepalette:locale'

function detectLocale(): Locale {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'fr' || saved === 'en') return saved
    } catch {
        // stockage indisponible : on se rabat sur la langue du navigateur
    }
    return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

// Le générique oblige en.json à avoir exactement les mêmes clés que fr.json
export const i18n = createI18n<[MessageSchema], Locale>({
    legacy: false,
    locale: detectLocale(),
    fallbackLocale: 'en',
    messages: { fr, en },
})

document.documentElement.lang = i18n.global.locale.value

export function setLocale(next: Locale) {
    i18n.global.locale.value = next
    document.documentElement.lang = next
    try {
        localStorage.setItem(STORAGE_KEY, next)
    } catch {
        // ignoré
    }
}