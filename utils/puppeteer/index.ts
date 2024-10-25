import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';
import { cfCheck } from './cfCheck';
import {
  isDev,
  localExecutablePath,
  remoteExecutablePath,
  userAgent
} from './constants';
import fs from 'node:fs';
import path from 'node:path';

export async function renderScreenshotWithPuppeteer(
  url: string,
  screenshotWidth: number
) {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      ignoreDefaultArgs: ['--enable-automation'],
      args: isDev
        ? [
            '--disable-blink-features=AutomationControlled',
            '--disable-features=site-per-process',
            '-disable-site-isolation-trials'
          ]
        : [...chromium.args, '--disable-blink-features=AutomationControlled'],
      defaultViewport: { width: screenshotWidth, height: 1080 },
      executablePath: isDev
        ? localExecutablePath
        : await chromium.executablePath(remoteExecutablePath),
      headless: true,
      debuggingPort: isDev ? 9222 : undefined
    });

    const pages = await browser.pages();
    const page = pages[0];
    await page.setUserAgent(userAgent);
    await page.setViewport({ width: 1920, height: 1080 });
    const preloadFile = fs.readFileSync(
      path.join(process.cwd(), '/src/utils/preload.js'),
      'utf8'
    );
    await page.evaluateOnNewDocument(preloadFile);
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });
    await cfCheck(page);

    const blob = await page.screenshot({
      fullPage: true,
      encoding: 'binary',
      type: 'jpeg'
    });

    return blob;
  } catch (err: any) {
    console.log(err);
    throw Error(err);
  } finally {
    if (browser) await browser.close();
  }
}
