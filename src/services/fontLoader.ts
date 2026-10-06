const LINK_ID = 'beepalette-preview-fonts'

/** Injecte (ou retire) la feuille Google Fonts utilisée par l'aperçu. */
export function setPageFonts(url: string | null) {
    let link = document.getElementById(LINK_ID) as HTMLLinkElement | null
    if (!url) {
        link?.remove()
        return
    }
    if (!link) {
        link = document.createElement('link')
        link.id = LINK_ID
        link.rel = 'stylesheet'
        document.head.appendChild(link)
    }
    if (link.getAttribute('href') !== url) link.setAttribute('href', url)
}