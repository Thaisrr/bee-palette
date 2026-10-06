import { ref } from 'vue'
import { fetchFonts, MissingApiKeyError, type GoogleFont } from '@/services/googleFont'

const fonts = ref<GoogleFont[]>([])
const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const errorCode = ref<'missingKey' | 'network' | null>(null)

async function load() {
    if (status.value === 'loading' || status.value === 'ready') return
    status.value = 'loading'
    errorCode.value = null
    try {
        fonts.value = await fetchFonts()
        status.value = 'ready'
    } catch (e) {
        errorCode.value = e instanceof MissingApiKeyError ? 'missingKey' : 'network'
        status.value = 'error'
    }
}

export function useGoogleFonts() {
    return { fonts, status, errorCode, load }
}