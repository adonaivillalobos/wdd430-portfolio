'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';

const currentYear = new Date().getFullYear();

const CreateProjectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters.'),
  technologies: z.string().min(2, 'Add at least one technology.'),
  type: z.enum(['opensource', 'school'], {
    message: 'Please select a project type.',
  }),
  yearCompleted: z.coerce
    .number()
    .int('Year must be a whole number.')
    .gte(2000, 'Year must be 2000 or later.')
    .lte(currentYear, `Year cannot be greater than ${currentYear}.`),
});

const ProjectFormSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
  technologies: z
    .string()
    .min(2, 'Technologies must be at least 2 characters.'),
  type: z.enum(['opensource', 'school']),
  link: z.string().optional(),
});

export type State = {
  errors: {
    title?: string[];
    description?: string[];
    technologies?: string[];
    type?: string[];
    yearCompleted?: string[];
  };
  message: string | null;
};

export async function createProject(
  prevState: State,
  formData: FormData
): Promise<State> {
  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {},
      message: 'You must be signed in to create a project.',
    };
  }

  const validatedFields = CreateProjectSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
    type: formData.get('type'),
    yearCompleted: formData.get('yearCompleted'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create project.',
    };
  }

  const {
    title,
    description,
    technologies,
    type,
    yearCompleted,
  } = validatedFields.data;

  const technologiesArray = technologies
    .split(',')
    .map((technology) => technology.trim())
    .filter(Boolean);

  const technologiesSqlArray = `{${technologiesArray
    .map((technology) => `"${technology.replace(/(["\\])/g, '\\$1')}"`)
    .join(',')}}`;

  try {
    await sql`
      INSERT INTO projects (
        title,
        description,
        technologies,
        type,
        year_completed
      )
      VALUES (
        ${title},
        ${description},
        ${technologiesSqlArray}::text[],
        ${type},
        ${yearCompleted}
      )
    `;
  } catch (error) {
    console.error('Error creating project:', error);

    return {
      errors: {},
      message: 'Database Error: Failed to create project.',
    };
  }

  revalidatePath('/projects');
  redirect('/projects');
}

export async function updateProject(
  id: string,
  formData: FormData
) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('You must be signed in to update a project.');
  }

  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
    type: formData.get('type'),
    link: formData.get('link'),
  };

  const parsed = ProjectFormSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error('Invalid project input.');
  }

  const {
    title,
    description,
    technologies,
    type,
    link,
  } = parsed.data;

  const technologiesArray = technologies
    .split(',')
    .map((technology) => technology.trim())
    .filter(Boolean);

  const technologiesSqlArray = `{${technologiesArray
    .map((technology) => `"${technology.replace(/(["\\])/g, '\\$1')}"`)
    .join(',')}}`;

  try {
    await sql`
      UPDATE projects
      SET
        title = ${title},
        description = ${description},
        technologies = ${technologiesSqlArray}::text[],
        type = ${type},
        link = ${link || null}
      WHERE id = ${Number(id)}
    `;
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project. Please try again later.');
  }

  revalidatePath('/projects');
  redirect('/projects');
}

export async function deleteProject(id: number) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('You must be signed in to delete a project.');
  }

  try {
    await sql`
      DELETE FROM projects
      WHERE id = ${id}
    `;

    revalidatePath('/projects');
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error(
      'Failed to delete project. Please try again later.'
    );
  }
}