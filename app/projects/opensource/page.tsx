import { Project } from '@/lib/projects-db';

async function getOpenSourceProjects(): Promise<Project[]> {
  const res = await fetch('http://localhost:3000/api/projects?type=opensource', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function OpenSourceProjects() {
  const projects = await getOpenSourceProjects();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Open Source Projects
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