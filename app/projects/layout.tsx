import Link from 'next/link';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav className="max-w-4xl mx-auto px-4 pt-8 flex gap-4 text-sm">
        <Link href="/projects" className="text-blue-600 hover:underline">
          Overview
        </Link>
        <Link href="/projects/opensource" className="text-blue-600 hover:underline">
          Open Source
        </Link>
        <Link href="/projects/school" className="text-blue-600 hover:underline">
          School
        </Link>
      </nav>
      {children}
    </section>
  );
}