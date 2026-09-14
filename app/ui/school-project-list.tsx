import { getProjects } from '@/lib/projects-db';

export default async function SchoolProjectList() {

  const projects = await getProjects('school');

  return (
    <ul className="mt-4 space-y-2">
      {projects.map((project) => (
        <li key={project.id} className="text-gray-700 dark:text-gray-300">
          <strong>{project.title}</strong>: {project.description}
        </li>
      ))}
    </ul>
  );
}