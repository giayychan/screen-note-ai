import { Input } from '@/components/ui/input';
import { WordDefinition } from '@/services/dictionary';
import type React from 'react';
import SuggestionsList from './SuggestionsList';

type SearchFormProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  suggestions: WordDefinition[];
  onSuggestionClick: (value: WordDefinition) => void;
  suggestionsRef: React.RefObject<HTMLDivElement>;
};

const SearchForm = ({
  value,
  onChange,
  onSubmit,
  suggestions,
  onSuggestionClick,
  suggestionsRef
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="relative">
      <Input
        value={value}
        onChange={onChange}
        placeholder="Enter a vocabulary"
      />
      {value && suggestions.length > 0 && (
        <SuggestionsList
          suggestions={suggestions}
          onClick={onSuggestionClick}
          suggestionsRef={suggestionsRef}
        />
      )}
    </form>
  );
};

export default SearchForm;
