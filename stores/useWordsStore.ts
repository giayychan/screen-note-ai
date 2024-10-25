'use client';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface WordDefinition {
  text: string;
  dictionary: {
    definition: string;
    example: string;
    part_of_speech: string;
  };
  id: string;
}

export interface WordsState {
  words: WordDefinition[];
  addWord: (newWord: WordDefinition[] | WordDefinition) => WordDefinition[];
  removeWords: () => void;
  removeWordById: (id: string) => WordDefinition[];
  setWords: (words: WordDefinition[]) => void;
}

const useWordsStore = create<WordsState>()(
  devtools(
    persist(
      (set) => ({
        words: [],
        setWords: (words) => set(() => ({ words: words })),
        addWord: (newWord) => {
          let newState: { words: WordDefinition[] } = { words: [] };

          set((state) => {
            if (Array.isArray(newWord)) {
              newState = { words: [...newWord, ...state.words] };
            } else {
              newState = { words: [newWord, ...state.words] };
            }
            return newState;
          });

          return newState.words;
        },
        removeWordById: (id) => {
          let newState: { words: WordDefinition[] } = { words: [] };

          set((state) => {
            newState = { words: state.words.filter((w) => w.id !== id) };
            return { words: newState.words };
          });

          return newState.words;
        },
        removeWords: () => set(() => ({ words: [] }))
      }),
      {
        name: 'words-storage'
      }
    )
  )
);

export default useWordsStore;
