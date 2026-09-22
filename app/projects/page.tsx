import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';
import { deleteProject } from '@/lib/actions';
import ProjectSearch from '@/app/ui/project-search';
import Pagination from '@/app/ui/pagination';

export const metadata: Metadata = {
  title: 'Projects',
};

export const dynamic = 'force-dynamic';

export default async function ProjectsOverview(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const { userId } = await auth();
  const isOwner = !!userId;

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const projects = await fetchFilteredProjects(query, currentPage);
  const totalPages = await fetchProjectsPages(query);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Projects Overview
        </h2>

        {isOwner && (
          <Link
            href="/projects/create"
            className="rounded-md bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Create New Project
          </Link>
        )}
      </div>

      <div className="mt-4">
        <ProjectSearch />
      </div>

      <p className="mt-4 text-gray-600 dark:text-gray-300">
        {projects.length} project{projects.length !== 1 ? 's' : ''} found.
      </p>

      <ul className="mt-4 space-y-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between rounded-lg border border-gray-700 p-5 text-gray-700 dark:text-gray-300"
          >
            <div>
              <h3 className="text-lg font-medium">
                <Link href={`/projects/${project.id}`} className="hover:underline">
                  {project.title}
                </Link>{' '}
                ({project.type})
              </h3>
            </div>

            {isOwner && (
              <div className="flex gap-3">
                <Link
                  href={`/projects/${project.id}/edit`}
                  className="rounded-md bg-slate-600 px-5 py-3 text-white hover:bg-slate-700"
                >
                  Edit
                </Link>

                <form action={deleteProject.bind(null, project.id)}>
                  <button
                    type="submit"
                    className="rounded-md bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </form>
              </div>
            )}
          </li>
        ))}
      </ul>

      <Pagination totalPages={totalPages} />
    </div>
  );
}