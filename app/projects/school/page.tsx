import { getProjects, Project } from '@/lib/projects-db';

export const dynamic = 'force-dynamic';

export default async function SchoolProjects() {
  const projects: Project[] = await getProjects('school');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        School Projects
      </h2>
      <ul className="mt-4 space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="text-gray-700 dark:text-gray-300">
            <strong>{project.title}</strong>: {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}