import { useState, memo } from 'react';
import Button from '../ui/Button';
import useWordsStore from '@/stores/useWordsStore';
import { nanoid } from 'nanoid';
import { OcrWord } from '@/stores/useScreenshotStore';

interface WordOverlayProps {
  words: OcrWord[];
}

interface WordProps {
  word: OcrWord;
  isOpen: boolean;
  onClick: () => void;
}

const WordComponent = memo(({ word, isOpen, onClick }: WordProps) => {
  const [meaning, setMeaning] = useState('');
  const [loading, setLoading] = useState(false);

  const addWord = useWordsStore((state) => state.addWord);

  const onModalClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const getAIDefinition = async () => {
    onClick();
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
    onClick();
  };

  return (
    <div
      className="absolute w-full p-1 hover:outline outline-1 outline-offset-1"
      style={{
        top: `${word.bbox.y0}%`,
        left: `${word.bbox.x0}%`,
        width: `${word.bbox.x1 - word.bbox.x0}%`,
        height: `${word.bbox.y1 - word.bbox.y0}%`
      }}
      onClick={getAIDefinition}
    >
      {isOpen && (
        <div
          onClick={onModalClick}
          className="absolute flex flex-col gap-2 p-6 mb-1 -translate-x-1/2 rounded bottom-full left-1/2 text-primary bg-secondary w-96"
        >
          <div>
            <span className="outline outline-1 outline-offset-1">
              {word.text}
            </span>
          </div>

          {loading ? (
            <span>Loading definition...</span>
          ) : meaning ? (
            <div>
              <p>{meaning}</p>
              <Button onClick={() => handleAddWord(word)}>
                Add to word list
              </Button>
              <Button variant="ghost" onClick={onClick}>
                Close
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
});

export const WordOverlay = ({ words }: WordOverlayProps) => {
  const [openWordIndex, setOpenWordIndex] = useState<number | null>(null);

  const handleWordClick = (index: number) => {
    setOpenWordIndex(openWordIndex === index ? null : index);
  };

  return (
    <>
      {words.map((word, index) => (
        <WordComponent
          key={index}
          word={word}
          isOpen={openWordIndex === index}
          onClick={() => handleWordClick(index)}
        />
      ))}
    </>
  );
};
