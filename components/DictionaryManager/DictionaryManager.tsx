'use client';

import { WordList } from './WordList';
import useWordsStore from '@/stores/useWordsStore';
import { usePathname } from 'next/navigation';
import { useStore } from 'zustand';
import Instruction from './WordList/Instruction';

const DictionaryManager = () => {
  const words = useStore(useWordsStore, (state) => state.words);
  const pathname = usePathname();

  return (
    <div className="lg:flex-1">
      {pathname === '/' && (
        <h2 className="pt-10 pb-5 text-center lg:p-10 lg:pb-3">
          Words Notebook 📘
        </h2>
      )}
      <Instruction defaultIsHidden={words.length > 0} />
      <WordList words={words} />
    </div>
  );
};

export default DictionaryManager;
