'use client';

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import { useOcr, useScreenshot } from './hooks';
import { UrlInput } from './UrlInput';
import LoadingImageOverlay from '../ui/LoadingImageOverlay';
import { WordOverlay } from './WordOverlay';
import LoadingSection from './LoadingSection';

export default function ScreenshotPage() {
  const ref = useRef<HTMLDivElement>(null);
  const containerWidth = ref?.current?.clientWidth;

  const {
    base64Image,
    setBase64Image,
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
        <UrlInput
          onSubmit={onSubmit}
          value={url}
          onChange={handleUrlChange}
          disabled={loadingScreenshot || loadingTexts}
        />
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
              {progress !== 100 || !ocrWords ? (
                <LoadingImageOverlay progress={progress} />
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
