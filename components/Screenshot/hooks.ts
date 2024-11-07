import { useEffect, useState } from 'react';
import {
  extractTextFromImage,
  fetchScreenshot,
  SCREENSHOT_WIDTH_PERCENTAGE
} from './utils';
import useScreenshotStore from '@/stores/useScreenshotStore';
import { useStore } from 'zustand';

export function useScreenshot(containerWidth?: number) {
  const [loading, setLoading] = useState(false);

  const base64Image = useStore(
    useScreenshotStore,
    (state) => state.base64Image
  );
  const setBase64Image = useStore(
    useScreenshotStore,
    (state) => state.setBase64Image
  );
  const url = useStore(useScreenshotStore, (state) => state.url);
  const setUrl = useStore(useScreenshotStore, (state) => state.setUrl);

  const fetchImage = async (url: string) => {
    try {
      setBase64Image('');
      setLoading(true);
      const imageWidth =
        containerWidth || window?.innerWidth * SCREENSHOT_WIDTH_PERCENTAGE;
      const image = await fetchScreenshot(url, imageWidth);
      setBase64Image(image || '');
    } catch (error) {
      console.error('Error fetching screenshot:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    base64Image,
    loading,
    fetchImage,
    setUrl,
    url
  };
}

export function useOcr(base64Image: string) {
  const setOcrWords = useScreenshotStore((state) => state.setOcrWords);
  const ocrWords = useScreenshotStore((state) => state.ocrWords);

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const fetchOcrWords = async () => {
    try {
      setLoading(true);
      const words = await extractTextFromImage(base64Image, setProgress);
      setOcrWords(words);
    } catch (error) {
      console.error('Error fetching OCR words:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (base64Image) {
      if (!ocrWords) fetchOcrWords();
      else setProgress(100);
    }
  }, [base64Image, ocrWords]);

  return { ocrWords, loading, progress, setProgress, setOcrWords };
}
