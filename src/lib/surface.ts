export type SurfaceRole =
    | 'bg' | 'surface' | 'text' | 'muted'
    | 'primary' | 'primaryLight' | 'border' | 'accent'

/** Ordre d'affichage. Les poids sont des parts (sur 100) d'une page type. */
export const SURFACES: { role: SurfaceRole; token: string; weight: number }[] = [
    { role: 'bg', token: '--bd-color-bg', weight: 46 },
    { role: 'surface', token: '--bd-color-surface', weight: 14 },
    { role: 'text', token: '--bd-color-text', weight: 10 },
    { role: 'muted', token: '--bd-color-text-muted', weight: 6 },
    { role: 'primary', token: '--bd-color-primary', weight: 7 },
    { role: 'primaryLight', token: '--bd-color-primary-light', weight: 10 },
    { role: 'border', token: '--bd-color-border', weight: 4 },
    { role: 'accent', token: '--bd-color-accent', weight: 3 },
]

/** Règle 60-30-10 : dominante, secondaire, accent. */
export const SURFACE_GROUPS: { id: 'dominant' | 'secondary' | 'accent'; roles: SurfaceRole[] }[] = [
    { id: 'dominant', roles: ['bg', 'surface'] },
    { id: 'secondary', roles: ['text', 'muted', 'primaryLight', 'border'] },
    { id: 'accent', roles: ['primary', 'accent'] },
]