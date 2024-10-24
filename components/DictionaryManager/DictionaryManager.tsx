'use client';

import type { User } from '@supabase/supabase-js';
import { WordList } from './WordList';
import useWordsStore from '@/stores/useWordsStore';

type DictionaryManagerProps = {
  user: User | null;
};

const DictionaryManager = ({ user }: DictionaryManagerProps) => {
  const words = useWordsStore((state) => state.words);

  return (
    <div className="lg:flex-1">
      <h2 className="py-10 text-xl font-bold text-center md:text-3xl lg:p-10">
        Words Notebook 📘
      </h2>
      <WordList user={user} words={words} />
    </div>
  );
};

export default DictionaryManager;
