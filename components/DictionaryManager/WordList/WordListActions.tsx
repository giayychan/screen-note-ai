import { AIArticleDialog } from '@/components/AIArticleDialog';
import Button from '@/components/ui/Button';
import { DialogTrigger } from '@/components/ui/dialog';
import type React from 'react';

type WordListActionsProps = {
  onSaveList: () => void;
  onClearList: () => void;
};

export const GenerateArticleButton = ({
  className = ''
}: {
  className?: string;
}) => {
  return (
    <AIArticleDialog>
      <DialogTrigger asChild>
        <Button className={className ?? ''}>Generate AI article 🤖</Button>
      </DialogTrigger>
    </AIArticleDialog>
  );
};

const WordListActions = ({ onSaveList, onClearList }: WordListActionsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center flex-1 md:gap-5 gap-2 px-2 [&_button]:text-xs md:pb-16 pb-6 [&_button]:md:text-base">
      <GenerateArticleButton />
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
