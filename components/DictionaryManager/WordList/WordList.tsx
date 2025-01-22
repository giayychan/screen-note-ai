'use client';

import type React from 'react';

import { usePathname, useRouter } from 'next/navigation';
import WordListActions from './WordListActions';
import WordCards from './WordCards';
import { User } from '@supabase/supabase-js';
import type { WordDefinition } from '@/stores/useWordsStore';
import useWordsStore from '@/stores/useWordsStore';
import { useStore } from 'zustand';
import { createClient } from '@/utils/supabase/client';
import useScreenshotStore from '@/stores/useScreenshotStore';

type WordListProps = {
  words: WordDefinition[];
};

const WordList = ({ words }: WordListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const setWords = useStore(useWordsStore, (state) => state.setWords);
  const reset = useStore(useScreenshotStore, (state) => state.reset);
  const url = useStore(useScreenshotStore, (state) => state.url);
  const base64Image = useStore(
    useScreenshotStore,
    (state) => state.base64Image
  );

  const supabase = createClient();

  const saveList = async (listName: string) => {
    try {
      const res = await supabase.auth.getUser();
      const user = res.data.user;

      if (!user) {
        router.push('/signin');
        return;
      }

      const response = await supabase
        .from('lists')
        .insert({
          user_id: (user as User).id,
          name: listName,
          origin_url: url,
          origin_url_screenshot_base64: base64Image
        })
        .select('id');

      if (response.data) {
        const listId = response.data[0].id;

        const wordsToInsert = words.map((word) => ({
          list_id: listId,
          text: word.text,
          definition: word.dictionary.definition,
          example: word.dictionary.example,
          part_of_speech: word.dictionary.part_of_speech
        }));

        await supabase.from('words').insert(wordsToInsert);

        setWords([]);
        reset();

        router.push(`/list/${listId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearList = async () => {
    const wordIds = words.map((word) => word.id);

    if (pathname.includes('/list')) {
      const { data, error } = await supabase
        .from('words')
        .delete()
        .in('id', wordIds);

      if (error) {
        console.error('Error deleting words:', error);
      } else {
        console.log('Deleted words:', data);
        setWords([]);
      }
    } else {
      setWords([]);
    }
  };

  return (
    <>
      {words.length > 0 ? (
        <div className="lg:top-0 lg:sticky lg:h-screen lg:overflow-y-auto">
          <WordListActions onSaveList={saveList} onClearList={clearList} />
          <WordCards words={words} setWords={setWords} />
        </div>
      ) : (
        <div className="px-5 pb-10 text-center">
          No word in the list yet. <br />
          Click on the word in the screenshot to save.
        </div>
      )}
    </>
  );
};

export default WordList;
