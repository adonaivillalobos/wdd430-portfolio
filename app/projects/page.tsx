import { Project } from '@/lib/projects-db';

async function getAllProjects(): Promise<Project[]> {
  const res = await fetch('http://localhost:3000/api/projects', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function ProjectsOverview() {
  const projects = await getAllProjects();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Projects Overview
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {projects.length} total projects.
      </p>
      <ul className="mt-4 space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="text-gray-700 dark:text-gray-300">
            {project.title} ({project.type})
          </li>
        ))}
      </ul>
    </div>
  );
}