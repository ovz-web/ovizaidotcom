import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', titleRegex: /OVIZai/i },
  { path: '/services', titleRegex: /OVIZai|Services/i },
  { path: '/formation', titleRegex: /OVIZai|Formation|Masterclass/i },
  { path: '/tarifs', titleRegex: /OVIZai|Tarifs|Pricing/i },
  { path: '/contact', titleRegex: /OVIZai|Contact|Devis/i },
];

for (const { path, titleRegex } of routes) {
  test(`Route ${path} responds 200 and loads successfully`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(titleRegex);
  });
}
