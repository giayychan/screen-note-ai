import { OcrWord } from '@/stores/useScreenshotStore';
import { recognize } from 'tesseract.js';
import axios from 'axios';

export const SCREENSHOT_WIDTH_PERCENTAGE = 60 / 100;
export const CONFIDENCE_THRESHOLD = 40;

export const fetchScreenshot = async (url: string, screenshotWidth: number) => {
  try {
    const response = await axios.post(
      '/api/screenshot',
      { url, screenshotWidth },
      {
        responseType: 'arraybuffer'
      }
    );

    const encoded = Buffer.from(response.data, 'binary').toString('base64');
    return `data:image/jpeg;base64,${encoded}`;
  } catch (error) {
    console.error('Failed to fetch screenshot:', error);
    throw new Error('Failed to fetch screenshot');
  }
};

export const extractTextFromImage = async (
  base64Image: string,
  setProgress: (value: number) => void
): Promise<OcrWord[]> => {
  const dimensions = await getImageDimensions(base64Image);
  const { data } = await recognize(base64Image, 'eng', {
    logger: (m) => {
      // minus 1 to prevent 100% progress and finish the process when the words are reduced
      if (m.status === 'recognizing text') setProgress(m.progress * 100 - 1);
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

      const sanitizedWordText = w.text.replace(/[^a-zA-Z0-9]+$/, '');

      acc.push({
        text: sanitizedWordText,
        bbox,
        line: { text: w.line.text }
      });
    }
    return acc;
  }, []);
  
  setProgress(100);
  return storageOcrWords;
};

function getImageDimensions(
  base64Image: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = reject;
    img.src = base64Image;
  });
}
