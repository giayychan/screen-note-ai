import { NextResponse } from 'next/server';
import { renderScreenshotWithPuppeteer } from '@/utils/puppeteer';

type PostRequestBody = {
  url: string;
  screenshotWidth: number;
};

export const maxDuration = 60;

const cache = new Map<string, { timestamp: number, data: Uint8Array<ArrayBufferLike> }>();
const CACHE_TTL = 3600 * 1000 * 4; // 4 hours

export async function POST(request: Request) {
  try {
    const data: PostRequestBody = await request.json();
    const { url, screenshotWidth } = data;

    if (!url) {
      return NextResponse.json(
        { error: 'Missing url in request body' },
        { status: 400 }
      );
    }

    if (!screenshotWidth) {
      return NextResponse.json(
        { error: 'Missing screenshotWidth in request body' },
        { status: 400 }
      );
    }

    const cacheKey = `${url}-${screenshotWidth}`;

    const cachedItem = cache.get(cacheKey);
    const now = Date.now();

    if (cachedItem && (now - cachedItem.timestamp < CACHE_TTL)) {
      console.log(`Cache hit for ${cacheKey}`);

      return new Response(cachedItem.data, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
          'X-Cache': 'HIT'
        }
      });
    }

    const screenshot = await renderScreenshotWithPuppeteer(url, screenshotWidth);

    cache.set(cacheKey, {
      timestamp: now,
      data: screenshot
    });

    return new Response(screenshot, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'X-Cache': 'MISS'
      }
    });
  } catch (error: any) {
    console.error('Screenshot generation error:', error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}