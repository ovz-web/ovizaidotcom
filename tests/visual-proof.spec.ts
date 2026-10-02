import { test } from '@playwright/test';
import path from 'path';

test.describe('Visual Proof Screenshots', () => {
  const outputDir = '/Users/x/.gemini/antigravity-ide/brain/f6c39fbc-f229-4dab-a8ca-512fe456fbcd/screenshots';

  test('Capture Desktop and Mobile visual proofs', async ({ page }) => {
    // 1. Homepage Desktop 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(outputDir, 'homepage_desktop_1440x900.png') });

    // Menu principal desktop
    const menuDesktop = page.locator('#menu-principal');
    await menuDesktop.screenshot({ path: path.join(outputDir, 'menu_principal_desktop.png') });

    // Footer desktop
    const footer = page.locator('footer');
    await footer.screenshot({ path: path.join(outputDir, 'footer_desktop.png') });

    // 2. Homepage Mobile 393x852
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(outputDir, 'homepage_mobile_393x852.png') });

    // Menu principal mobile
    const menuMobile = page.locator('#menu-principal');
    await menuMobile.screenshot({ path: path.join(outputDir, 'menu_principal_mobile.png') });
  });
});
