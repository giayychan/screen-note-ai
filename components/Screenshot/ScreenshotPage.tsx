'use client';

import { type ChangeEvent, useEffect, useState, type FormEvent } from 'react';
import { UrlInput } from './UrlInput';
import {
  fetchScreenshot,
  extractTextFromImage,
  SCREENSHOT_WIDTH_PERCENTAGE
} from './utils';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { WordOverlay } from './WordOverlay';
import useScreenshotStore, { type OcrWord } from '@/store/useScreenshotStore';

const LoadingOverlay = ({ progress }: { progress: number }) => {
  return (
    <div
      className={`absolute bottom-0 w-full backdrop-blur-3xl`}
      style={{ height: `calc(${100 - progress}%)` }}
    ></div>
  );
};

export default function ScreenshotPage() {
  const base64Image = useScreenshotStore((state) => state.base64Image);
  const setBase64Image = useScreenshotStore((state) => state.setBase64Image);

  const url = useScreenshotStore((state) => state.url);
  const setUrl = useScreenshotStore((state) => state.setUrl);

  const [ocrWords, setOcrWords] = useState<OcrWord[]>();

  const [loadingScreenshot, setLoadingScreenshot] = useState(false);
  const [loadingTexts, setLoadingTexts] = useState(false);
  const [progress, setProgress] = useState(0);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const fetchOcrWords = async () => {
    try {
      setLoadingTexts(true);
      const ocrData = await extractTextFromImage(
        base64Image,
        setProgress,
        dimensions
      );

      setOcrWords(ocrData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingTexts(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProgress(0);
    setLoadingScreenshot(true);
    setOcrWords([]);

    const formData = new FormData(event.currentTarget);
    const url = formData.get('url')?.toString() || '';
    setUrl(url);

    try {
      const imageWidth = window?.innerWidth * SCREENSHOT_WIDTH_PERCENTAGE;
      const base64Image = await fetchScreenshot(url, imageWidth);
      setBase64Image(base64Image || '');
      setLoadingScreenshot(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingScreenshot(false);
    }
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleImageLoad = (e: ChangeEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.target;

    setDimensions({
      width: naturalWidth,
      height: naturalHeight
    });
  };

  useEffect(() => {
    if (
      base64Image &&
      !ocrWords?.length &&
      dimensions.height &&
      dimensions.width
    ) {
      fetchOcrWords();
    }
  }, [base64Image, ocrWords, dimensions]);

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
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="flex items-center gap-2">
                {loadingScreenshot
                  ? 'Taking a screenshot...'
                  : 'Analyzing texts in screenshot... It might take a few minutes.'}{' '}
                <span className="inline-block w-5 h-5 border-2 border-blue-500 rounded-full animate-spin border-t-transparent" />
              </p>
              <ProgressBar value={progress} className="rounded-none" />
            </div>
          )}
          {base64Image && (
            <div className="relative">
              <img
                src={base64Image}
                alt="screenshot"
                className="w-full"
                onLoad={handleImageLoad}
              />
              {progress !== 100 ? (
                <LoadingOverlay progress={progress} />
              ) : ocrWords?.length ? (
                <WordOverlay words={ocrWords} />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
