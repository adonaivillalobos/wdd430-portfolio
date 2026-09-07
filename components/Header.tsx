import Link from 'next/link';
import NavLinks from './NavLinks';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" aria-label="Adonai Villalobos - Home" className="text-2xl font-bold">
          Adonai Villalobos
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}