'use client';

import { useEffect, useState } from 'react';
import { DictionaryManager } from '../DictionaryManager';
import ScreenshotPage from '../Screenshot/ScreenshotPage';
import Divider from '../ui/Divider';
import useScreenshotStore from '@/stores/useScreenshotStore';
import { useStore } from 'zustand';
import useWordsStore, { WordDefinition } from '@/stores/useWordsStore';

const ScreenShotAndWords = ({
  base64Image,
  url,
  words
}: {
  base64Image: string;
  url: string;
  words: WordDefinition[];
}) => {
  const setBase64Image = useStore(
    useScreenshotStore,
    (state) => state.setBase64Image
  );
  const setUrl = useStore(useScreenshotStore, (state) => state.setUrl);
  const reset = useStore(useScreenshotStore, (state) => state.reset);
  const setWords = useStore(useWordsStore, (state) => state.setWords);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    useWordsStore.persist.setOptions({
      name: `words-storage-in-list`
    });
    useScreenshotStore.persist.setOptions({
      name: `screenshot-storage-in-list`
    });
    useScreenshotStore.persist.rehydrate();
    useWordsStore.persist.rehydrate();

    localStorage.removeItem('screenshot-storage');
    localStorage.removeItem('words-storage');

    reset();
    setWords([]);

    setIsHydrated(
      useScreenshotStore.persist.hasHydrated() &&
        useWordsStore.persist.hasHydrated()
    );
  }, []);

  useEffect(() => {
    if (isHydrated) {
      setBase64Image(base64Image);
      setUrl(url);
      setWords(words);
    }
  }, [isHydrated, base64Image, url, words]);

  return isHydrated ? (
    <main className="flex flex-col min-h-screen gap-20 lg:flex-row lg:justify-evenly lg:gap-0">
      <ScreenshotPage />
      <Divider className="hidden lg:block" />
      <DictionaryManager />
    </main>
  ) : null;
};

export default ScreenShotAndWords;
