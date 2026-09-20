import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects-db';
import { updateProject } from '@/lib/actions';

export default async function EditProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  const project = await getProjectById(Number(id));

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/projects"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back to Projects
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Edit Project
      </h1>

      <form action={updateProject.bind(null, id)} className="mt-6 space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={project.title}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            required
            rows={5}
            defaultValue={project.description}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="technologies"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Technologies
          </label>

          <input
            id="technologies"
            name="technologies"
            type="text"
            required
            defaultValue={project.technologies.join(', ')}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />

          <p className="mt-1 text-sm text-gray-500">
            Enter technologies separated by commas.
          </p>
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Project Type
          </label>

          <select
            id="type"
            name="type"
            required
            defaultValue={project.type}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="school">School</option>
            <option value="opensource">Open Source</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Project Link
          </label>

          <input
            id="link"
            name="link"
            type="url"
            defaultValue={project.link ?? ''}
            placeholder="https://example.com"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            Save Changes
          </button>

          <Link
            href="/projects"
            className="rounded-md border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}