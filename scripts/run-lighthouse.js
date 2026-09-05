const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const urls = [
  { name: 'Home', path: '' },
  { name: 'Tarifs', path: 'tarifs' },
  { name: 'Services', path: 'services' },
];

const results = [];
const tmpDir = path.resolve(__dirname, '../.lighthouse-ci');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

console.log('[LIGHTHOUSE] Starting automated audits (Desktop + Mobile)...');

for (const item of urls) {
  const url = `http://localhost:3000/${item.path}`;

  for (const preset of ['desktop', 'mobile']) {
    console.log(`\n[LIGHTHOUSE] Auditing ${item.name} (${preset})...`);
    const reportPath = path.join(tmpDir, `${item.name.toLowerCase()}-${preset}.json`);

    const flags = preset === 'desktop'
      ? '--preset=desktop'
      : '--form-factor=mobile --screenEmulation.mobile=true';

    try {
      execSync(
        `npx lighthouse "${url}" --output=json --output-path="${reportPath}" ${flags} --disable-storage-reset --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --quiet`,
        { stdio: 'inherit' }
      );

      const raw = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      const scores = {
        page: item.name,
        device: preset,
        performance: Math.round((raw.categories.performance?.score || 0) * 100),
        accessibility: Math.round((raw.categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((raw.categories['best-practices']?.score || 0) * 100),
        seo: Math.round((raw.categories.seo?.score || 0) * 100),
      };

      results.push(scores);
      console.log(`[LIGHTHOUSE] ${item.name} (${preset}) -> Performance: ${scores.performance}, Accessibility: ${scores.accessibility}, Best Practices: ${scores.bestPractices}, SEO: ${scores.seo}`);
    } catch (err) {
      console.error(`[LIGHTHOUSE ERROR] Failed auditing ${item.name} (${preset}):`, err.message);
    }
  }
}

console.log('\n================== LIGHTHOUSE AUDIT SUMMARY ==================');
console.table(results);
fs.writeFileSync(path.join(tmpDir, 'summary.json'), JSON.stringify(results, null, 2));
console.log('==============================================================');
