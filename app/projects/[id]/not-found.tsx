import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Project Not Found
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        The project you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/projects" className="mt-6 inline-block text-blue-600 hover:underline">
        ← Back to Projects
      </Link>
    </div>
  );
}