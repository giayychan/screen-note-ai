import type { OcrWord } from '@/store/useScreenshotStore';
import { useEffect, useState } from 'react';
import {
  extractTextFromImage,
  fetchScreenshot,
  SCREENSHOT_WIDTH_PERCENTAGE
} from './utils';
import useScreenshotStore from '@/store/useScreenshotStore';

export function useScreenshot() {
  const [loading, setLoading] = useState(false);

  const base64Image = useScreenshotStore((state) => state.base64Image);
  const setBase64Image = useScreenshotStore((state) => state.setBase64Image);
  const url = useScreenshotStore((state) => state.url);
  const setUrl = useScreenshotStore((state) => state.setUrl);

  const fetchImage = async (url: string) => {
    try {
      setLoading(true);
      const imageWidth = window?.innerWidth * SCREENSHOT_WIDTH_PERCENTAGE;
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

export function useOcr(
  base64Image: string,
  dimensions: { width: number; height: number }
) {
  const [ocrWords, setOcrWords] = useState<OcrWord[]>();
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const fetchOcrWords = async () => {
    try {
      setLoading(true);
      const words = await extractTextFromImage(
        base64Image,
        setProgress,
        dimensions
      );
      setOcrWords(words);
    } catch (error) {
      console.error('Error fetching OCR words:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (base64Image && dimensions.width && dimensions.height && !ocrWords) {
      fetchOcrWords();
    }
  }, [base64Image, dimensions, ocrWords]);

  return { ocrWords, loading, progress, setProgress, setOcrWords };
}
