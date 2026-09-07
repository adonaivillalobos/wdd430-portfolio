import ProjectList from '@/components/ProjectList';

const projects = [
  {
    title: 'WDD 430 Portfolio',
    description: 'My personal portfolio site built with Next.js and Tailwind CSS as part of WDD 430.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/adonaivillalobos/wdd430-portfolio',
  },
  {
    title: 'Case Tracker',
    description: 'An Excel-based workflow tool for triaging and tracking a large client account caseload.',
    technologies: ['Excel', 'VBA'],
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Hi, I&apos;m Adonai Villalobos</h1>
      <p className="text-gray-600 mb-8">
        Account Manager turned web developer-in-training. Here are a few things I&apos;ve built.
      </p>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <ProjectList projects={projects} />
    </div>
  );
}