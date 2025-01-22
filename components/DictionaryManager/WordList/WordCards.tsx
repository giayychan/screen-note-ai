'use client';
import type React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardSettings
} from '@/components/ui/card';

import { LucideCircleEllipsis } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { WordDefinition, WordsState } from '@/stores/useWordsStore';
import { usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

type WordCardsProps = {
  words: WordDefinition[];
  setWords: WordsState['setWords'];
};

const WordCards = ({ words, setWords }: WordCardsProps) => {
  const pathname = usePathname();
  const supabase = createClient();

  const handleRemoveWord = async (wordId: string) => {
    try {
      if (pathname.includes('/list')) {
        const { error } = await supabase
          .from('words')
          .delete()
          .eq('id', wordId);

        if (error) {
          console.error('Error deleting word:', error);
        } else {
          setWords(words.filter((w) => w.id !== wordId));
        }
      } else {
        setWords(words.filter((w) => w.id !== wordId));
      }
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  };

  return (
    <div className="flex flex-col gap-2 px-2 pb-10 lg:gap-5">
      {words.map((word) => (
        <Card key={word.id}>
          <CardSettings>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <LucideCircleEllipsis className="text-current transform rotate-90" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleRemoveWord(word.id)}>
                  Remove from List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardSettings>
          <CardHeader>
            <CardTitle className="text-md md:text-lg lg:text-xl first-letter:uppercase">
              {word.text}
            </CardTitle>
            <p className="text-sm font-light lg:text-base first-letter:uppercase">
              {word.dictionary.part_of_speech}
            </p>
          </CardHeader>
          <CardContent className="text-sm lg:text-base">
            <p>{word.dictionary.definition}</p>
            <br />
            <p className="text-sm italic">
              Example: "{word.dictionary.example}"
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WordCards;
