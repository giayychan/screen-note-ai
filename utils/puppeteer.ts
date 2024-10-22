import puppeteer from 'puppeteer';

export async function renderScreenshotWithPuppeteer(
  url: string,
  screenshotWidth: number
) {
  const browser = await puppeteer.launch({ headless: true });

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
