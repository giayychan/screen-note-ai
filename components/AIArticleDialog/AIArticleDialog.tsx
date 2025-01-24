import { ReactNode, useEffect, useState } from 'react';
import { useStore } from 'zustand';
import useWordsStore from '@/stores/useWordsStore';
import useArticleGenerator from './hooks/useArticleGenerator';
import useWordsWithColors from './hooks/useWordsWithColors';
import WordList from './WordList';
import ArticleContent from './ArticleContent';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const AIArticleDialog = ({ children: trigger }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasGeneratedArticle, setHasGeneratedArticle] = useState(false);
  const words = useStore(useWordsStore, (state) => state.words);
  const wordsWithColor = useWordsWithColors(words);
  const wordTextList = words.map((w) => w.text);
  const { article, loading, generateAIArticle } =
    useArticleGenerator(wordTextList);
  const supabase = createClient();
  const router = useRouter();

  const handleOpenChange = async (open: boolean) => {
    const res = await supabase.auth.getUser();
    const user = res.data.user;

    if (!user) {
      router.push('/signin');
      return;
    }
    setIsOpen(open);
  };

  useEffect(() => {
    if (isOpen && !hasGeneratedArticle && !loading) {
      generateAIArticle()
        .then(() => {
          setHasGeneratedArticle(true);
        })
        .catch((error) => console.error('Error generating article:', error));
    }
  }, [isOpen, hasGeneratedArticle, generateAIArticle]);

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl overflow-y-auto size-full">
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
