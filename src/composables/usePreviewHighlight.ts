import { ref } from 'vue'
import type { SurfaceRole } from '../lib/surface'

const highlight = ref<SurfaceRole | null>(null)

export function usePreviewHighlight() {
    return { highlight }
}