/**
 * Screenshot Generator for Portfolio Previews
 *
 * Usage:
 * 1. First, install puppeteer: npm install puppeteer --save-dev
 * 2. Start the dev server: npm run dev
 * 3. Run this script: node scripts/generate-previews.js
 *
 * This will generate full-page screenshots of each demo template
 * and save them to public/previews/
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000';

const templates = [
  { name: 'swiss', url: '/demo/swiss.html' },
  { name: 'standard', url: '/demo/standard.html' },
  { name: 'technical', url: '/demo/technical.html' },
  { name: 'terminal', url: '/demo/terminal.html' },
  { name: 'blueprint', url: '/demo/blueprint.html' },
  { name: 'gallery', url: '/demo/gallery.html' },
];

async function generatePreviews() {
  console.log('Starting screenshot generation...');

  // Ensure previews directory exists
  const previewsDir = path.join(__dirname, '..', 'public', 'previews');
  if (!fs.existsSync(previewsDir)) {
    fs.mkdirSync(previewsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const template of templates) {
    console.log(`Capturing ${template.name}...`);

    const page = await browser.newPage();

    // Set viewport to desktop size
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });

    try {
      // Navigate to the demo page
      await page.goto(`${BASE_URL}${template.url}`, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      // Wait for any animations to settle
      await page.waitForTimeout(2000);

      // Take a full-page screenshot
      const outputPath = path.join(previewsDir, `${template.name}-preview.webp`);

      await page.screenshot({
        path: outputPath,
        type: 'webp',
        quality: 85,
        fullPage: true,
      });

      console.log(`  ✓ Saved: ${outputPath}`);
    } catch (error) {
      console.error(`  ✗ Error capturing ${template.name}:`, error.message);
    }

    await page.close();
  }

  await browser.close();
  console.log('\nDone! Screenshots saved to public/previews/');
}

generatePreviews().catch(console.error);
