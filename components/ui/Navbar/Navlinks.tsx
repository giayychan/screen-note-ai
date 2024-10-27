'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Logo from '@/components/icons/Logo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import Button from '@/components/ui/Button';
import { ModeToggle } from '@/components/ui/Navbar/ModeToggle';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-4 align-center lg:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" aria-label="Logo" className="flex items-center gap-2">
          <Logo />
          <span className="hidden text-xl lg:block">ScreenNote AI</span>
        </Link>
        <nav className="ml-6 space-x-2 lg:block">
          {/* <Link href="/" className={s.link}>
            Pricing
          </Link> */}
          {user && <Link href="/account">Account</Link>}
        </nav>
      </div>
      <div className="flex items-center justify-end pr-4 space-x-8">
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <Button type="submit">Sign out</Button>
          </form>
        ) : (
          <Link href="/signin">Sign In</Link>
        )}
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}
