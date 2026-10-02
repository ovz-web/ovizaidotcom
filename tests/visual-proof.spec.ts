import { test } from '@playwright/test';
import path from 'path';

test.describe('Visual Proof Screenshots', () => {
  const outputDir = '/Users/x/.gemini/antigravity-ide/brain/f6c39fbc-f229-4dab-a8ca-512fe456fbcd/screenshots';

  test('Capture Desktop and Mobile visual proofs', async ({ page }) => {
    // 1. Homepage Desktop 1440x900 (Radical Simplification, Central Index closed)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(outputDir, 'homepage_desktop_1440x900.png') });

    // 2. Central Index Studio Opened
    await page.locator('#index-header-studio').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outputDir, 'homepage_studio_open_desktop.png') });

    // 3. Central Index Formation Opened
    await page.locator('#index-header-formation').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outputDir, 'homepage_formation_open_desktop.png') });

    // 4. Central Index Contact Opened
    await page.locator('#index-header-contact').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outputDir, 'homepage_contact_open_desktop.png') });

    // 5. Services Editorial Desktop (Le Labo Noir style 4 disciplines)
    await page.goto('/services');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(outputDir, 'services_editorial_desktop.png') });

    // 6. Tarifs Page (Offer 530 USD & Custom Quote)
    await page.goto('/tarifs');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(outputDir, 'tarifs_desktop.png') });

    // 7. Homepage Mobile 393x852
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(outputDir, 'homepage_mobile_393x852.png') });

    // 8. Mobile Menu Opened (100% Opaque #050505)
    await page.locator('button:has-text("MENU")').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outputDir, 'mobile_menu_open_393x852.png') });
  });
});
