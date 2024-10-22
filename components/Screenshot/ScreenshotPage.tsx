'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useOcr, useScreenshot } from './hooks';
import { UrlInput } from './UrlInput';
import LoadingImageOverlay from '../ui/LoadingImageOverlay';
import { WordOverlay } from './WordOverlay';
import LoadingSection from './LoadingSection';

export default function ScreenshotPage() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const {
    base64Image,
    loading: loadingScreenshot,
    fetchImage,
    url,
    setUrl
  } = useScreenshot();

  const {
    ocrWords,
    loading: loadingTexts,
    progress,
    setProgress,
    setOcrWords
  } = useOcr(base64Image, dimensions);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProgress(0);
    setOcrWords(undefined);

    const formData = new FormData(event.currentTarget);
    const url = formData.get('url')?.toString() || '';
    setUrl(url);
    await fetchImage(url);
  };

  const handleImageLoad = (e: ChangeEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.target;
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <div className="flex flex-col items-center" style={{ width: '60vw' }}>
      <div className="flex flex-col w-full gap-10">
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
              <img
                src={base64Image}
                alt="screenshot"
                className="w-full"
                onLoad={handleImageLoad}
              />
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
