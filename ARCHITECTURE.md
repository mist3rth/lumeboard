# ARCHITECTURE : LUMEBOARD - Plateforme de Snowboard Premium

Ce document détaille la structure technique et les choix d'architecture logicielle du projet Lumeboard.

---

## 📂 1. Organisation des Fichiers (Clean Architecture S2P)

Le projet utilise une architecture modulaire et atomique conçue pour séparer les responsabilités et assurer une maintenance aisée.

```text
lumeboard/
├── PRD.md                 # Spécifications fonctionnelles et règles techniques
├── ARCHITECTURE.md        # Ce document (guide de la structure globale)
├── TODO.md                # Suivi de l'avancement des tâches et stories
├── public/                # Assets statiques globaux (board.webp, audios, vidéos)
├── src/
│   ├── main.tsx           # Point d'entrée de l'application React
│   ├── App.tsx            # Orchestrateur central des sections et modales
│   ├── index.css          # Design Tokens, variables CSS et styles globaux
│   ├── components/
│   │   ├── ErrorBoundary.tsx # Barrière de sécurité pour les erreurs d'exécution
│   │   ├── SEO.tsx          # Gestionnaire de balises méta et de JSON-LD structuré
│   │   ├── sections/      # Sections de la page d'accueil à défilement fluide
│   │   │   ├── Navbar.tsx
│   │   │   ├── Section00Hero.tsx
│   │   │   ├── Section01Problem.tsx
│   │   │   ├── Section02Revelation.tsx # Section d'interaction avec le snowboard
│   │   │   ├── Section03TechDetails.tsx
│   │   │   ├── Section04NightRide.tsx
│   │   │   ├── Section05MobileApp.tsx
│   │   │   ├── Section06Riders.tsx
│   │   │   ├── Section07ProductRange.tsx
│   │   │   ├── Section08FinalCTA.tsx
│   │   │   └── Section09Footer.tsx
│   │   ├── modals/        # Fenêtres modales contextuelles
│   │   │   ├── PreorderModal.tsx
│   │   │   └── ContactModal.tsx
│   │   └── ui/            # Composants atomiques réutilisables (Design System)
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Textarea.tsx
│   │       └── Modal.tsx
│   ├── contexts/          # Gestionnaires d'état globaux (Context API)
│   │   ├── AudioContext.tsx # Gestion de l'univers sonore ambient
│   │   └── ModalContext.tsx # Gestion de l'état d'ouverture des formulaires
│   └── utils/
│       └── logger.ts      # Logger de débogage pour les environnements de dev
```

---

## 🎨 2. Design System & Theming (Tailwind CSS v4)

Lumeboard s'appuie sur un système de design sombre ("Midnight") rehaussé par des couleurs fluorescentes simulant des effets de lumières LED.

### A. Design Tokens principaux (`src/index.css`)
- **Police Display** : `Bebas Neue` — Idéal pour des titres massifs, imposants et typés glisse.
- **Police Tech & UI** : `Readex Pro` & `Inter` — Alliant lisibilité claire et modernité high-tech.
- **Palette LED** :
  - Led Cyan : `#00F5FF`
  - Led Violet : `#8B00FF`
  - Led Rose : `#FF006E`
  - Led Bleu : `#0066FF`
  - Led Green : `#00FF88`

### B. Classes d'éclat lumineux (Neon Glows)
Des classes d'effet de lueur sont définies (`.text-glow-cyan`, `.text-glow-violet`, etc.) en utilisant la propriété `text-shadow` et `drop-shadow` de CSS pour imiter la diffraction de la lumière nocturne sur la neige.

### C. Architecture du Reveal Footer & Vidéo d'Ambiance
- **Composant Reveal** : Le footer est conçu en `sticky bottom-0 z-0` afin de rester ancré en bas de la fenêtre pendant le scroll de la section précédente.
- **Superposition opaque** : La section `Section08FinalCTA` est positionnée en `relative z-10 bg-black` avec une ombre portée (`shadow`) qui masque le footer. Quand le défilement dépasse cette section, le footer apparaît comme "dévoilé" par le mouvement de remontée du reste du site.
- **Rendu Vidéo Ultra-Fluide** : La vidéo `footer.webm` est jouée en boucle silencieuse et infinie. Un masque de gradient de fondu au noir garantit que les bords de la vidéo ne créent aucune cassure de couleur ou de contraste.

---

## ⚙️ 3. Gestion de l'État Local et Global

### A. Contextes Globaux (Context API)
1. **`AudioContext`** : Permet le chargement asynchrone et le contrôle d'état (lecture/pause, volume) de la bande sonore ambient de montagne (`public/ambient_wind.mp3`). Il expose un interrupteur réutilisable n'importe où dans le layout.
2. **`ModalContext`** : Gère l'ouverture des modales (`Preorder` et `Contact`) de façon globale. Il permet à n'importe quel bouton de précommande de la page d'activer la modale de paiement avec le bon modèle pré-rempli.

### B. États Locaux Clés (`Section02Revelation`)
- **`activeColor`** (HSL string) : Alimenté dynamiquement par le slider chromatique en temps réel.
- **`activeFeature`** (number | null) : Détermine quel hotspot technique est survolé ou cliqué, changeant dynamiquement l'état lumineux et les détails affichés sur la planche.

---

## ♿ 4. Normes Accessibilité (A11Y) & SEO

### A. SEO & Métadonnées
Le composant `<SEO />` met à jour de façon dynamique le titre et la meta-description de la page au chargement de l'application. Il injecte de manière automatisée une balise structurée JSON-LD au format `Product` avec l'état `AggregateOffer` pour un référencement optimal.

### B. Accessibilité Clavier (WCAG AA)
- Les boutons interactifs d'illustration (comme les hotspots ou le slider de couleur) disposent de styles de focus et d'une prise en charge clavier complète.
- L'utilisation de balises HTML5 sémantiques assure une parfaite compatibilité avec les technologies d'assistance et lecteurs d'écran.
