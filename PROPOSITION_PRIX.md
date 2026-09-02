# PROPOSITION PRIX — OVIZai `/tarifs`

> **Statut : proposition à valider — aucune valeur intégrée dans le code, aucun commit.**
>
> Ce document propose 3 scénarios de prix argumentés pour `PRIX_STANDARD` et `PRIX_PREMIUM`.
> Tu dois choisir un scénario (ou me donner les chiffres exacts) avant toute modification de `page.tsx`.

---

## Données de marché utilisées

### Production vidéo traditionnelle (agence, France/Europe, 2025-2026)
| Segment | Fourchette |
|---|---|
| Vidéo basique (corporate simple, réseaux) | 1 500 – 5 000 € |
| Vidéo de marque professionnelle (mid-range) | 6 000 – 20 000 € |
| Film de marque haut de gamme | 20 000 – 75 000 € |
| Délai typique | 2 à 6 semaines (brief → livraison) |

### Studios & agences IA concurrents (2025-2026)
| Positionnement | Fourchette observée |
|---|---|
| Freelance IA / petit studio | 500 – 5 000 € / vidéo |
| Agence IA mid-range (Europe) | 1 000 – 3 000 € / vidéo finalisée |
| Agence IA haut de gamme (cinématographique) | 3 500 – 15 000 € / projet |
| Outil SaaS grand public (abonnement) | 16 – 200 € / mois (DIY, pas comparable) |

### Freelance vidéo/motion design (France, TJM 2025-2026)
| Niveau | TJM |
|---|---|
| Junior (0-2 ans) | 250 – 400 € / jour |
| Confirmé (3-7 ans) | 400 – 600 € / jour |
| Expert (8+ ans) | 600 – 900 €+ / jour |

**Remarque clé sur le freelance** : un freelance montage/motion design seul ne livre pas un film de marque complet — il a besoin de rushes. OVIZai livre la production complète (création images + post-production). La comparaison directe n'est pas pertinente, mais elle ancre le seuil bas du marché.

---

## Les 3 questions que tu dois répondre avant de choisir un prix

> Je n'ai pas accès à ces données — elles sont indispensables pour choisir un prix juste.

1. **Quel est ton coût de production réel par vidéo ?**
   (abonnements outils : Midjourney, Runway, Kling, Topaz, DaVinci — + temps de travail estimé × ta valeur de ton temps)

2. **Combien de vidéos peux-tu produire par mois** (de façon réaliste, seul) ?

3. **Quel est ton revenu mensuel cible** pour considérer l'activité viable ?

---

## 3 scénarios de prix proposés

### 🟡 Scénario A — Entrée marché / Acquisition clients (recommandé pour démarrer)

| Palier | Prix proposé | Justification |
|---|---|---|
| **Standard** (1 vidéo, 2 révisions, 5-7 jours) | **800 – 1 200 €** | Représente ~10-15 % du coût d'une vidéo de marque mid-range traditionnelle (6 000 – 20 000 €). En dessous du seuil psychologique des agences IA mid-range (1 000 – 3 000 €). Accessible pour les marques émergentes. |
| **Premium** (3 vidéos/mois, révisions illimitées, 3-4 jours, DA incluse) | **2 000 – 2 800 €** | Positionné juste sous la fourchette basse des agences IA mid-range. Justifiable par le volume + le délai réduit. |

**Implication revenus (Scénario A) :**
- Pour atteindre 4 000 € net/mois : 4-5 clients Standard **ou** 2 clients Premium.
- Accessible dès les premiers mois, faible barrière d'entrée côté client.
- Risque : positionnement perçu "bas de gamme" si le portfolio n'est pas fort.

---

### 🟠 Scénario B — Positionnement milieu de marché (équilibre viabilité / crédibilité)

| Palier | Prix proposé | Justification |
|---|---|---|
| **Standard** (1 vidéo, 2 révisions, 5-7 jours) | **1 500 – 1 800 €** | Milieu de la fourchette agences IA Europe. Juste au-dessus du seuil psychologique "on y réfléchit". Client cible : PME, label musical, marque DTC. |
| **Premium** (3 vidéos/mois, révisions illimitées, 3-4 jours, DA incluse) | **3 500 – 4 500 €** | En cohérence avec le bas de gamme des agences IA haut de gamme (3 500 – 15 000 €). Correspond à ~15-20 % du coût d'un film de marque traditionnel haut de gamme (20 000 – 75 000 €). |

**Implication revenus (Scénario B) :**
- Pour atteindre 4 000 € net/mois : 3 clients Standard **ou** 1 client Premium + 1 Standard.
- Pour 6 000 € net/mois : 4 Standard **ou** 2 Premium.
- Crédibilité plus forte, but le cycle de vente est un peu plus long.

---

### 🔴 Scénario C — Haut de marché / Studio cinématographique IA (ambitieux, long terme)

| Palier | Prix proposé | Justification |
|---|---|---|
| **Standard** (1 vidéo, 2 révisions, 5-7 jours) | **2 500 – 3 500 €** | Entrée basse des agences IA haut de gamme. Difficile à justifier sans portfolio solide et références. |
| **Premium** (3 vidéos/mois + DA complète) | **6 000 – 10 000 €** | Comparable aux budgets agences traditionnelles mid-range. À réserver pour clients grands comptes, labels majeurs, grandes marques. |

**Implication revenus (Scénario C) :**
- Pour atteindre 6 000 € net/mois : 2 clients Standard.
- Volume de clients très faible, mais cycle de vente long, profil client exigeant.
- **Déconseillé pour démarrer** sans portfolio cinématographique public et forte notoriété.

---

## Recommandation (sans connaître tes coûts)

> ⚠️ Cette recommandation est indicative. Elle change entièrement selon tes réponses aux 3 questions ci-dessus.

**Pour démarrer rapidement et générer du chiffre dans les 30-60 premiers jours :**

→ **Scénario A** avec intention de migrer vers **Scénario B** après 3-5 clients livrés avec succès.

- `PRIX_STANDARD` : **990 € ou 1 200 €** (seuil psychologique juste sous 1 000 €, ou premier palier symbolique à 4 chiffres)
- `PRIX_PREMIUM` : **2 400 € ou 2 800 €** (multiples ronds, faciles à mémoriser et à citer)

**Ce positionnement implique** :
- 4 clients Standard/mois = ~4 800 € brut (viable solo avec outils IA)
- Conversion vers Premium de 1 client/mois dès le 2e ou 3e mois = ~5 200 – 5 600 € brut

---

## Prochaine étape

Valide ou ajuste un scénario, puis donne-moi :

```
PRIX_STANDARD = "XXX €"
PRIX_PREMIUM  = "X XXX €"
```

Je mettrai alors à jour `src/app/tarifs/page.tsx` et ferai le commit.

---

*Recherche effectuée le 2026-09-02. Sources : Baromètre Malt, LemonLight, IndiRap, études sectorielles IA audiovisuel 2024-2026, marché France/Europe.*
