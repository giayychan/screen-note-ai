import Button from '@/components/ui/Button';
import type React from 'react';

type WordListActionsProps = {
  onGenerateArticle: () => void;
  onSaveList: () => void;
  onClearList: () => void;
};

export const GenerateArticleButton = ({
  onGenerateArticle
}: Pick<WordListActionsProps, 'onGenerateArticle'>) => {
  return <Button onClick={onGenerateArticle}>Generate AI article 🤖</Button>;
};

const WordListActions = ({
  onGenerateArticle,
  onSaveList,
  onClearList
}: WordListActionsProps) => {
  return (
    <div className="flex gap-5 pb-10">
      <GenerateArticleButton onGenerateArticle={onGenerateArticle} />
      <Button onClick={onSaveList} variant="outline">
        ✅ Save list
      </Button>
      <Button variant="secondary" onClick={onClearList}>
        🗑️ Clear
      </Button>
    </div>
  );
};

export default WordListActions;
