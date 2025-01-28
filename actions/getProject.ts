'use server';

import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';

export const getProject = async () => {
  try {
    const project = unstable_cache(
      async () => {
        return await prisma.project.findMany({
          include: {
            techStack: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      },
      ['project'],
      {
        revalidate: 60,
      }
    )();
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error('Failed to fetch project');
  }
};
