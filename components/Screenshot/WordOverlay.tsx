import { useState } from 'react';
import useWordsStore, { WordDefinition } from '@/stores/useWordsStore';
import { nanoid } from 'nanoid';
import { OcrWord } from '@/stores/useScreenshotStore';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import Button from '../ui/Button';
import { useStore } from 'zustand';
import axios from 'axios';

interface WordOverlayProps {
  words: OcrWord[];
}

interface WordProps {
  word: OcrWord;
}

const WordComponent = ({ word }: WordProps) => {
  const [dictionary, setDictionary] = useState<WordDefinition['dictionary']>();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const addWord = useStore(useWordsStore, (state) => state.addWord);

  const getAIDictionary = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        '/api/python/fastapi/ai_dictionary',
        {
          word: word.text,
          context: word.line.text
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data?.error || 'Something went wrong.');
      }

      if (response.data) {
        const dictionary = JSON.parse(response.data);
        setDictionary(dictionary);
      }
    } catch (error: any) {
      console.error(error?.message);
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

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 3000);
  };

  const handlePopOverOpenChange = async (open: boolean) => {
    if (open) {
      await getAIDictionary();
    }
  };

  const placement = {
    top: `${word.bbox.y0}%`,
    left: `${word.bbox.x0}%`,
    width: `${word.bbox.x1 - word.bbox.x0}%`,
    height: `${word.bbox.y1 - word.bbox.y0}%`
  };

  return (
    <div className="absolute" style={placement}>
      <Popover onOpenChange={handlePopOverOpenChange}>
        <PopoverTrigger className="text-transparent hover:bg-yellow-500 size-full hover:outline outline-yellow-500 hover:bg-opacity-40 outline-1 outline-offset-1">
          {word.text}
        </PopoverTrigger>
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
              <div className="flex items-center gap-2">
                <Button onClick={() => handleAddWord(word)}>
                  Add to word list
                </Button>
                {added && <p>Added!</p>}
              </div>
            </>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const WordOverlay = ({ words }: WordOverlayProps) => {
  return words.map((word, index) => <WordComponent key={index} word={word} />);
};
