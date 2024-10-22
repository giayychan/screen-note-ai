'use client';

import type { User } from '@supabase/supabase-js';
import { WordList } from './WordList';
import useWordsStore from '@/store/useWordsStore';

type DictionaryManagerProps = {
  user: User | null;
};

const DictionaryManager = ({ user }: DictionaryManagerProps) => {
  const words = useWordsStore((state) => state.words);

  return (
    <div className="flex-1">
      <h2 className="p-10 text-3xl font-bold text-center">Words Notebook 📘</h2>
      <WordList user={user} words={words} />
    </div>
  );
};

export default DictionaryManager;
