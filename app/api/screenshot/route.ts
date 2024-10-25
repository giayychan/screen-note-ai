import { NextResponse } from 'next/server';
import { renderScreenshotWithPuppeteer } from '@/utils/puppeteer';

type PostRequestBody = {
  url: string;
  screenshotWidth: number;
};

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

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
