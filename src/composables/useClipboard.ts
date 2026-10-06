import { onBeforeUnmount, ref } from 'vue'

export type CopyStatus = 'idle' | 'copied' | 'failed'

export function useClipboard(resetAfter = 2500) {
    const status = ref<CopyStatus>('idle')
    let timer: ReturnType<typeof setTimeout> | undefined

    async function copy(text: string) {
        try {
            await navigator.clipboard.writeText(text)
            status.value = 'copied'
        } catch {
            // contexte non sécurisé (hors https et localhost) ou permission refusée
            status.value = 'failed'
        }
        clearTimeout(timer)
        timer = setTimeout(() => {
            status.value = 'idle'
        }, resetAfter)
    }

    onBeforeUnmount(() => clearTimeout(timer))

    return { status, copy }
}