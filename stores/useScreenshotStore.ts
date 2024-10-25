'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { Bbox } from 'tesseract.js';

export type OcrWord = { line: { text: string }; text: string; bbox: Bbox };

export interface ScreenshotState {
  url: string;
  setUrl: (url: string) => void;
  base64Image: string;
  setBase64Image: (base64Image: string) => void;
}

const useScreenshotStore = create<ScreenshotState>()(
  devtools(
    persist(
      (set) => ({
        url: '',
        setUrl: (url) => set(() => ({ url })),
        base64Image: '',
        setBase64Image: (base64Image) => set(() => ({ base64Image }))
      }),
      {
        name: 'screenshot-storage'
      }
    )
  )
);

export default useScreenshotStore;
