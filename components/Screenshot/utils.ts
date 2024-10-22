import { OcrWord } from '@/stores/useScreenshotStore';
import { recognize } from 'tesseract.js';

export const SCREENSHOT_WIDTH_PERCENTAGE = 60 / 100;
export const CONFIDENCE_THRESHOLD = 40;

export const fetchScreenshot = async (url: string, screenshotWidth: number) => {
  const response = await fetch('/api/screenshot', {
    method: 'POST',
    body: JSON.stringify({ url, screenshotWidth })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch screenshot');
  }

  const encoded = Buffer.from(await response.arrayBuffer()).toString('base64');
  return `data:image/jpeg;base64,${encoded}`;
};

export const extractTextFromImage = async (
  base64Image: string,
  setProgress: (value: number) => void,
  dimensions: { height: number; width: number }
): Promise<OcrWord[]> => {
  const { data } = await recognize(base64Image, 'eng', {
    logger: (m) => {
      if (m.status === 'recognizing text') setProgress(m.progress * 100);
    }
  });

  const storageOcrWords = data.words.reduce<OcrWord[]>((acc, w) => {
    if (
      !w.is_numeric &&
      w.direction === 'LEFT_TO_RIGHT' &&
      (w.confidence > CONFIDENCE_THRESHOLD || w.in_dictionary) &&
      w.line.confidence > CONFIDENCE_THRESHOLD
    ) {
      const bbox = {
        x0: (w.bbox.x0 / dimensions.width) * 100,
        y0: (w.bbox.y0 / dimensions.height) * 100,
        x1: (w.bbox.x1 / dimensions.width) * 100,
        y1: (w.bbox.y1 / dimensions.height) * 100
      };

      acc.push({
        text: w.text,
        bbox,
        paragraph: { text: w.paragraph.text }
      });
    }
    return acc;
  }, []);

  return storageOcrWords;
};
