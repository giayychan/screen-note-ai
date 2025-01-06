import Link from 'next/link';

import Logo from '@/components/icons/Logo';
import GitHub from '@/components/icons/GitHub';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 bg-zinc-900">
      <div className="flex flex-row items-center gap-8 py-6 text-white transition-colors duration-150 border-b border-zinc-600 bg-zinc-900">
        <Link href="/" className="flex items-center flex-initial font-bold">
          <span className="mr-2 border rounded-full border-zinc-700">
            <Logo />
          </span>
          <span>Screen Note AI</span>
        </Link>

        <Link
          aria-label="Github Repository"
          href="https://github.com/Giayychan/screen-note-ai"
          className="flex items-center flex-initial font-bold"
        >
          <span className="mr-2 border rounded-full border-zinc-700">
            <GitHub />
          </span>
          <span>Github</span>
        </Link>
        <Link
          target="_blank"
          aria-label="Buy me a coffee"
          href="https://buymeacoffee.com/giawdevtesq"
          rel="noopener noreferrer"
          className="flex items-center flex-initial font-bold"
        >
          <span>☕️ Buy Me A Coffee</span>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-between py-2 space-y-4 md:flex-row bg-zinc-900">
        <div>
          <span className="text-white">
            &copy; {new Date().getFullYear()} Screen Note AI All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
