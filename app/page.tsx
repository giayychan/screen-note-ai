'use client';

import { DictionaryManager } from '@/components/DictionaryManager';
import { ScreenshotPage } from '@/components/Screenshot';
import Divider from '@/components/ui/Divider';
import useScreenshotStore from '@/stores/useScreenshotStore';
import useWordsStore from '@/stores/useWordsStore';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    useWordsStore.persist.setOptions({
      name: `words-storage-in-homepage`
    });
    useScreenshotStore.persist.setOptions({
      name: `screenshot-storage-in-homepage`
    });
    useScreenshotStore.persist.rehydrate();
    useWordsStore.persist.rehydrate();

    localStorage.removeItem('screenshot-storage');
    localStorage.removeItem('words-storage');

    setIsHydrated(
      useScreenshotStore.persist.hasHydrated() &&
        useWordsStore.persist.hasHydrated()
    );
  }, []);

  return isHydrated ? (
    <main className="flex flex-col min-h-screen gap-20 border-t-2 lg:flex-row lg:justify-evenly lg:gap-0">
      <ScreenshotPage />
      <Divider className="hidden lg:block" />
      <DictionaryManager />
    </main>
  ) : null;
}
