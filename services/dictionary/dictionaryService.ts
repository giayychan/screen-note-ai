'use server';

import type { WordDefinition, AutoCorrectString, EmptyResult } from './types';
import { API_CONFIG } from './config';

const { BASE_DICTIONARY_URL, MERRIAM_DICTIONARY_API_KEY } = API_CONFIG;

/**
 * Fetches word definitions from the Merriam-Webster dictionary API.
 * @param {string} query - The word to look up.
 * @returns {Promise<WordDefinition[] | AutoCorrectString | EmptyResult>} - The API response containing dictionary words, auto-correct suggestions, or an empty result.
 */
export async function fetchDictionaryWords(
  query: string
): Promise<WordDefinition[] | AutoCorrectString | EmptyResult> {
  const response = await fetch(
    `${BASE_DICTIONARY_URL}/${query}?key=${MERRIAM_DICTIONARY_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch the word definition for "${query}".`);
  }

  const data = await response.json();
  return data;
}
