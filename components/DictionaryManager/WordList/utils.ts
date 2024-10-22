export function getSubDirectory(baseFilename: string) {
  if (baseFilename.startsWith('bix')) {
    return 'bix';
  }

  if (baseFilename.startsWith('gg')) {
    return 'gg';
  }

  const firstChar = baseFilename.charAt(0);

  if (typeof firstChar === 'number') {
    return 'number';
  }

  if (firstChar === '_') {
    return 'number';
  }

  return firstChar;
}

// todo: clean up if it is not used
export function createSoundLink({
  languageCode = 'en',
  countryCode = 'us',
  format = 'mp3',
  baseFilename
}: {
  languageCode?: 'en' | 'es';
  countryCode?: 'us' | 'me';
  format?: 'mp3' | 'wav' | 'ogg';
  baseFilename: string;
}) {
  return `https://media.merriam-webster.com/audio/prons/${languageCode}/${countryCode}/${format}/${getSubDirectory(baseFilename)}/${baseFilename}.${format}`;
}
