import { useRef, useEffect } from 'react';
import { WordDefinitionWithBgColor } from './types';

const ArticleContent = ({
  article,
  wordsWithColor
}: {
  article: string[];
  wordsWithColor: WordDefinitionWithBgColor[];
}) => {
  const contentEndRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (contentEndRef.current) {
      contentEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [article]);

  return (
    <span className="md:text-lg whitespace-break-spaces">
      {article.map((a, i) => {
        const wordInList = wordsWithColor.find((w) => {
          return (
            w.text.toLowerCase() ===
            a
              .toLowerCase()
              .trim()
              .replaceAll('\n', '')
              .replace(/[^\w\s]/g, '')
          );
        });

        return (
          <span
            key={i}
            style={{
              backgroundColor: wordInList ? wordInList.bgColor : 'none'
            }}
            className={
              wordInList ? 'border rounded p-0.5 text-secondary' : 'border-none'
            }
          >
            {a}
          </span>
        );
      })}
      <span ref={contentEndRef} />
    </span>
  );
};

export default ArticleContent;
