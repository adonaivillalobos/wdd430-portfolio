import Link from 'next/link';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import NavLinks from './NavLinks';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" aria-label="Adonai Villalobos - Home" className="text-2xl font-bold">
          Adonai Villalobos
        </Link>

        <div className="flex items-center gap-6">
          <NavLinks />

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50">
                Sign In
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}