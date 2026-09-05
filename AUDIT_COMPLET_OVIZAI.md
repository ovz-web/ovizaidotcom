# 🏛️ AUDIT COMPLET OVIZAI — STRATÉGIE, CONVERSION & DESIGN VISUEL

Cet audit analyse le projet **OVIZai** sur deux axes complémentaires : **la logique stratégique (business & conversion)** et **le design visuel (UI/UX & technique)**.

---

## 📊 PARTIE 1 — LOGIQUE STRATÉGIQUE & TUNNEL DE CONVERSION

### 1. Tunnel d'acquisition B2B (Clients Marques & Artistes)
- **Point Fort** : La création du palier *Sprint Pilote 48-72h (490 € / $530)* sur la page `/tarifs` est un excellent levier de réduction de friction pour tester un nouveau client sans engagement.
- **Axe d'Amélioration** :
  - **Découvrabilité du Sprint Pilote sur la Home** : Sur la page d'accueil (`/`), le menu principal (commandes 01-04) mène vers `/services` et `/contact`. Un visiteur qui arrive sur la Home ne voit pas l'offre Sprint Pilote à 490 € immédiatement sauf s'il clique sur "Tarifs" dans le header.
  - **Recommandation** : Ajouter une mention explicite "Sprint Pilote 48h disponible à partir de 490 €" sous le bouton *Services +* de la Home, ou ajouter un badge "Offre Pilote 48h" dans le `CommandMenu`.

### 2. Tunnel de Vente B2C (Masterclass Vidéo IA — 290 €)
- **Point Fort** : Flux transactionnel Stripe Checkout (`/api/checkout`) propre, réactif et automatisé avec gestion des événements Webhook (`/api/webhooks/stripe`).
- **Axe d'Amélioration** :
  - **Preuve visuelle du contenu** : La page `/formation` décrit très bien le programme en 5 modules. Cependant, pour une formation à 290 €, le prospect a besoin de **voir** la qualité des projets qu'il saura réaliser à l'issue de la formation.
  - **Recommandation** : Ajouter un bloc "Rendu des élèves / Projets réalisés" ou un extrait vidéo teaser (30s) du workflow de génération visuelle 8K, d'animation et d'étalonnage cinéma.

### 3. Capture de Leads Froids (Newsletter & Workflows)
- **Point Fort** : Formulaire de capture élégant avec feedback visuel Toast et persistance localStorage.
- **Recommandation** : Offrir un *Lead Magnet* téléchargeable immédiatement (ex: *PDF "Les 10 Formules de Prompts Cinématographiques Secrets"* envoyé par mail via Resend) plutôt qu'une promesse générale de newsletter hebdomadaire.

---

## 🎨 PARTIE 2 — DESIGN VISUEL & EXPÉRIENCE UTILISATEUR (UI/UX)

### 1. Preuve Visuelle Cinématographique
- **Constat** : Le design "Dark Luxury" (fond `#080808`, accents or `#CAA243`, typo Syne / Mono / Inter, effets de grain argentique 35mm) est extrêmement propre et immersif.
- **Manque principal** : En tant que *Studio de Cinéma Génératif & Direction Artistique*, l'absence de **vidéos en démonstration directe (showreel / clips en boucle)** limite l'effet "Waouh" visuel.
- **Recommandation** :
  - Remplacer le logo fixe du Hero par un **Showreel vidéo silencieux en arrière-plan** ou intégrer un composant `ShowreelModal` / `VideoBackground` (boucle vidéo MP4/WebM 4K fluide).
  - Ajouter des aperçus visuels / GIFs haute qualité dans la grille des 5 prestations (`ServicesGrid`).

### 2. Ergonomie Mobile & Cibles Tactiles
- **TopBar Micro-Pill** : Sur les écrans mobiles très étroits (< 360px), la pill d'annonce Masterclass dans le header peut compacter le logo.
  - *Fix appliqué* : Masquer le sous-texte long sur très petit écran (`hidden xs:inline`).
- **Bouton Sticky Mobile "Devis Express"** :
  - Lors du scroll sur `/services` ou `/tarifs` sur smartphone, l'utilisateur perd de vue le bouton de conversion.
  - *Recommandation* : Ajouter une barre fixe en bas de l'écran mobile (`fixed bottom-0 left-0 right-0 z-40 p-3 sm:hidden`) avec un bouton unique *"Demander un devis (24h)"*.

---

## 🛠️ PARTIE 3 — RECOMMANDATIONS TECHNIQUES & SEO

### 1. Métadonnées OpenGraph Spécifiques par Page
- Les pages `/services`, `/contact`, `/stack` utilisent actuellement la fallback metadata du `layout.tsx`.
- **Recommandation** : Exporter un objet `metadata: Metadata` propre pour chaque route afin d'avoir des cartes de partage personnalisées sur LinkedIn, X et WhatsApp.

### 2. Performance & Optimisation Média
- Pour toute vidéo ou image ajoutée au site :
  - Utiliser les attributs `priority` pour les éléments du viewport initial.
  - Précharger le grain argentique `FilmGrain` via CSS pure plutôt que canvas si besoin d'économiser du CPU sur les mobiles anciens.

---

## 📋 RECAPITULATIF DES ACTIONS RECOMMANDÉES

| Prio | Domaine | Action Recommandée | Impact |
|---|---|---|---|
| 🔴 **P1** | Visuel | Ajouter un **Showreel vidéo en boucle (ou extraits visuels)** dans le Hero ou la page Services | **Fort** (Preuve de valeur visuelle) |
| 🔴 **P1** | Conversion | Ajouter un **CTA flottant sticky "Devis 24h"** en bas d'écran sur mobile | **Fort** (Conversion mobile) |
| 🟡 **P2** | Business | Mettre en avant le **Sprint Pilote (490€)** sur la page d'accueil | **Moyen-Fort** (Trafic froid) |
| 🟡 **P2** | Formation | Ajouter une démo / teaser vidéo du rendu de la Masterclass sur `/formation` | **Moyen** (Conversion Stripe) |
| 🟢 **P3** | SEO | Décliner `export const metadata` sur `/services`, `/contact` et `/stack` | **Moyen** (Partage social) |
