import { test, expect } from '@playwright/test';

test.describe('OVIZai Radical Simplification & Hybrid Architecture', () => {
  test('Homepage complies with Ohneis-inspired minimal structure', async ({ page }) => {
    await page.goto('/');

    // 1. Header with logo
    const logo = page.locator('header img[alt*="OVIZai"]');
    await expect(logo).toBeVisible();

    // 2. Hero Brutalist
    const heroH1 = page.locator('h1');
    await expect(heroH1).toBeVisible();
    await expect(heroH1).toContainText('DES IDÉES IMPOSSIBLES');
    await expect(heroH1).toContainText('DES FILMS BIEN RÉELS');

    // Ensure no period at end of hero title
    const heroText = await heroH1.innerText();
    expect(heroText.endsWith('.')).toBeFalsy();

    // 3. Central Index is present with 3 doors (before official portfolio release)
    const indexButtons = page.locator('#main-content button[id^="index-header-"]');
    await expect(indexButtons).toHaveCount(3);

    await expect(indexButtons.nth(0)).toContainText('STUDIO');
    await expect(indexButtons.nth(0)).toContainText('Créer avec OVIZai');

    await expect(indexButtons.nth(1)).toContainText('FORMATION');
    await expect(indexButtons.nth(1)).toContainText('Apprendre la méthode OVIZai');

    await expect(indexButtons.nth(2)).toContainText('CONTACT');
    await expect(indexButtons.nth(2)).toContainText('Démarrer une conversation');

    // 4. Commercial sections MUST NOT be directly visible on homepage
    await expect(page.locator('#tarifs')).toHaveCount(0); // LaunchOfferSection removed from home
    await expect(page.locator('text=UNE OFFRE SIMPLE PENSÉE POUR COMMENCER')).toHaveCount(0);
    await expect(page.locator('text=LA MÉTHODE DE PRODUCTION OVIZAI')).toHaveCount(0);
    await expect(page.locator('text=QUESTIONS FRÉQUENTES')).toHaveCount(0);
  });

  test('Central Index disclosure functions with single open panel constraint', async ({ page }) => {
    await page.goto('/');

    const studioButton = page.locator('#index-header-studio');
    const formationButton = page.locator('#index-header-formation');
    const contactButton = page.locator('#index-header-contact');

    // Initially all closed
    await expect(page.locator('#index-content-studio')).toHaveCount(0);
    await expect(page.locator('#index-content-formation')).toHaveCount(0);
    await expect(page.locator('#index-content-contact')).toHaveCount(0);

    // 1. Open STUDIO
    await studioButton.click();
    const studioContent = page.locator('#index-content-studio');
    await expect(studioContent).toBeVisible();

    // Contains 4 disciplines
    await expect(studioContent).toContainText('FILMS & PUBLICITÉ');
    await expect(studioContent).toContainText('PRODUIT & MARQUE');
    await expect(studioContent).toContainText('MUSIQUE & CULTURE');
    await expect(studioContent).toContainText('CREATIVE PRODUCTION');

    // Contains Launch Offer 530 USD and Custom Project
    await expect(studioContent).toContainText('OFFRE DE LANCEMENT');
    await expect(studioContent).toContainText('530 USD');
    await expect(studioContent).toContainText('VOIR L’OFFRE →');
    await expect(studioContent).toContainText('PROJET SUR MESURE');
    await expect(studioContent).toContainText('PARLER DU PROJET →');

    // 2. Open FORMATION -> STUDIO should automatically close
    await formationButton.click();
    await expect(page.locator('#index-content-studio')).toHaveCount(0);
    const formationContent = page.locator('#index-content-formation');
    await expect(formationContent).toBeVisible();
    await expect(formationContent).toContainText('OVIZai METHOD');
    await expect(formationContent).toContainText('La méthode derrière nos productions');
    await expect(formationContent).toContainText('Découvrir la formation →');

    // 3. Open CONTACT -> FORMATION should automatically close
    await contactButton.click();
    await expect(page.locator('#index-content-formation')).toHaveCount(0);
    const contactContent = page.locator('#index-content-contact');
    await expect(contactContent).toBeVisible();
    await expect(contactContent).toContainText('Vous avez un projet');
    await expect(contactContent).toContainText('Démarrer une conversation →');
    await expect(contactContent).toContainText('Instagram ↗');
  });

  test('Services page delivers Le Labo Noir style 4-discipline vertical editorial layout', async ({ page }) => {
    await page.goto('/services');

    // 4 vertical editorial disciplines
    await expect(page.getByRole('heading', { name: 'FILMS & PUBLICITÉ' })).toBeVisible();
    await expect(page.locator('text=Des films conçus autour d’une idée forte')).toBeVisible();

    await expect(page.getByRole('heading', { name: 'PRODUIT & MARQUE' })).toBeVisible();
    await expect(page.locator('text=Lancements, campagnes et univers visuels pensés autour de votre produit')).toBeVisible();

    await expect(page.getByRole('heading', { name: 'MUSIQUE & CULTURE' })).toBeVisible();
    await expect(page.locator('text=Clips, séquences visuelles et projets pour artistes et univers culturels')).toBeVisible();

    await expect(page.getByRole('heading', { name: 'CREATIVE PRODUCTION' })).toBeVisible();
    await expect(page.locator('text=Production sur mesure et marque blanche pour agences et studios')).toBeVisible();

    // No SaaS dashboard cards or icon grids
    await expect(page.locator('svg.lucide-smartphone')).toHaveCount(0);
    await expect(page.locator('svg.lucide-sparkles')).toHaveCount(0);
  });

  test('Formation page displays dignified playbook status', async ({ page }) => {
    await page.goto('/formation');

    await expect(page.locator('text=OVIZai METHOD')).toBeVisible();
    await expect(page.locator('text=LA MÉTHODE DERRIÈRE')).toBeVisible();
    await expect(page.locator('text=NOS PRODUCTIONS')).toBeVisible();
    await expect(page.locator('text=Playbook en cours de finalisation')).toBeVisible();
  });

  test('Mobile menu overlay is 100% opaque, locks scroll, and handles accessibility', async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('/');

    const menuButton = page.locator('button:has-text("MENU")');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const overlay = page.locator('#mobile-navigation-overlay');
    await expect(overlay).toBeVisible();

    // Verify opacity is 1 and background is #050505
    const bgColor = await overlay.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(bgColor).toBe('rgb(5, 5, 5)');

    // Verify close button works
    const closeBtn = page.locator('button:has-text("FERMER")');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(overlay).toHaveCount(0);
  });
});
