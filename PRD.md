# PRD : LUMEBOARD - Plateforme de Snowboard Premium Haute Performance

## 🎯 1. Vision du Produit
LUMEBOARD est la révolution du snowboard nocturne : une planche haut de gamme combinant des technologies composites de pointe avec un système d'éclairage chromatique LED breveté et intégré sous résine, contrôlable par application mobile Bluetooth. 
L'objectif du site web est de créer une expérience immersive premium "Wow" à fort taux de conversion pour le lancement des précommandes des modèles 2026.

---

## 🛠️ 2. Spécifications Fonctionnelles

### F01 : Expérience Immersive et Univers Sonore
- **Bande-son d'ambiance nocturne** : Intégration d'un fond sonore de glisse en haute montagne la nuit (`ambient_wind.mp3`), activable/désactivable via un bouton pill flottant en bas à droite (`sound-immersion-pill`).
- **Aesthetic Premium Dark Mode** : Fond noir pur (`#000000`), typographies soignées (`Bebas Neue` pour les titres, `Readex Pro` pour la technique, `Inter` pour la lecture), lueurs néon vibrantes basées sur les couleurs LED réelles.

### F02 : Section Innovation Interactive (Section 02)
- **Titre & Label** : Nommé `"SECTION 02 — L'innovation"` avec pour sous-titre `"Du bord à la fixation, la lumière fait partie de la ride."` (sans tiret, avec une virgule).
- **Positionnement vertical** : Les 3 blocs de fonctionnalités de gauche sont alignés sur le haut du mockup de la planche (alignement `items-start` sur la grille) pour une esthétique équilibrée.
- **Roll over (Hover) tactile** : Effet de glissement latéral dynamique (`x: 6`) amorti par un ressort physique (spring physics) et illumination de la bordure assortie à la couleur signature de la feature au survol.
- **Transition de Clic Premium (Zéro Saut)** : Animation fluide de l'état sélectionné via `layout` Motion et transition d'accordéon (`height` auto, `opacity`) gérée par `<AnimatePresence>` pour éviter toute saccade ou saut de hauteur ("saut" de mise en page).
- **Bordure Électrique de Turbulence (Wow Effect)** : Lorsqu'un bloc est actif, application d'une double bordure électrique vibrante et organique sur les contours de la carte, utilisant un filtre SVG de déplacement par bruit fractal (`feTurbulence` et `feDisplacementMap` optimisés à 4 octaves pour d'excellentes performances CPU/GPU à 60fps) assorti à la couleur signature de la feature.
- **Rétroéclairage Néon Volumétrique (Underglow/Backglow)** : Émanation d'un halo de lumière diffuse et respirante sous la carte active (`absolute -inset-12 z-0` pulsant en échelle et opacité, utilisant un dégradé radial et un flou de 35px), se projetant sur le fond noir du site pour un effet de flottaison technologique en sustentation.
- **Changement de teinte réactif** : Cliquer sur une fonctionnalité change automatiquement la teinte chromatique active (`activeColor` et `sliderHue`) pour correspondre instantanément à la couleur signature de la feature (Vert, Rose, Bleu).
- **Snowboard 3D Interactive Mockup** : Visualisation haut de gamme de la planche (utilisant l'image officielle `board.webp` placée dans `public/board.webp`).
- **Contrôleur de Couleur Chromatique** : Un slider de teinte HSL fluide permettant au client de changer dynamiquement la couleur des rails LED gauches/droites (`#led-rail-left` et `#led-rail-right`) et de projeter le halo lumineux sur l'environnement de la planche.
- **Hotspots de Technologie Interactifs** : 
  1. *LED intégrées dans les carres* : Mise en valeur des carres lumineuses.
  2. *Batteries dans les fixations* : Indicateurs visuels des batteries (B1, B2) intégrées dans le deck de fixation avec étiquettes dynamiques.
  3. *Contrôle via application* : Indicateur de puce Bluetooth 5.0 à impulsions lumineuses.

### F03 : Gamme de Produits Interactive (Section 07)
- Présentation de la gamme de snowboards avec 3 modèles distincts moulés aux Alpes :
  1. **LUMEBOARD SHADOW (Freestyle)** - Violet & Cyan (649€)
  2. **LUMEBOARD APEX (All-Mountain)** - Blanc & Bleu électrique (749€)
  3. **LUMEBOARD AURORA (Freeride)** - Rose & Or (849€)
- **Glow & Hover Effects** : Effet de survol premium avec des ombres portées assorties à la couleur LED signature du modèle.
- **CTA Direct vers la Précommande** : Bouton rapide de précommande ouvrant la modale avec le modèle pré-rempli.

### F04 : Système de Réservation & Modales
- **PreorderModal** : Formulaire complet de précommande avec sélection de taille, modèle et validation d'e-mail avec gestion des succès et des erreurs.
- **ContactModal** : Formulaire de contact pour les questions techniques et de sponsoring.

### F05 : Footer Interactif & Reveal
- **Effet Reveal au Scroll** : Le footer est positionné en arrière-plan collant (`sticky bottom-0`) sous la section 08 (Final CTA). La section 08 a une priorité d'affichage plus élevée (`z-index` supérieur) et une ombre prononcée, dévoilant progressivement le footer lors du défilement.
- **Vidéo d'arrière-plan `footer.webm`** : Intégration de la vidéo `footer.webm` en bas du footer, recouverte de masques de dégradés pour se fondre harmonieusement dans le fond sombre.
- **Espace de respiration** : Espacement accru au bas du container du footer pour accueillir esthétiquement la vidéo et aérer les crédits finaux.

---

## 📈 3. Contraintes Techniques & Règles d'Or (BMAD)

### A. Intégrité Visuelle
- Les couleurs, les espacements originaux et les micro-animations (Framer Motion / Tailwind) doivent être conservés.
- L'image officielle `board.webp` doit être parfaitement centrée, redimensionnée de manière réactive et optimisée avec des ombres de couleur assorties (`drop-shadow` dynamique).

### B. Accessibilité (A11Y) - Conforme WCAG AA
- Sémantique HTML5 propre (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Navigation clavier totale : tous les boutons/inputs interactifs doivent avoir des styles de focus visibles et être activables à la touche `Tab` + `Enter`/`Space`.
- Attributs `aria-label` et `title` sur les boutons à icône seule (ex: toggle de musique, boutons de fermeture des modales).

### C. Performance & SEO
- Optimisation des formats d'image : utilisation de `board.webp` (WebP léger) pour un chargement rapide.
- Hiérarchie saine des balises de titres (un unique `<h1>` sur la page Hero, `<h2>` pour chaque section successive).
- Balises méta SEO complètes et données structurées JSON-LD intégrées pour optimiser l'indexation sur les moteurs de recherche.

---

## ✅ 4. Critères d'Acceptation & Validation
1. L'image `board.webp` s'affiche correctement sur ordinateur et mobile dans la section Révélation.
2. Le slider de couleur HSL met à jour instantanément la couleur et le halo de `board.webp` sans décalage.
3. Le site web compile correctement avec `npm run build` sans erreur TypeScript.
4. Le site est entièrement accessible au clavier.
5. La structure sémantique SEO est 100 % valide.
