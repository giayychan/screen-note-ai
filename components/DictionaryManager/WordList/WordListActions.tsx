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
    <div className="flex flex-wrap items-center justify-center flex-1 md:gap-5 gap-2 px-2 [&_button]:text-xs md:pb-16 lg:pb-32 pb-6 [&_button]:md:text-base">
      <GenerateArticleButton onGenerateArticle={onGenerateArticle} />
      <div className="flex flex-wrap gap-2 md:gap-5">
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
