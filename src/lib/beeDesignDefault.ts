import libCss from '@thaisrr/beedesign/style.css?raw'
import type { Tokens } from './theme'

function parse(body: string): Tokens {
    const out: Tokens = {}
    for (const decl of body.split(';')) {
        const i = decl.indexOf(':')
        if (i === -1) continue
        const key = decl.slice(0, i).trim()
        if (key.startsWith('--')) out[key] = decl.slice(i + 1).trim()
    }
    return out
}

const rootMatch = /(?:^|\})\s*:root\s*\{([^}]*)\}/.exec(libCss)
const darkMatch = /\.dark\s*,\s*\[data-theme=["']?dark["']?\]\s*\{([^}]*)\}/.exec(libCss)

export const beedesignDefaults = {
    light: parse(rootMatch?.[1] ?? ''),
    dark: parse(darkMatch?.[1] ?? ''),
}

if (Object.keys(beedesignDefaults.light).length === 0) {
    console.warn('BeePalette : impossible de lire les variables par défaut de Beedesign')
}