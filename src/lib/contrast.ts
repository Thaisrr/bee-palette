export type TextSize = 'normal' | 'large'
export type Level = 'AAA' | 'AA' | 'fail'

/** Large = 24px et plus, ou 18.66px et plus en gras. */
export function wcagLevel(ratio: number, size: TextSize = 'normal'): Level {
    const aa = size === 'large' ? 3 : 4.5
    const aaa = size === 'large' ? 4.5 : 7
    if (ratio >= aaa) return 'AAA'
    if (ratio >= aa) return 'AA'
    return 'fail'
}

export const formatRatio = (ratio: number, locale: string) =>
    `${new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(ratio)}:1`