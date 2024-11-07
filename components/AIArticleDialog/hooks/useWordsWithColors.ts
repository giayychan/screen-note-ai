import { useMemo } from 'react';
import randomColor from 'randomcolor';
import { WordDefinition } from '@/stores/useWordsStore';

const useWordsWithColors = (words: WordDefinition[]) => {
  return useMemo(() => {
    return words.map((w) => ({
      ...w,
      bgColor: randomColor({ luminosity: 'dark' })
    }));
  }, [words]);
};

export default useWordsWithColors;
