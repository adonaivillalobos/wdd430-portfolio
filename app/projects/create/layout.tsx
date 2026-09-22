import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Project',
};

export default function CreateProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}