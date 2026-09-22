import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectById } from '@/lib/projects-db';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(Number(id));

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested portfolio project could not be found.',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(Number(id));

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {project.title}
      </h1>
      <p className="mt-2 text-sm text-gray-500 uppercase tracking-wide">
        {project.type}
        {project.year_completed ? ` · ${project.year_completed}` : ''}
      </p>
      <p className="mt-6 text-gray-700 dark:text-gray-300">
        {project.description}
      </p>
      {project.technologies.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      {project.link && (
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          View Project →
        </Link>
      )}
    </div>
  );
}