import { NextRequest, NextResponse } from 'next/server';
import { getProjects } from '@/lib/projects-db';

// GET /api/projects
// GET /api/projects?type=opensource
// GET /api/projects?type=school
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  const projects = getProjects(type);
  return NextResponse.json(projects);
}