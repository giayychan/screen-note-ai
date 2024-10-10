import type React from 'react';

type HighlightedWordProps = {
  word: string;
  isInList: boolean;
  onClick: (word: string) => void;
};

const HighlightedWord = ({ word, isInList, onClick }: HighlightedWordProps) => {
  return (
    <span
      onClick={() => onClick(word)}
      className={`cursor-pointer hover:underline ${isInList ? 'bg-red-500' : ''}`}
    >
      {word}{' '}
    </span>
  );
};

export default HighlightedWord;
