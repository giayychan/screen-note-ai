import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import { useStore } from 'zustand';
import useWordsStore from '@/stores/useWordsStore';
import useArticleGenerator from './hooks/useArticleGenerator';
import useWordsWithColors from './hooks/useWordsWithColors';
import WordList from './WordList';
import ArticleContent from './ArticleContent';

const AIArticleDialog = ({ children: trigger }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const words = useStore(useWordsStore, (state) => state.words);
  const wordsWithColor = useWordsWithColors(words);
  const { article, loading, generateAIArticle } = useArticleGenerator(
    words.map((w) => w.text)
  );

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);
    if (open) await generateAIArticle();
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl overflow-scroll size-full">
        <DialogHeader>
          <DialogTitle>
            <p className="text-3xl">
              AI Article {loading ? 'Generating...' : 'Generated!'}
            </p>
            <WordList wordsWithColor={wordsWithColor} />
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-5 size-full">
            <ArticleContent article={article} wordsWithColor={wordsWithColor} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AIArticleDialog;
