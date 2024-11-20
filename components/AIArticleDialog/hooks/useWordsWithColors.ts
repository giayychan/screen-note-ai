import { useMemo } from 'react';
import randomColor from 'randomcolor';
import { WordDefinition } from '@/stores/useWordsStore';
import { useTheme } from 'next-themes';

const useWordsWithColors = (words: WordDefinition[]) => {
  const { theme } = useTheme();

  return useMemo(() => {
    return words.map((w) => ({
      ...w,
      bgColor: randomColor({
        luminosity:
          theme === 'light' ? 'dark' : theme === 'dark' ? 'light' : 'bright'
      })
    }));
  }, [words]);
};

export default useWordsWithColors;
