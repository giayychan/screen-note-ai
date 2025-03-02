'use client';

import {
  type ChangeEvent,
  type FormEvent,
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
  memo
} from 'react';
import { useOcr, useScreenshot } from './hooks';
import { DebouncedUrlInput } from './UrlInput';
import LoadingSection from './LoadingSection';
import ImageViewer from './ImageViewer';
import { usePathname } from 'next/navigation';

const useContainerWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
    }

    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { ref, width };
};

interface LoadingSectionProps {
  progress: number;
  loadingScreenshot: boolean;
}

const MemoLoadingSection = memo(
  ({ progress, loadingScreenshot }: LoadingSectionProps) => (
    <LoadingSection progress={progress} loadingScreenshot={loadingScreenshot} />
  )
);
MemoLoadingSection.displayName = 'MemoLoadingSection';

export default function ScreenshotPage() {
  const { ref, width: containerWidth } = useContainerWidth();
  const pathname = usePathname();

  const {
    base64Image,
    loading: loadingScreenshot,
    fetchImage,
    url,
    setUrl,
    reset
  } = useScreenshot(containerWidth);

  const {
    ocrWords,
    loading: loadingTexts,
    progress,
    setProgress,
    setOcrWords
  } = useOcr(base64Image);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setProgress(0);
      setOcrWords(undefined);

      const formData = new FormData(event.currentTarget);
      const url = formData.get('url')?.toString() || '';
      setUrl(url);
      await fetchImage(url);
    },
    [setProgress, setOcrWords, setUrl, fetchImage]
  );

  const handleUrlChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUrl(event.target.value);
    },
    [setUrl]
  );

  const inputDisabled = useMemo(
    () => loadingScreenshot || loadingTexts || !url,
    [loadingScreenshot, loadingTexts, url]
  );

  const urlInputElement = useMemo(() => {
    if (pathname !== '/') return null;

    return (
      <DebouncedUrlInput
        onSubmit={onSubmit}
        value={url}
        onChange={handleUrlChange}
        disabled={inputDisabled}
        reset={reset}
      />
    );
  }, [pathname, onSubmit, url, handleUrlChange, inputDisabled, reset]);

  const shouldShowLoading = loadingScreenshot || loadingTexts;

  return (
    <div className="flex flex-col items-center w-full lg:w-[60vw]" ref={ref}>
      <div className="flex flex-col w-full gap-10 pb-2">
        {urlInputElement}
        <div>
          {shouldShowLoading && (
            <MemoLoadingSection
              progress={progress}
              loadingScreenshot={loadingScreenshot}
            />
          )}
          <ImageViewer
            base64Image={base64Image}
            progress={progress}
            ocrWords={ocrWords}
          />
        </div>
      </div>
    </div>
  );
}
