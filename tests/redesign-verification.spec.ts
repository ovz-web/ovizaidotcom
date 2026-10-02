import { test, expect } from '@playwright/test';

test.describe('OVIZai Strategic Redesign Verification', () => {
  const viewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 14/15', width: 393, height: 852 },
    { name: 'iPad / Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1440, height: 900 },
  ];

  const pages = [
    '/',
    '/services',
    '/tarifs',
    '/contact',
    '/formation',
    '/cgv',
    '/confidentialite',
    '/mentions-legales',
  ];

  for (const vp of viewports) {
    test.describe(`Viewport: ${vp.name} (${vp.width}x${vp.height})`, () => {
      for (const path of pages) {
        test(`Page ${path} loads without horizontal overflow and has proper structure`, async ({ page }) => {
          await page.setViewportSize({ width: vp.width, height: vp.height });
          const response = await page.goto(path);
          expect(response?.status()).toBe(200);

          // Check no horizontal overflow
          const isOverflowing = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
          });
          expect(isOverflowing).toBe(false);

          // Check skip link
          const skipLink = page.locator('a[href="#main-content"]');
          await expect(skipLink).toBeAttached();
        });
      }
    });
  }

  test('Homepage has exact required copy, 530 USD, 265 USD, and NO 270 USD', async ({ page }) => {
    await page.goto('/');

    // Check Hero copy (no periods!)
    const h1 = page.locator('h1');
    await expect(h1).toContainText('DES IDÉES IMPOSSIBLES');
    await expect(h1).toContainText('DES PUBLICITÉS BIEN RÉELLES');
    await expect(h1).not.toContainText('DES IDÉES IMPOSSIBLES.');
    await expect(h1).not.toContainText('DES PUBLICITÉS BIEN RÉELLES.');

    // Check key section h2 headings have no periods
    const h2s = await page.locator('h2').allTextContents();
    for (const h2 of h2s) {
      expect(h2.trim().endsWith('.')).toBe(false);
    }

    // Check official logo images in TopBar and Footer
    const headerLogo = page.locator('header img[alt="OVIZai"]');
    await expect(headerLogo).toBeVisible();
    const footerLogo = page.locator('footer img[alt="OVIZai"]');
    await expect(footerLogo).toBeVisible();

    // Check CommandMenu box presence on Homepage
    const commandMenu = page.locator('section[aria-label*="Accès rapide"], section[aria-label*="navigation"]');
    await expect(commandMenu).toBeVisible();

    // Check pricing: 530 USD, 265 USD deposit
    const bodyText = await page.textContent('body');
    expect(bodyText).toContain('530');
    expect(bodyText).toContain('265');
    // Ensure no corrupted 270 rounding in USD
    expect(bodyText).not.toContain('270 USD');
    expect(bodyText).not.toContain('270 $');

    // Ensure no old videos
    expect(bodyText).not.toContain('spec-01.mp4');
    expect(bodyText).not.toContain('spec-02.mp4');
    expect(bodyText).not.toContain('Le Dernier Burger');
    expect(bodyText).not.toContain('Après la Fermeture');

    // Ensure no banned pipeline tool names in public copy
    const bannedTools = [
      'Topaz',
      'DaVinci',
      'Seedance',
      'Miora',
      'Higgsfield',
      'Kling',
      'Runway',
      'Midjourney',
      'ElevenLabs',
      'Suno',
      'Adobe Audition',
    ];
    for (const tool of bannedTools) {
      expect(bodyText).not.toContain(tool);
    }
  });

  test('Language switch dynamically updates document lang and strings', async ({ page }) => {
    await page.goto('/');
    
    // Default or detected lang check
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(['fr', 'en']).toContain(htmlLang);

    // Toggle to EN if in FR, or FR if in EN
    const langBtn = page.locator('button', { hasText: htmlLang === 'fr' ? 'EN' : 'FR' }).first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      const updatedLang = await page.getAttribute('html', 'lang');
      expect(updatedLang).not.toBe(htmlLang);
    }
  });

  test('Contact form has bot_hp honeypot and minimal required fields', async ({ page }) => {
    await page.goto('/contact');

    // Check bot_hp honeypot input is in DOM and hidden
    const honeypot = page.locator('input[name="bot_hp"]');
    await expect(honeypot).toBeAttached();
    await expect(honeypot).toHaveClass(/hidden/);

    // Check key fields
    await expect(page.locator('input#contact-name')).toBeVisible();
    await expect(page.locator('input#contact-email')).toBeVisible();
    await expect(page.locator('textarea#contact-target')).toBeVisible();

    // Test progressive disclosure
    const toggleDetailsBtn = page.locator('form button[aria-expanded]');
    await expect(toggleDetailsBtn).toBeVisible();
    await toggleDetailsBtn.click();
    await expect(page.locator('input#contact-links')).toBeVisible();
    await expect(page.locator('input#contact-deadline')).toBeVisible();
  });

  test('Formation page is minimal guide without checkout or price', async ({ page }) => {
    await page.goto('/formation');
    const bodyText = await page.textContent('body');
    
    expect(bodyText).toContain('OVIZai METHOD');
    expect(bodyText?.toLowerCase()).toMatch(/guide en préparation|guide in progress/);
    expect(bodyText).not.toContain('320 USD');
    expect(bodyText).not.toContain('500 USD');
    expect(bodyText).not.toContain('990 USD');

    // Check robots meta tag is noindex
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute('content', /noindex/);
  });
});
