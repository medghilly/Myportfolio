import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const html = readFileSync(resolve('public/CV.html'), 'utf-8');

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setContent(html, { waitUntil: 'networkidle0' });

await page.pdf({
  path: 'public/CV.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
});

await browser.close();
console.log('✅ CV.pdf généré dans public/CV.pdf');
