import { NextResponse } from 'next/server';
import { renderScreenshotWithPuppeteer } from '@/utils/puppeteer';
import { unstable_noStore } from 'next/cache';

type PostRequestBody = {
  url: string;
  screenshotWidth: number;
};

export async function POST(request: Request) {
  try {
    unstable_noStore();

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

    const screenshot = await renderScreenshotWithPuppeteer(
      url,
      screenshotWidth
    );

    return new Response(screenshot, {
      headers: { 'content-type': 'image/jpeg' }
    });
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }
}
