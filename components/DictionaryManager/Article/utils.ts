import type { WordDefinition } from '@/services/dictionary';

/**
 * Checks if a given word is in the user's dictionary word list.
 */
export function isWordInList(words: WordDefinition[], word: string): boolean {
  return words.some(
    (w) => w.hwi.hw.replaceAll('*', '').toLowerCase() === word.toLowerCase()
  );
}
