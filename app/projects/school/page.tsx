import { Suspense } from 'react';
import SchoolProjectList from '@/app/ui/school-project-list';
import SchoolProjectListSkeleton from '@/app/ui/school-project-list-skeleton';

export const dynamic = 'force-dynamic';

export default function SchoolProjects() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        School Projects
      </h2>
      <Suspense fallback={<SchoolProjectListSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </div>
  );
}