# TODO : Suivi d'Implémentation LUMEBOARD

## 🛠️ Phase 1 : Fondations & Architecture (BMAD)
- [x] Création des documents directeurs `PRD.md` et `ARCHITECTURE.md`.
- [x] Découpage du projet en modules propres (`src/components/sections`, `src/components/ui`, `src/contexts`).
- [x] Mise en place des structures d'état global (`ModalContext`, `AudioContext`).

## 🎨 Phase 2 : Révélation & Innovation de la Planche Officielle (`board.webp`)
- [x] Importation de la planche officielle sous le nom `board.webp` dans le dossier `/public`.
- [x] Ajustement visuel de l'image dans `Section02Revelation.tsx` (centrage, ombres portées HSL réactives).
- [x] Intégration du tracé courbe réactif (les néons épousent parfaitement les contours de la planche).
- [x] Correction du clipping et du carré noir de lueur (mise en place du backglow z-0 volumétrique sans clipping).
- [x] Résolution de la rupture de dégradé supérieure/inférieure (mise en place du Visual Board Wrapper z-20 et padding py-8).
- [x] Optimisation de la performance de rendu de l'image.
- [x] Renommer la section en `"SECTION 02 — L'innovation"` et corriger le sous-titre sans tiret.
- [x] Alignement vertical des 3 blocs de features en haut de la grille (`items-start`).
- [x] Ajouter un effet de "roll over" (hover spring tactile et changement de couleur de bordure) sur les cartes de feature.
- [x] Créer une transition de clic premium sans saut de hauteur (utilisation de `<AnimatePresence>` et `layout` Motion).
- [x] Synchroniser le clic sur une feature avec la couleur chromatique de la planche (Vert, Rose, Bleu).

## ♿ Phase 3 : Accessibilité (A11Y) & Clavier (WCAG AA)
- [x] Revue des styles de focus (`outline`, `ring`) sur tous les éléments interactifs (boutons, cartes de snowboard, hotspots, slider).
- [x] Support clavier complet : navigation par `Tab` et déclenchement par `Space`/`Enter` sur les hotspots interactifs et le slider chromatique.
- [x] Ajout d'attributs `aria-*` descriptifs pour les lecteurs d'écran.

## ⚡ Phase 4 : SEO & Performance
- [x] Validation de la hiérarchie sémantique HTML5 (un seul `<h1>`, des `<section>` bien étiquetées).
- [x] Vérification des données structurées JSON-LD générées par le composant `SEO.tsx`.
- [x] Lancement du build de production et validation de l'absence d'erreurs TypeScript.

## 🏔️ Phase 5 : Footer Reveal & Vidéo d'Ambiance
- [x] Ajouter de l'espace de respiration (`pb-64 md:pb-80` ou similaire) en bas du container du footer.
- [x] Intégrer la vidéo en boucle `footer.webm` au bas du footer avec des masques de dégradés noirs et du blending.
- [x] Configurer la Section 08 avec un `z-index` supérieur et une ombre pour masquer le footer.
- [x] Ajuster le positionnement du footer en `sticky bottom-0 z-0` pour l'effet de reveal au scroll.

## 🏂 Phase 6 : Refonte Section 06 (Riders) - Sticky Scroll Horizontal & Fiches HUD
- [x] Concevoir et générer les 3 visuels de riders premium de nuit via l'IA (`rider_lucas`, `rider_ines`, `rider_theo`).
- [x] Restructurer `Section06Riders.tsx` avec un parent de hauteur de scroll (`h-[200vh]`) et un conteneur `sticky top-0 h-screen`.
- [x] Connecter le défilement horizontal (`x`) des cartes au scroll vertical via `useScroll` et `useTransform` de Framer Motion.
- [x] Créer le design des cartes avec HUD (specs techniques, lumens, planches utilisées, portrait en fond).
- [x] Gérer l'adaptation mobile fluide (les cartes se lisent verticalement ou glissent proprement au toucher).
- [x] Valider la compilation complète avec `npm run build`.

## 📱 Phase 7 : Carrousels Mobiles (Sections 02 & 05)
- [x] Section 05 : Remplacement de la grille 2 colonnes par un conteneur flex horizontal scrollable sur mobile avec synchronisation bidirectionnelle.
- [x] Section 02 : Remplacement de la liste verticale par un conteneur flex horizontal scrollable sur mobile avec synchronisation bidirectionnelle (changement de couleur et de lueur du snowboard en swipant/cliquant).

## ⚡ Phase 8 : Optimisation du Cache (Service Worker)
- [x] Création des spécifications techniques de performance dans `PRD.md` et `ARCHITECTURE.md`.
- [/] Implémentation du Service Worker dans `public/sw.js` (stratégie Cache-First pour médias/polices, Stale-While-Revalidate pour JS/CSS).
- [ ] Enregistrement du Service Worker dans `src/main.tsx`.
- [ ] Validation de la compilation du build de production et du fonctionnement.



