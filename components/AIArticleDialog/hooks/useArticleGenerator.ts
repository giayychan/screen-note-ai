import { useCallback, useState } from 'react';
import axios from 'axios';

const useArticleGenerator = (words: string[]) => {
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<string[]>([]);

  const generateAIArticle = useCallback(async () => {
    try {
      setArticle([]);
      setLoading(true);
      const response = await axios.post(
        '/api/python/fastapi/ai_article',
        { words },
        { responseType: 'stream', adapter: 'fetch' }
      );

      const reader = response.data.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(Boolean);

        for (const line of lines) {
          const words = line.split(' ');
          for (let i = 0; i < words.length; i++) {
            await new Promise<void>((resolve) => {
              setTimeout(() => {
                const newWord =
                  words[i] + (i === words.length - 1 ? '\n\n' : ' ');
                setArticle((prev) => [...prev, newWord]);
                resolve();
              }, 80);
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching AI article:', error);
    } finally {
      setLoading(false);
    }
  }, [words]);

  return { article, loading, generateAIArticle };
};

export default useArticleGenerator;
