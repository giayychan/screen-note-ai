import { useState, memo } from 'react';
import Button from '../ui/Button';
import useWordsStore from '@/stores/useWordsStore';
import { nanoid } from 'nanoid';
import { OcrWord } from '@/stores/useScreenshotStore';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

interface WordOverlayProps {
  words: OcrWord[];
}

interface WordProps {
  word: OcrWord;
}

const WordComponent = memo(({ word }: WordProps) => {
  const [meaning, setMeaning] = useState('');
  const [loading, setLoading] = useState(false);

  const addWord = useWordsStore((state) => state.addWord);

  const getAIDefinition = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bert-definition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          word: word.text,
          context: word.paragraph.text
        })
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw Error(data.error);
      }

      setMeaning(data.definition);
    } catch (error: any) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWord = (word: OcrWord) => {
    addWord({
      text: word.text,
      definition: meaning,
      id: nanoid()
    });
  };

  const handlePopOverOpenChange = async (open: boolean) => {
    if (open) {
      await getAIDefinition();
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
          <p>{word.text}</p>
          {loading ? (
            <span>Loading definition...</span>
          ) : meaning ? (
            <div>
              <p>{meaning}</p>
              <Button onClick={() => handleAddWord(word)}>
                Add to word list
              </Button>
            </div>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
});

export const WordOverlay = ({ words }: WordOverlayProps) => {
  return words.map((word, index) => <WordComponent key={index} word={word} />);
};
