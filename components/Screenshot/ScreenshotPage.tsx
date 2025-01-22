'use client';

import { type ChangeEvent, type FormEvent, useRef } from 'react';
import { useOcr, useScreenshot } from './hooks';
import { UrlInput } from './UrlInput';
import LoadingImageOverlay from '../ui/LoadingImageOverlay';
import { WordOverlay } from './WordOverlay';
import LoadingSection from './LoadingSection';
import { usePathname } from 'next/navigation';

export default function ScreenshotPage() {
  const ref = useRef<HTMLDivElement>(null);
  const containerWidth = ref?.current?.clientWidth;
  const pathname = usePathname();

  const {
    base64Image,
    loading: loadingScreenshot,
    fetchImage,
    url,
    setUrl
  } = useScreenshot(containerWidth);

  const {
    ocrWords,
    loading: loadingTexts,
    progress,
    setProgress,
    setOcrWords
  } = useOcr(base64Image);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProgress(0);
    setOcrWords(undefined);

    const formData = new FormData(event.currentTarget);
    const url = formData.get('url')?.toString() || '';
    setUrl(url);
    await fetchImage(url);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full lg:w-[60vw]" ref={ref}>
      <div className="flex flex-col w-full gap-10 pb-2">
        {pathname === '/' && (
          <UrlInput
            onSubmit={onSubmit}
            value={url}
            onChange={handleUrlChange}
            disabled={loadingScreenshot || loadingTexts || !url}
          />
        )}
        <div>
          {(loadingScreenshot || loadingTexts) && (
            <LoadingSection
              progress={progress}
              loadingScreenshot={loadingScreenshot}
            />
          )}
          {base64Image && (
            <div className="relative">
              <img src={base64Image} alt="screenshot" className="w-full" />
              {progress !== 100 ? (
                <LoadingImageOverlay progress={progress} />
              ) : !ocrWords ? (
                <p>No word found in the screenshot</p>
              ) : (
                <WordOverlay words={ocrWords} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
