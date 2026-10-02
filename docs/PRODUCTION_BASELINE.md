# OVIZai — Production Baseline (Freeze Release)

- **Date** : 2026-10-02 (22:08 UTC / 18:08 EDT)
- **SHA Git exact** : `c265f2d3bdd8a0a0a0b4ec87d9e8bf69d6529387`
- **Deployment Vercel ID** : `dpl_5SWW6DNQwjFimXqf33gEAuGP9SoU`
- **URL Deployment direct** : https://ovizaidotcom-968k22hsd-cinemaaistudiocontact-9752s-projects.vercel.app
- **Alias www.ovizai.com** : https://www.ovizai.com (cible canonique de production)
- **Alias ovizai.com** : https://ovizai.com (redirection permanente HTTP 308 vers https://www.ovizai.com/)

---

### Commercial & Tarifs
- **Offre de lancement principale** : 530 USD
- **Acompte exigible à la commande** : 265 USD
- **Solde avant master final haute définition** : 265 USD
- **Projets plus complexes** : Sur devis (selon périmètre spécifique)
- **Interdiction absolue** : 270 USD, 890 USD, 320 USD, 500 USD, 990 USD, Sprint Pilote

---

### Portfolio & Vidéos
- **Portfolio actuel** : Strictement vide (`PORTFOLIO_PROJECTS = []`)
- **Projets publiés** : 0 projet (`hasPublishedProjects() === false`)
- **Lien nav "Work"** : Masqué automatiquement
- **Anciennes vidéos / placeholders** : Totalement absents (0 vidéo affichée, 0 placeholder)
- **Architecture d'accueil des 5 films officiels** : Prête dans `src/lib/portfolio.ts` (modèle `PortfolioProject` typé, il suffira de renseigner les 5 objets avec `published: true`)

---

### Formation
- **Statut SEO** : `noindex, nofollow`
- **Contenu** : Page d'attente minimale (« GUIDE EN PRÉPARATION — La méthode complète de production OVIZai sera publiée prochainement »)
- **Sitemap** : Totalement exclu de `/sitemap.xml` et bloqué dans `/robots.txt`
- **E-commerce** : Aucun prix, aucun checkout, aucune promesse obsolète

---

### État du Formulaire de Contact (`/contact`)
- **Champs principaux** : Nom, Email, Entreprise (optionnel), "Que souhaitez-vous promouvoir ?"
- **Progressive disclosure** : Liens, délais souhaités, notes complémentaires
- **Sécurité** : Honeypot anti-spam (`bot_hp`)
- **Backend leads** : Sauvegarde Supabase + notification email via Resend

---

### Architecture `portfolio.ts` (`src/lib/portfolio.ts`)
- Interface `PortfolioProject` : `id`, `title { fr, en }`, `sector { fr, en }`, `type ('client' | 'spec')`, `specLabel`, `videoSrc`, `posterSrc`, `description { fr, en }`, `formats`, `year`, `published`, `featured`
- Fonctions utilitaires : `getPublishedProjects()`, `hasPublishedProjects()`

---

### Liste des Pages Publiques Principales
1. `/` — Page d'accueil (Hero brutaliste, logo vintage officiel, boîte de menu centrale, 3 services, offre 530 USD, méthode en 3 étapes, FAQ, CTA final, Footer)
2. `/services` — Présentation des 3 formats essentiels (Short-Form Ads, Product & Brand Films, Agency / White-Label)
3. `/tarifs` — Détail de l'offre de lancement (530 USD, 265 USD + 265 USD) et devis sur-mesure
4. `/contact` — Briefing et prise de contact qualifiée
5. `/formation` — Guide en préparation (noindex, hors funnel)
6. `/cgv` — Conditions Générales de Vente
7. `/confidentialite` — Politique de Confidentialité (RGPD)
8. `/mentions-legales` — Mentions légales officielles
9. `/sitemap.xml` & `/robots.txt` — Fichiers d'indexation SEO
