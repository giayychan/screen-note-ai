import type React from 'react';

import { testArticle } from './sample-articles';
import HighlightedWord from './HighlightedWord';
import { isWordInList } from './utils';
import type { WordDefinition } from '@/services/dictionary';

type ArticleProps = {
  words: WordDefinition[];
};

const Article = ({ words }: ArticleProps) => {
  const clickOnWord = (word: string) => {
    console.log(word);
  };

  return (
    <div className="flex flex-col items-center justify-center w-[66vw]">
      <p>
        {testArticle.split(' ').map((articleWord, index) => (
          <HighlightedWord
            key={index}
            word={articleWord}
            isInList={isWordInList(words, articleWord)}
            onClick={clickOnWord}
          />
        ))}
      </p>
    </div>
  );
};

export default Article;
