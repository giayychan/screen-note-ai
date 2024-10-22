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
import type { WordDefinition, WordsState } from '@/store/useWordsStore';

type WordCardsProps = {
  words: WordDefinition[];
  setWords: WordsState['setWords'];
};

const WordCards = ({ words, setWords }: WordCardsProps) => {
  const handleRemoveWord = (wordId: string) => {
    setWords(words.filter((w) => w.id !== wordId));
  };

  return (
    <div className="flex flex-col gap-5 px-2">
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
            <CardTitle>{word.text}</CardTitle>
          </CardHeader>
          <CardContent>{word.definition}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WordCards;
