import type React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardSettings
} from '@/components/ui/card';

import { LucideCircleEllipsis, Volume1 } from 'lucide-react';
import { createSoundLink } from './utils';
import { WordDefinition } from '@/services/dictionary';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

type WordCardsProps = {
  words: WordDefinition[];
  setWords: React.Dispatch<React.SetStateAction<WordDefinition[]>>;
};

const WordCards = ({ words, setWords }: WordCardsProps) => {
  const handleRemoveWord = (wordId: string) => {
    setWords(words.filter((w) => w.meta.uuid !== wordId));
  };

  const handleAudioPlay = (wordId: string) => {
    const audio = document.getElementById(
      `word_audio-${wordId}`
    ) as HTMLAudioElement;
    audio?.play();
  };

  return (
    <div className="flex flex-col gap-5 py-10">
      {words.map((word) => (
        <Card key={word.meta.uuid}>
          <CardSettings>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <LucideCircleEllipsis className="text-current transform rotate-90" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleRemoveWord(word.meta.uuid)}
                >
                  Remove from List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardSettings>
          <CardHeader>
            <CardTitle>{word.hwi.hw.replaceAll('*', '·')}</CardTitle>
            {word.fl && <CardDescription>({word.fl})</CardDescription>}
            {word.hwi.prs && (
              <CardDescription>
                {word.hwi.prs.map((pr) =>
                  pr.sound ? (
                    <span
                      key={pr.sound.audio}
                      className="flex items-center gap-1"
                    >
                      <span>{pr.mw}</span>
                      <button onClick={() => handleAudioPlay(word.meta.uuid)}>
                        <Volume1 className="text-black dark:text-white" />
                      </button>
                      <audio
                        id={`word_audio-${word.meta.uuid}`}
                        src={createSoundLink({ baseFilename: pr.sound.audio })}
                      />
                    </span>
                  ) : null
                )}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-1">
              {word.shortdef.map((def) => (
                <li key={def}>{def}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WordCards;
