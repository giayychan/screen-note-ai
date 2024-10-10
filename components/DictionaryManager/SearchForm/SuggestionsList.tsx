import { WordDefinition } from '@/services/dictionary';
import type React from 'react';

type SuggestionsListProps = {
  suggestions: WordDefinition[];
  onClick: (word: WordDefinition) => void;
  suggestionsRef: React.RefObject<HTMLDivElement>;
};

const SuggestionsList = ({
  suggestions,
  onClick,
  suggestionsRef
}: SuggestionsListProps) => {
  return (
    <div
      ref={suggestionsRef}
      className="absolute z-50 flex flex-col gap-2 p-3 bg-white border rounded-md top-full w-96"
    >
      <p className="text-xs text-gray-500">Suggestions</p>
      {suggestions.map((word) => (
        <button
          key={word.meta.uuid}
          type="button"
          className="flex w-full gap-2 p-1 text-sm transition-colors rounded-md hover:bg-slate-300 dark:hover:bg-slate-700 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300"
          onClick={() => onClick(word)}
        >
          {word.hwi.hw.replaceAll('*', '·')}
          {word.fl && <p>({word.fl})</p>}
        </button>
      ))}
    </div>
  );
};

export default SuggestionsList;
