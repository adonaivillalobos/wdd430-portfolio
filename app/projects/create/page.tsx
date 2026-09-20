'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createProject, type State } from '@/lib/actions';

const initialState: State = {
  message: null,
  errors: {},
};

export default function CreateProjectPage() {
  const [state, formAction, isPending] = useActionState<
    State,
    FormData
  >(createProject, initialState);

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
        Create a New Project
      </h1>

      <form action={formAction} className="mt-6 space-y-6">
        {/* TITLE */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Project Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            aria-describedby="title-error"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />

          <div
            id="title-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors.title?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
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
            rows={5}
            required
            aria-describedby="description-error"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />

          <div
            id="description-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors.description?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* TECHNOLOGIES */}
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
            placeholder="Next.js, TypeScript, Tailwind CSS"
            required
            aria-describedby="technologies-error"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />

          <p className="mt-1 text-sm text-gray-500">
            Enter technologies separated by commas.
          </p>

          <div
            id="technologies-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors.technologies?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* PROJECT TYPE */}
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
            defaultValue=""
            aria-describedby="type-error"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="" disabled>
              Select a project type
            </option>
            <option value="school">School</option>
            <option value="opensource">Open Source</option>
          </select>

          <div
            id="type-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors.type?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* YEAR COMPLETED */}
        <div>
          <label
            htmlFor="yearCompleted"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Year Completed
          </label>

          <input
            id="yearCompleted"
            name="yearCompleted"
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            required
            aria-describedby="yearCompleted-error"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />

          <div
            id="yearCompleted-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors.yearCompleted?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* GENERAL ERROR */}
        {state.message ? (
          <p
            className="text-sm text-red-600"
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Saving...' : 'Create Project'}
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