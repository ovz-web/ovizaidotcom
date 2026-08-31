# 🗺️ CARTOGRAPHIE TEXTUELLE ET ARCHITECTURE DE CONTENU : OVIZAI.COM

> [!NOTE]
> Inventaire exhaustif de l'intégralité des textes, titres, descriptifs, boutons, microcopies et modales présents sur le site OVIZai.

---

## 🏛️ 1. COMPOSANTS GLOBAUX & STRUCTURE PERMANENTE

### A. TopBar (`src/components/TopBar.tsx`)
- **Logo (Haut-gauche) :** Image `/logo.png` cliquable vers `/`.
- **Micro-pilule d'annonce (Centre) :** 
  - FR : `⚡ FORMATION VIDÉO IA — ACCÉDER +`
  - EN : `⚡ AI VIDEO MASTERCLASS — ACCESS +`
  - Redirection : `/formation`
- **Sélecteur Bilingue (Haut-droite) :**
  - Bouton pill : `FR` / `EN`
- **Menu Burger (3 barres) :**
  - Icône Lucide `<Menu />` déclenchant le drawer latéral droit.

### B. Drawer Latéral Droit (`src/components/TopBar.tsx`)
- **En-tête Drawer :** Logo OVIZai + Bouton de fermeture `<X />`.
- **Navigation Principale :**
  - `00. Accueil` (FR) / `00. Home` (EN) ➔ `/`
  - `01. Prestations & Services IA` (FR) / `01. AI Services` (EN) ➔ `/services`
  - `02. Formation Vidéo IA` (FR) / `02. AI Masterclass` (EN) ➔ `/formation`
  - `03. Devis & Contact` (FR) / `03. Contact & Quote` (EN) ➔ `/contact`
- **Sélecteur de Devise Segmenté :**
  - Label : `Devise de facturation :` (FR) / `Billing Currency:` (EN)
  - Boutons : `USD` | `EUR` | `CAD`
- **Sélecteur de Langue :**
  - Label : `Langue d’affichage :` (FR) / `Display Language:` (EN)
  - Action : `Changer en EN` / `Switch to FR`
- **Réseaux Sociaux :**
  - `Instagram` ➔ `https://instagram.com/ovizai.co` (`target="_blank" rel="noopener noreferrer"`)
  - `YouTube` ➔ `https://youtube.com/@ovizaidotcom` (`target="_blank" rel="noopener noreferrer"`)

### C. Footer (`src/components/Footer.tsx`)
- **Copyright :** `© 2026 OVIZai. Direction Artistique & Cinéma IA. Tous droits réservés.`
- **Liens Footer :**
  - Instagram : `@ovizai.co`
  - YouTube : `@ovizaidotcom`

---

## 🏠 2. PAGE D'ACCUEIL (`src/app/page.tsx`)

### A. Section Hero (`HeroBrutalist.tsx` / `Hero.tsx`)
- **Surtitre Mono :** 
  - FR : `DIRECTEURS ARTISTIQUES & CINÉASTES IA AUGMENTÉS`
  - EN : `AI ART DIRECTORS & AUGMENTED FILMMAKERS`
- **Logo Hero Central :** `/logo.png` avec masque radial et drop-shadow doré.
- **Titre Principal (H1) :**
  - FR : `L’ART CINÉMATOGRAPHIQUE AUGMENTÉ PAR L'IA`
  - EN : `CINEMATIC ARTISTRY AUGMENTED BY AI`
- **Sous-titre :**
  - FR : `Direction artistique humaine et cinéma génératif de pointe pour créer des univers visuels immersifs.`
  - EN : `Human art direction and cutting-edge generative cinema to craft immersive visual universes.`
- **Boutons d'Action Dual :**
  - `Services +` ➔ `/services`
  - `Masterclass +` ➔ `/formation`

### B. Hub de Commande Bento (`CommandMenu.tsx`)
- **Surtitre :** `00 // HUB DE COMMANDE`
- **Titre H2 :** `CHOISISSEZ VOTRE ACCÈS`
- **Option 01 :** `01 // PRESTATIONS & SERVICES IA` — *Direction artistique, clips, films publicitaires et univers génératifs sur-mesure.* ➔ `/services`
- **Option 02 :** `02 // FORMATION & MASTERCLASS IA` — *Apprenez à maîtriser le pipeline vidéo IA professionnel du prompt au master final.* ➔ `/formation`
- **Option 03 :** `03 // PIPELINE TECHNIQUE (STACK 4K)` — *Découvrez notre écosystème de moteurs génératifs et outils de post-production.* ➔ *Déclenche la modale pop-up `AIPipeline`*
- **Option 04 :** `04 // DEVIS & BRIEF QUALIFIÉ` — *Obtenez une estimation personnalisée sous 24h à 48h ouvrées.* ➔ `/contact`

### C. Captation Newsletter (`NewsletterForm.tsx`)
- **Titre :** `REJOINDRE LE FLUX OVIZai`
- **Sous-titre :** `Recevez nos breakdowns de workflows IA et analyses cinématiques.`
- **Input Placeholder :** `votre@email.com`
- **Bouton :** `S’inscrire +`
- **Toast Succès :** `✓ Inscription enregistrée !`

---

## 🎬 3. PAGE SERVICES & PRESTATIONS (`src/app/services/page.tsx`)

### Header & Retour
- **Bouton Retour :** `← Retour Accueil` ➔ `/`
- **Surtitre :** `01 // PÔLES D’EXPERTISE & PRESTATIONS`
- **Titre H1 :** `CE QUE NOUS FAISONS`
- **Sous-titre :** `De la conception à la livraison finale, nous mettons l’intelligence artificielle au service de votre vision.`

### Pôle 01 : Réalisation de Films & Séries IA
- **Livrables :** Concept & écriture, Storyboard IA, Génération des plans, Montage & étalonnage ACES, Sound design spatialisé, Livraison multi-formats.
- **Fourchette Budgétaire Indicative :** `8 000 $ – 15 000 $ USD` (ou équivalent EUR / CAD dynamique).
- **CTA :** `Demander un Devis +` ➔ `/contact`

### Pôle 02 : Clips Vidéos IA & Visualisers
- **Livrables :** Direction artistique, Moodboard & références, Séquences IA animées, Montage rythmé, Effets VFX & Lip-sync, Formats réseaux sociaux (Vertical 9:16).
- **Fourchette Budgétaire Indicative :** `3 000 $ – 8 000 $ USD` (dynamique).
- **CTA :** `Demander un Devis +` ➔ `/contact`

### Pôle 03 : Publicités IA & Brand Content
- **Livrables :** Concept publicitaire, Script & storyboard, Production IA rapide, Déclinaisons multi-formats, Intégration charte de marque, Optimisation conversion.
- **Fourchette Budgétaire Indicative :** `3 000 $ – 8 000 $ USD` (dynamique).
- **CTA :** `Demander un Devis +` ➔ `/contact`

### Pôle 04 : Direction Artistique & Univers de Marque
- **Livrables :** Direction artistique globale, Univers visuel génératif, Charte graphique & Brandbook, Visuels clés 8K, Guidelines de marque.
- **Fourchette Budgétaire Indicative :** `1 000 $ – 3 000 $ USD` (dynamique).
- **CTA :** `Demander un Devis +` ➔ `/contact`

### Pôle 05 : Création de Sites Web & Plateformes Digitales
- **Livrables :** Maquette & design UI/UX, Développement Next.js sur-mesure, Animations & interactions, SEO sémantique, Mise en ligne & hébergement.
- **Fourchette Budgétaire Indicative :** `3 000 $ – 8 000 $ USD` (dynamique).
- **CTA :** `Demander un Devis +` ➔ `/contact`

---

## 🎓 4. PAGE FORMATION & MASTERCLASS (`src/app/formation/page.tsx`)

### Header & Tarification
- **Bouton Retour :** `← Retour Accueil` ➔ `/`
- **Surtitre :** `02 // FORMATION & MASTERCLASS IA`
- **Titre H1 :** `MAÎTRISEZ LE CINÉMA IA DU PROMPT AU MASTER FINAL`
- **Prix Pro :** `490 $ USD` (ou `450 €` / `650 $ CAD` dynamique avec cache 24h).
- **Réassurance :** `Accès à vie + Mises à jour des modèles incluses`.
- **CTA :** `S’inscrire à la Masterclass +` ➔ `/contact`

### Les 5 Modules du Programme
1. **Module 01 :** Ingénierie de Prompts & Direction Visuelle 8K (Midjourney v6.1 & Flux.1 Dev).
2. **Module 02 :** Cinéma Génératif & Caméra Virtuelle (Runway Gen-3 Alpha, Kling AI, Luma Dream Machine).
3. **Module 03 :** Post-Production & Upscaling 4K/8K (Topaz Video AI, DaVinci Resolve Studio, ACES).
4. **Module 04 :** Sound Design & Doublage Voix IA (ElevenLabs, Suno v4, Adobe Audition).
5. **Module 05 :** Monétisation & Workflow Client Pro (Devis, droits d'auteur, contrats clients).

### Section Stack Technique Intégrée (`AIPipeline.tsx`)
- **Titre :** `02.B // MOTEURS GÉNÉRATIFS & PIPELINE POST-PRODUCTION`
- **Badges Outils :** Midjourney v6.1, Flux.1 Dev, Kling AI, Runway Gen-3, Topaz Video AI 5, DaVinci Resolve 19, ElevenLabs, Suno v4.

---

## 📩 5. PAGE DEVIS & CONTACT (`src/app/contact/page.tsx`)

### Header & Formulaire Qualifié (`QualifiedContact.tsx`)
- **Bouton Retour :** `← Retour Accueil` ➔ `/`
- **Surtitre :** `03 // DEVIS & BRIEF QUALIFIÉ`
- **Titre H1 :** `DÉMARRER UN PROJET`
- **Engagement SLA :** `Notre équipe étudie votre projet sous 24h à 48h ouvrées.`

### Étapes du Formulaire
1. **Sélection de la Prestation (Cartes Cliquables) :**
   - Publicité & Brand Content
   - Clip Vidéo IA & Visualiser
   - Film & Série IA
   - Direction Artistique
   - Site Web sur-mesure
   - Formation Masterclass IA
2. **Enveloppe Budgétaire (Cartes Dynamiques selon la Devise) :**
   - `1 000 $ – 3 000 $` (ex: `920 € – 2 760 €`)
   - `3 000 $ – 8 000 $` (ex: `2 760 € – 7 360 €`)
   - `8 000 $ – 15 000 $` (ex: `7 360 € – 13 800 €`)
   - `15 000 $ +` (ex: `13 800 € +`)
3. **Champs de Saisie :**
   - Nom / Organisation : `ex: Jean Dupont (Studio X)`
   - Adresse E-mail * : `contact@domaine.com`
   - Détails du projet / Message : `Objectifs visuels, références, délais souhaités...`
4. **Bouton de Soumission :** `Envoyer mon Brief Qualifié +`
5. **Message de Confirmation :** `✓ BRIEF TRANSMIS AVEC SUCCÈS — Notre équipe artistique examine vos données et revient vers vous très rapidement.`
