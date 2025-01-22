import { AIArticleDialog } from '@/components/AIArticleDialog';
import Button from '@/components/ui/Button';
import { DialogTrigger } from '@/components/ui/dialog';
import type React from 'react';
import CreateListDialog from './CreateListDialog';
import { usePathname } from 'next/navigation';

type WordListActionsProps = {
  onSaveList: (listName: string) => Promise<void>;
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
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap items-center justify-center flex-1 md:gap-5 gap-2 px-2 [&_button]:text-xs md:pb-16 pb-6 [&_button]:md:text-base">
      <GenerateArticleButton />
      <div className="flex flex-wrap gap-2 md:gap-5">
        {pathname === '/' && (
          <CreateListDialog createList={onSaveList}>
            <Button variant="outline">✅ Save to my list</Button>
          </CreateListDialog>
        )}
        <Button variant="secondary" onClick={onClearList}>
          🗑️ Clear
        </Button>
      </div>
    </div>
  );
};

export default WordListActions;
