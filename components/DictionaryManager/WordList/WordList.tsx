'use client';

import type React from 'react';
import type { WordDefinition } from '@/services/dictionary';

import { useRouter } from 'next/navigation';
import WordListActions, { GenerateArticleButton } from './WordListActions';
import WordCards from './WordCards';
import { User } from '@supabase/supabase-js';

type WordListProps = {
  words: WordDefinition[];
  setWords: React.Dispatch<React.SetStateAction<WordDefinition[]>>;
  user: User | null;
  setArticlePanelOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const WordList = ({
  words,
  setWords,
  user,
  setArticlePanelOpened
}: WordListProps) => {
  const router = useRouter();

  const generateArticle = () => {
    setArticlePanelOpened(true);
  };

  const saveList = () => {
    if (user) console.log('Saving...');
    else router.push('/signin');
  };

  const clearList = () => {
    setWords([]);
    setArticlePanelOpened(false);
  };

  return (
    <>
      {words.length > 0 && (
        <>
          <GenerateArticleButton onGenerateArticle={generateArticle} />
          <WordCards words={words} setWords={setWords} />
          <WordListActions
            onGenerateArticle={generateArticle}
            onSaveList={saveList}
            onClearList={clearList}
          />
        </>
      )}
    </>
  );
};

export default WordList;
