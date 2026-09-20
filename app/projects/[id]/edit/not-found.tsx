import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto mt-16 max-w-xl rounded-lg border border-gray-700 bg-gray-900 p-6 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-white">
        Project Not Found
      </h1>

      <p className="mt-3 text-gray-300">
        The project you are looking for does not exist.
      </p>

      <div className="mt-6">
        <Link
          href="/projects"
          className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
}