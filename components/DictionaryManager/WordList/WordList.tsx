'use client';

import type React from 'react';

import { useRouter } from 'next/navigation';
import WordListActions from './WordListActions';
import WordCards from './WordCards';
import { User } from '@supabase/supabase-js';
import type { WordDefinition } from '@/stores/useWordsStore';
import useWordsStore from '@/stores/useWordsStore';
import { useStore } from 'zustand';

type WordListProps = {
  words: WordDefinition[];
  user: User | null;
};

const WordList = ({ words, user }: WordListProps) => {
  const router = useRouter();
  const setWords = useStore(useWordsStore, (state) => state.setWords);

  const saveList = () => {
    if (user) console.log('Saving...');
    else router.push('/signin');
  };

  const clearList = () => {
    setWords([]);
  };

  return (
    <>
      {words.length > 0 ? (
        <div className="lg:top-0 lg:sticky lg:pt-10 lg:h-screen lg:overflow-y-scroll">
          <WordListActions onSaveList={saveList} onClearList={clearList} />
          <WordCards words={words} setWords={setWords} />
        </div>
      ) : (
        <div className="px-5 pb-10 text-center lg:pt-10">
          No word in the list yet. <br />
          Click on the word in the screenshot to save.
        </div>
      )}
    </>
  );
};

export default WordList;
