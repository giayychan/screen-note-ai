'use client';

import type React from 'react';

import { useRouter } from 'next/navigation';
import WordListActions from './WordListActions';
import WordCards from './WordCards';
import { User } from '@supabase/supabase-js';
import type { WordDefinition } from '@/store/useWordsStore';
import useWordsStore from '@/store/useWordsStore';

type WordListProps = {
  words: WordDefinition[];
  user: User | null;
};

const WordList = ({ words, user }: WordListProps) => {
  const router = useRouter();
  const setWords = useWordsStore((state) => state.setWords);

  const generateArticle = () => {};

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
        <>
          <WordListActions
            onGenerateArticle={generateArticle}
            onSaveList={saveList}
            onClearList={clearList}
          />
          <WordCards words={words} setWords={setWords} />
        </>
      ) : (
        <div className="px-5 text-center">
          No word in the list yet. <br />
          Click on the word in the screenshot to save.
        </div>
      )}
    </>
  );
};

export default WordList;
