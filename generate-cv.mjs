import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const browser = await puppeteer.launch();

// CV français
const htmlFr = readFileSync(resolve('public/CV.html'), 'utf-8');
const pageFr = await browser.newPage();
await pageFr.setContent(htmlFr, { waitUntil: 'networkidle0' });
await pageFr.pdf({
  path: 'public/CV.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
});
console.log('✅ CV.pdf généré dans public/CV.pdf');

// CV anglais
const htmlEn = readFileSync(resolve('public/CV_en.html'), 'utf-8');
const pageEn = await browser.newPage();
await pageEn.setContent(htmlEn, { waitUntil: 'networkidle0' });
await pageEn.pdf({
  path: 'public/CV_en.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
});
console.log('✅ CV_en.pdf généré dans public/CV_en.pdf');

await browser.close();
