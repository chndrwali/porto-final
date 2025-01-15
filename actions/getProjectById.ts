'use server';

import { prisma } from '@/lib/db';

export const getProjectById = async (projectId: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        techStack: true,
      },
    });

    return project;
  } catch (error) {
    console.log(error);

    return null;
  }
};
