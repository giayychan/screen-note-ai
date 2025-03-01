'use client';

import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { Bbox } from 'tesseract.js';

import { compress, decompress } from 'lz-string';

export type OcrWord = { line: { text: string }; text: string; bbox: Bbox };

export interface ScreenshotState {
  url: string;
  setUrl: (url: string) => void;
  base64Image: string;
  setBase64Image: (base64Image: string) => void;
  ocrWords?: OcrWord[];
  setOcrWords: (words?: OcrWord[]) => void;
  reset: () => void;
}

const storage = createJSONStorage<ScreenshotState>(() => localStorage, {
  reviver: (key, value) => {
    if (key === 'ocrWords') {
      if (typeof value === 'string') {
        const newValue = JSON.parse(decompress(value));
        return newValue;
      }

      return value;
    }

    if (key === 'base64Image' && typeof value === 'string') {
        const newValue = decompress(value)
        return newValue;
    }

    return value;
  },
  replacer: (key, value) => {
    if (key === 'ocrWords') {
      if (Array.isArray(value) && value.length) {
        const newValue = compress(JSON.stringify(value));
        return newValue;
      }
      return value;
    }
    
    if (key === 'base64Image' && typeof value === 'string') {
        const newValue = compress(value);
        return newValue;
    }
    return value;
  }
});

const useScreenshotStore = create<ScreenshotState>()(
  devtools(
    persist(
      (set) => ({
        url: '',
        setUrl: (url) => set(() => ({ url })),
        base64Image: '',
        setBase64Image: (base64Image) => set(() => ({ base64Image })),
        ocrWords: undefined,
        setOcrWords: (ocrWords) => set(() => ({ ocrWords })),
        reset: () =>
          set(() => ({ url: '', base64Image: '', ocrWords: undefined }))
      }),
      {
        name: 'screenshot-storage',
        storage
      }
    )
  )
);

export default useScreenshotStore;
