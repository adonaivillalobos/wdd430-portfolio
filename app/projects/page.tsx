import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';
import ProjectSearch from '@/app/ui/project-search';
import Pagination from '@/app/ui/pagination';

export const dynamic = 'force-dynamic';

export default async function ProjectsOverview(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const projects = await fetchFilteredProjects(query, currentPage);
  const totalPages = await fetchProjectsPages(query);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Projects Overview
      </h2>

      <div className="mt-4">
        <ProjectSearch />
      </div>

      <p className="mt-4 text-gray-600 dark:text-gray-300">
        {projects.length} project{projects.length !== 1 ? 's' : ''} found.
      </p>

      <ul className="mt-4 space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="text-gray-700 dark:text-gray-300">
            {project.title} ({project.type})
          </li>
        ))}
      </ul>

      <Pagination totalPages={totalPages} />
    </div>
  );
}