import { test, expect } from '@playwright/test';
import * as path from 'path';

const PROD_URL = 'https://www.ovizai.com';
const SCREENSHOT_DIR = '/Users/x/.gemini/antigravity-ide/brain/f6c39fbc-f229-4dab-a8ca-512fe456fbcd/screenshots';

const FORBIDDEN_TEXTS = [
  '270 USD',
  '890 USD',
  '320 USD',
  '500 USD',
  '990 USD',
  'Sprint Pilote',
  'Midjourney',
  'Topaz',
  'DaVinci',
  'Runway',
  'Kling',
  'Luma',
  'Formation Vidéo IA',
  'Ressources en accès libre',
];

const PAGES_TO_TEST = [
  { path: '/', name: 'Homepage' },
  { path: '/services', name: 'Services' },
  { path: '/tarifs', name: 'Tarifs' },
  { path: '/contact', name: 'Contact' },
  { path: '/formation', name: 'Formation' },
];

test.describe('Production Anti-Regression & Visual QA against https://www.ovizai.com', () => {
  // 1. Strict forbidden text check on all public routes
  for (const pageInfo of PAGES_TO_TEST) {
    test(`[PROD] ${pageInfo.name} (${pageInfo.path}) does NOT contain any forbidden text`, async ({ page }) => {
      await page.goto(`${PROD_URL}${pageInfo.path}`, { waitUntil: 'networkidle' });
      const bodyText = await page.innerText('body');

      for (const forbidden of FORBIDDEN_TEXTS) {
        expect(bodyText.toLowerCase()).not.toContain(forbidden.toLowerCase());
      }
    });
  }

  // 2. Mandatory content check on homepage
  test('[PROD] Homepage contains all mandatory elements and correct pricing', async ({ page }) => {
    await page.goto(PROD_URL, { waitUntil: 'networkidle' });
    const content = await page.content();
    const bodyText = await page.innerText('body');

    // Hero title
    expect(bodyText).toContain('DES IDÉES IMPOSSIBLES');
    expect(bodyText).toContain('DES PUBLICITÉS BIEN RÉELLES');

    // Subphrase exact
    expect(bodyText).toContain('OVIZai conçoit des publicités courtes pour marques, produits et établissements — de l’idée au film final');

    // Navigation and menu
    expect(bodyText).toContain('SERVICES');
    expect(bodyText).toContain('OFFRE DE LANCEMENT');
    expect(bodyText).toContain('MÉTHODE');
    expect(bodyText).toContain('DÉMARRER UN PROJET');

    // Pricing
    expect(bodyText).toContain('530 USD');
    expect(bodyText).toContain('265 USD');

    // Authentic logo (mix-blend-screen / logo.png)
    const logoImg = page.locator('header img[alt="OVIZai"]');
    await expect(logoImg).toBeVisible();
    const src = await logoImg.getAttribute('src');
    expect(src).toContain('logo.png');

    // No portfolio cards rendered if published is false
    const portfolioCards = page.locator('article[data-portfolio-card]');
    expect(await portfolioCards.count()).toBe(0);
  });

  // 3. Captures obligatoires de LA PRODUCTION
  test('[PROD] Capture visual snapshots of live production', async ({ page }) => {
    // A. Homepage desktop 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PROD_URL, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_homepage_desktop_1440x900.png') });

    // B. Homepage mobile 393x852
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto(PROD_URL, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_homepage_mobile_393x852.png') });

    // C. Services desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${PROD_URL}/services`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_services_desktop.png') });

    // D. Tarifs desktop
    await page.goto(`${PROD_URL}/tarifs`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_tarifs_desktop.png') });

    // E. Contact desktop
    await page.goto(`${PROD_URL}/contact`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_contact_desktop.png') });

    // F. Formation desktop
    await page.goto(`${PROD_URL}/formation`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_formation_desktop.png') });
  });
});
