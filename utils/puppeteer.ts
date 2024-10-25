import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

export async function renderScreenshotWithPuppeteer(
  url: string,
  screenshotWidth: number
) {
  const browser = await puppeteer.launch({
    args: isLocal ? puppeteer.defaultArgs() : chromium.args,
    defaultViewport: { width: Math.floor(screenshotWidth), height: 1000 },
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH ||
      (await chromium.executablePath(
        'https://screen-note-ai-gyyc.s3.us-east-2.amazonaws.com/chromium-v130.0.0-pack.tar'
      )),
    headless: chromium.headless
  });

  const page = await browser.newPage();

  await page.setViewport({ width: Math.floor(screenshotWidth), height: 1000 });

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );

  await page.goto(url, { waitUntil: 'networkidle2' });
  const screenshot = await page.screenshot({
    encoding: 'binary',
    type: 'jpeg',
    fullPage: true
  });

  await browser.close();

  return screenshot;
}
