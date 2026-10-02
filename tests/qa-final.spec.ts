import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('QA Final Typographique et Visuel', () => {
  const outputDir = '/Users/x/.gemini/antigravity-ide/brain/f6c39fbc-f229-4dab-a8ca-512fe456fbcd/screenshots';

  const mobileWidths = [320, 360, 375, 393, 430];

  for (const w of mobileWidths) {
    test(`Contrôle Hero mobile à ${w}px sans clipping ni débordement`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 750 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const heroSpans = page.locator('h1 span');
      const count = await heroSpans.count();
      expect(count).toBe(2);

      for (let i = 0; i < count; i++) {
        const span = heroSpans.nth(i);
        const box = await span.boundingBox();
        expect(box).not.toBeNull();
        if (box) {
          // Verify element is fully within viewport width (accounting for standard margins)
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(w + 1);
        }
      }

      // Take screenshot of hero specifically
      const hero = page.locator('section').first();
      await hero.screenshot({ path: path.join(outputDir, `hero_${w}px.png`) });
    });
  }

  test('Captures obligatoires QA Final', async ({ page }) => {
    // 1. homepage 375 px
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(outputDir, 'homepage_375px.png') });

    // 2. index 375 px
    const index375 = page.locator('section:has(#index-header-studio)');
    await index375.screenshot({ path: path.join(outputDir, 'menu_375px.png') });

    // 3. homepage 393 px
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(outputDir, 'homepage_393px.png') });

    // 4. homepage 1440 px
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(outputDir, 'homepage_1440px.png') });

    // 5. services desktop (/services)
    await page.goto('/services');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(outputDir, 'services_desktop.png') });

    // 6. tarifs desktop (/tarifs)
    await page.goto('/tarifs');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(outputDir, 'tarifs_desktop.png') });
  });
});
