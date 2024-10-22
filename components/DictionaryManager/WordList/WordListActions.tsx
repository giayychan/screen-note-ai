import Button from '@/components/ui/Button';
import type React from 'react';

type WordListActionsProps = {
  onGenerateArticle: () => void;
  onSaveList: () => void;
  onClearList: () => void;
};

export const GenerateArticleButton = ({
  onGenerateArticle,
  className = ''
}: Pick<WordListActionsProps, 'onGenerateArticle'> & {
  className?: string;
}) => {
  return (
    <Button className={className ?? ''} onClick={onGenerateArticle}>
      Generate AI article 🤖
    </Button>
  );
};

const WordListActions = ({
  onGenerateArticle,
  onSaveList,
  onClearList
}: WordListActionsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center flex-1 gap-5 px-2 pb-32">
      <GenerateArticleButton onGenerateArticle={onGenerateArticle} />
      <div className="flex flex-wrap gap-5">
        <Button onClick={onSaveList} variant="outline">
          ✅ Save list
        </Button>
        <Button variant="secondary" onClick={onClearList}>
          🗑️ Clear
        </Button>
      </div>
    </div>
  );
};

export default WordListActions;
