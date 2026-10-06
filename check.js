import { readFileSync } from 'node:fs'

const read = (name) =>
    JSON.parse(readFileSync(new URL(`./src/i18n/locale/${name}.json`, import.meta.url), 'utf8'))

const keys = (obj, prefix = '') =>
    Object.entries(obj).flatMap(([key, value]) =>
        typeof value === 'object' && value !== null
            ? keys(value, `${prefix}${key}.`)
            : [`${prefix}${key}`],
    )

const fr = keys(read('fr'))
const en = keys(read('en'))

console.log('Dans fr.json mais pas dans en.json :', fr.filter((k) => !en.includes(k)))
console.log('Dans en.json mais pas dans fr.json :', en.filter((k) => !fr.includes(k)))