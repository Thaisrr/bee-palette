<div align="center">

# 🐝 BeePalette

**Génère le thème de ton site en quelques clics, et exporte-le en CSS prêt à l'emploi.**

[Accéder au site](https://thaisrr.github.io/bee-palette/)

Couleurs, typographies, espacements, modes clair et sombre, contrôle d'accessibilité WCAG.
Construit pour [Beedesign](https://www.npmjs.com/package/@thaisrr/beedesign), utilisable aussi comme point de départ pour n'importe quel projet.

![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646cff?logo=vite&logoColor=white)
![WCAG](https://img.shields.io/badge/WCAG-AA%20%2F%20AAA-2e7d32)

</div>

---

## Sommaire

- [À quoi ça sert](#à-quoi-ça-sert)
- [Fonctionnalités](#fonctionnalités)
- [Démarrage rapide](#démarrage-rapide)
- [Configuration](#configuration)
- [Utiliser le CSS exporté](#utiliser-le-css-exporté)
- [Scripts](#scripts)
- [Architecture](#architecture)
- [Choix de conception](#choix-de-conception)
- [Contribuer](#contribuer)
- [Licence](#licence)

## À quoi ça sert

BeePalette est un site statique qui génère un thème sous forme de variables CSS (préfixées `--bd-`) pour la librairie **Beedesign**.

Tu règles tes couleurs, tes polices et tes espacements à gauche, tu vois le résultat en direct au centre sur une maquette et sur les vrais composants, tu vérifies l'accessibilité à droite, puis tu exportes.

## Fonctionnalités

**Réglages (panneau de gauche)**

- Couleurs principale, d'accent, de fond et de texte
- Nuances calculées automatiquement, ou éditables une par une
- Typographies de titre et de corps, choisies parmi les polices **Google Fonts**
- Échelle d'espacement, rayon des bordures, ombres
- Section **Avancé** : espacements, bordures, focus, hauteur des contrôles, tailles de texte, couleurs des alertes

**Aperçu en direct (centre)**

- Onglet **Maquette** : un faux site complet (navbar, hero, cartes, footer, toast)
- Onglet **Composants** : `BeeButton`, `BeeTag`, `BeeCard`, `BeeAlert`, `BeeFlex`, `BeeGrid`
- Survole une ligne de la répartition des surfaces pour surligner les zones concernées dans l'aperçu

**Analyse (panneau de droite)**

- Contrastes **WCAG** (AA / AAA) pour le texte, avec prise en compte de la taille
- Contrastes des éléments d'interface (3:1), dont les couleurs d'alerte
- Répartition des surfaces façon règle **60-30-10**
- Export CSS avec aperçu, copie dans le presse-papiers et téléchargement

**Général**

- Mode clair et mode sombre générés ensemble
- Interface en **français** et en **anglais**
- Chaque panneau latéral scrolle indépendamment, le centre reste toujours visible

## Démarrage rapide

Prérequis : Node.js 20 ou plus récent.

```bash
git clone https://github.com/Thaisrr/bee-palette.git
cd bee-palette
npm install
npm run dev
```

L'application est alors disponible sur [http://localhost:5173](http://localhost:5173).

> La copie dans le presse-papiers nécessite un contexte sécurisé : `localhost` ou `https`.

## Configuration

La liste des polices vient de l'API Google Fonts. Il te faut donc une clé API.

1. Crée une clé sur la [Google Cloud Console](https://console.cloud.google.com/) et active **Web Fonts Developer API**.
2. Crée un fichier `.env.local` à la racine du projet :

```bash
VITE_GOOGLE_FONTS_API_KEY=ta_cle_ici
```

Sans clé, l'application fonctionne mais le sélecteur de polices affiche un message d'erreur explicite. La liste des polices est mise en cache dans le `localStorage` pour limiter les appels.

> Cette clé est embarquée dans le code client. Restreins-la par référent HTTP dans la console Google.

## Utiliser le CSS exporté

BeePalette propose deux formats d'export.

| Format | Contenu | Quand l'utiliser |
| --- | --- | --- |
| **Pour Beedesign** | Uniquement les variables qui diffèrent des valeurs par défaut de la librairie | Tu utilises déjà Beedesign. Le fichier est le plus léger possible. |
| **CSS de départ** | Toutes les variables, un reset et une base de styles | Tu démarres un projet de zéro. |

Un thème très proche des valeurs par défaut donne donc un fichier très court.

### Avec Beedesign

```ts
// main.ts
import '@thaisrr/beedesign/style.css'
import './theme.css' // le fichier exporté par BeePalette
```

Importe le thème **après** la feuille de style de la librairie pour que tes variables prennent le dessus.

### Mode sombre

Les variables du mode sombre sont incluses dans l'export. Consulte les commentaires du fichier généré pour voir comment l'activer dans ton projet.

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Vérification des types puis build de production |
| `npm run preview` | Prévisualise le build de production |

## Architecture

```text
src/
├── components/
│   ├── layout/      # AppHeader
│   ├── settings/    # Panneau de gauche (couleurs, typo, avancé...)
│   ├── analysis/    # Panneau de droite (contrastes, surfaces, export)
│   ├── preview/     # Maquette et showcase des composants
│   └── ui/          # Petits composants génériques (ColorField, SliderField...)
├── composables/     # useTheme, useGoogleFonts, useClipboard, usePreviewHighlight
├── lib/             # Logique pure : color, contrast, theme, exportCss, surfaces
├── services/        # googleFonts (API + cache), fontLoader
├── i18n/            # vue-i18n, locales fr.json et en.json
└── App.vue
```

Le cœur du projet est `lib/theme.ts` : `generateTheme(input)` transforme les réglages en tokens CSS pour les deux modes. `lib/exportCss.ts` compare ensuite ces tokens aux valeurs par défaut de Beedesign pour ne garder que les différences.

## Choix de conception

- **Composants "dumb"** : les composants parents gèrent l'état et l'i18n. Les petits composants reçoivent tout par props, `v-model` et événements, sans connaître le thème ni la langue.
- **Logique hors de Vue** : calculs de couleur, contraste et génération du thème sont des fonctions pures, faciles à tester.
- **Aperçu isolé** : les tokens sont appliqués en style inline sur le conteneur de l'aperçu, sans toucher à l'interface de l'application.
- **Accessibilité** : la couleur de texte sur la couleur principale est ajustée automatiquement pour atteindre un contraste suffisant, y compris en mode sombre.

## Stack

- [Vue 3](https://vuejs.org/) (`<script setup>`, TypeScript strict)
- [Vite](https://vite.dev/)
- [Beedesign](https://www.npmjs.com/package/@thaisrr/beedesign) pour la structure de l'interface
- [vue-i18n](https://vue-i18n.intlify.dev/) pour le multilingue
- [Abra.js](https://www.npmjs.com/package/abra.js) pour les requêtes vers l'API Google Fonts

## Contribuer

Les idées et retours sont les bienvenus : ouvre une issue pour en discuter avant une grosse modification.

1. Fork le dépôt
2. Crée une branche : `git checkout -b feature/ma-fonctionnalite`
3. Vérifie que `npm run build` passe
4. Ouvre une pull request

## Licence

À COMPLÉTER MIT.

---

<div align="center">

Fait avec 🐝 par [Thaïs](www.thaislaboure.dev)

</div>