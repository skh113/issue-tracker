import Link from 'next/link';
import { AiOutlineBug } from 'react-icons/ai';

export function NavBar() {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/Issues' }
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiOutlineBug size={24} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link, index) => (
          <li
            key={index}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
