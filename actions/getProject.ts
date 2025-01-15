'use server';

import { prisma } from '@/lib/db';

export const getProject = async () => {
  try {
    const project = await prisma.project.findMany({
      include: {
        techStack: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error('Failed to fetch project');
  }
};
