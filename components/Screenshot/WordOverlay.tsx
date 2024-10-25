import { useState, memo } from 'react';
import useWordsStore, { WordDefinition } from '@/stores/useWordsStore';
import { nanoid } from 'nanoid';
import { OcrWord } from '@/stores/useScreenshotStore';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import Button from '../ui/Button';

interface WordOverlayProps {
  words: OcrWord[];
}

interface WordProps {
  word: OcrWord;
}

const WordComponent = memo(({ word }: WordProps) => {
  const [dictionary, setDictionary] = useState<WordDefinition['dictionary']>();
  const [loading, setLoading] = useState(false);

  const addWord = useWordsStore((state) => state.addWord);

  const getAIDictionary = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/python/fastapi/ai_dictionary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          word: word.text,
          context: word.line.text
        })
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw Error(data?.error || 'Something went wrong.');
      }

      if (data) {
        const dictionary = JSON.parse(data);
        setDictionary(dictionary);
      }
    } catch (error: any) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWord = (word: OcrWord) => {
    if (!dictionary) return;

    addWord({
      text: word.text,
      dictionary,
      id: nanoid()
    });
  };

  const handlePopOverOpenChange = async (open: boolean) => {
    if (open) {
      await getAIDictionary();
    }
  };

  return (
    <div
      className="absolute"
      style={{
        top: `${word.bbox.y0}%`,
        left: `${word.bbox.x0}%`,
        width: `${word.bbox.x1 - word.bbox.x0}%`,
        height: `${word.bbox.y1 - word.bbox.y0}%`
      }}
    >
      <Popover onOpenChange={handlePopOverOpenChange}>
        <PopoverTrigger className="size-full hover:outline outline-1 outline-offset-1"></PopoverTrigger>
        <PopoverContent align="start">
          <p className="pb-1 text-base font-bold md:text-xl first-letter:uppercase">
            {word.text}
          </p>
          {loading ? (
            <span>Loading ai dictionary...</span>
          ) : dictionary ? (
            <>
              <p className="pb-3 text-sm font-thin lg:text-base first-letter:uppercase">
                {dictionary.part_of_speech}
              </p>
              <p className="pb-6 text-sm lg:text-base ">
                {dictionary.definition}
              </p>
              <p className="pb-6 text-sm italic">
                Example: "{dictionary.example}"
              </p>
              <Button onClick={() => handleAddWord(word)}>
                Add to word list
              </Button>
            </>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
});

export const WordOverlay = ({ words }: WordOverlayProps) => {
  return words.map((word, index) => <WordComponent key={index} word={word} />);
};
