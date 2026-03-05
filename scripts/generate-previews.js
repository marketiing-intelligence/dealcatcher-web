/**
 * Generate preview screenshots for demo templates
 * Creates TWO types of screenshots:
 * 1. Hero screenshot (viewport only - for thumbnail)
 * 2. Full-page screenshot (entire page - for scroll animation)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const TEMPLATES = [
  { name: 'swiss', url: 'http://localhost:3001/demo/swiss.html' },
  { name: 'standard', url: 'http://localhost:3001/demo/standard.html' },
  { name: 'technical', url: 'http://localhost:3001/demo/technical.html' },
  { name: 'terminal', url: 'http://localhost:3001/demo/terminal.html' },
  { name: 'blueprint', url: 'http://localhost:3001/demo/blueprint.html' },
  { name: 'pulse', url: 'http://localhost:3001/demo/pulse.html' },
  { name: 'gallery', url: 'http://localhost:3001/demo/gallery.html' },
  { name: 'studio', url: 'http://localhost:3001/demo/studio.html' },
  { name: 'canvas', url: 'http://localhost:3001/demo/canvas.html' },
];

const OUTPUT_DIR = path.join(__dirname, '../public/previews');

async function generatePreviews() {
  console.log('🚀 Starting preview generation...\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2, // Retina quality
  });

  for (const template of TEMPLATES) {
    console.log(`📸 Capturing ${template.name}...`);

    const page = await context.newPage();

    try {
      // Navigate to template
      await page.goto(template.url, {
        waitUntil: 'networkidle',
        timeout: 10000
      });

      // Wait for content to load
      await page.waitForTimeout(2000);

      // 1. HERO SCREENSHOT (viewport only - for thumbnail)
      const heroPath = path.join(OUTPUT_DIR, `${template.name}-preview.png`);
      await page.screenshot({
        path: heroPath,
        fullPage: false, // Only visible viewport
        type: 'png',
      });

      console.log(`   ✓ Hero: ${template.name}-preview.png`);

      // 2. FULL-PAGE SCREENSHOT (entire page - for scroll)
      const fullPath = path.join(OUTPUT_DIR, `${template.name}-full.png`);
      await page.screenshot({
        path: fullPath,
        fullPage: true, // Entire page from top to bottom
        type: 'png',
      });

      console.log(`   ✓ Full: ${template.name}-full.png\n`);

    } catch (error) {
      console.error(`   ✗ Failed: ${template.name}`, error.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('✅ Preview generation complete!\n');
  console.log('📁 Files saved to:', OUTPUT_DIR);
  console.log('\n📝 Usage:');
  console.log('  - *-preview.png = Hero screenshot (thumbnail)');
  console.log('  - *-full.png = Full-page screenshot (scroll animation)');
}

generatePreviews().catch(console.error);
