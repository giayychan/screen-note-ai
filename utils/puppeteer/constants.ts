export const userAgent =
  'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36';

export const localExecutablePath =
  process.platform === 'win32'
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
      ? '/usr/bin/google-chrome'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export const remoteExecutablePath =
  'https://screen-note-ai-gyyc.s3.us-east-2.amazonaws.com/chromium-v130.0.0-pack.tar';

export const isDev = process.env.NODE_ENV === 'development';
