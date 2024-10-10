'use client';

import {
  fetchDictionaryWords,
  type WordDefinition
} from '@/services/dictionary';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRef, useState } from 'react';
import { useToast } from '../ui/Toasts/use-toast';

import type { User } from '@supabase/supabase-js';
import { isStringArray, SearchForm } from './SearchForm';
import { WordList } from './WordList';
import { Article } from './Article';

type DictionaryManagerProps = {
  user: User | null;
};

const DictionaryManager = ({ user }: DictionaryManagerProps) => {
  const [words, setWords] = useLocalStorage<WordDefinition[]>('words', []);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<WordDefinition[]>([]);
  const [articlePanelOpened, setArticlePanelOpened] = useState(false);

  const { toast: showToast } = useToast();
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleSearch: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const results = await fetchDictionaryWords(value);

      if (!results.length || isStringArray(results)) {
        showToast({
          variant: 'destructive',
          title: 'This word does not exist in the dictionary'
        });
        return;
      }

      setSuggestions(results);
    } catch (error) {
      console.error(error);
    }
  };

  const addWordToList = (newWord: WordDefinition) => {
    if (words.some((w) => w.meta.uuid === newWord.meta.uuid)) {
      showToast({
        variant: 'destructive',
        title: 'This word is already in the list.'
      });
      return;
    }
    setWords([newWord, ...words]);
    setSuggestions([]);
    setValue('');
  };

  return (
    <div className="flex w-full gap-10 p-10">
      <div
        className={`flex flex-col items-center ${articlePanelOpened ? 'w-1/3' : 'w-full'}`}
      >
        <SearchForm
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSubmit={handleSearch}
          suggestions={suggestions}
          onSuggestionClick={addWordToList}
          suggestionsRef={suggestionsRef}
        />

        <WordList
          user={user}
          words={words}
          setWords={setWords}
          setArticlePanelOpened={setArticlePanelOpened}
        />
      </div>
      {articlePanelOpened && (
        <div className="w-2/3">
          <Article words={words} />
        </div>
      )}
    </div>
  );
};

export default DictionaryManager;
