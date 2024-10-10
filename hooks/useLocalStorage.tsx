'use client';

import { useState, useEffect } from 'react';

export const useLocalStorage = <T,>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(defaultValue);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const localstorageValue = localStorage.getItem(key);

    if (localstorageValue !== null) {
      setValue(JSON.parse(localstorageValue) as T);
    }
    setIsInitialized(true);
  }, [key]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [isInitialized, key, value]);

  return [value, setValue];
};
