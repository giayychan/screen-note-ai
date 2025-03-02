import React, { memo } from 'react';
import LoadingImageOverlay from '../ui/LoadingImageOverlay';
import { WordOverlay } from './WordOverlay';
import { OcrWord } from '@/stores/useScreenshotStore';

interface ImageViewerProps {
  base64Image: string | null;
  progress: number;
  ocrWords: OcrWord[] | undefined;
}

const ImageViewer = memo(
  ({ base64Image, progress, ocrWords }: ImageViewerProps) => {
    if (!base64Image) return null;

    let overlay = null;
    if (progress !== 100) {
      overlay = <LoadingImageOverlay progress={progress} />;
    } else if (!ocrWords || ocrWords.length === 0) {
      overlay = (
        <p className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
          No word found in the screenshot
        </p>
      );
    } else {
      overlay = <WordOverlay words={ocrWords} />;
    }

    return (
      <div className="relative">
        <img
          src={base64Image}
          alt="screenshot"
          className="w-full"
          loading="lazy"
        />
        {overlay}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.base64Image === nextProps.base64Image &&
      prevProps.progress === nextProps.progress &&
      prevProps.ocrWords === nextProps.ocrWords
    );
  }
);

ImageViewer.displayName = 'ImageViewer';

export default ImageViewer;
