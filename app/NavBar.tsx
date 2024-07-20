'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineBug } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

export function NavBar() {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' }
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiOutlineBug size={24} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={classNames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500': link.href !== currentPath,
                'hover:text-zinc-700 transition-colors': true
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <Box>
        {status === 'authenticated' ? (
          <Link href="/api/auth/signout">Log out</Link>
        ) : status === 'unauthenticated' ? (
          <Link href="/api/auth/signin">Login</Link>
        ) : null}
      </Box>
    </nav>
  );
}
