'use server';

import { prisma } from '@/lib/db';

export const getTechStack = async () => {
  try {
    const tech = await prisma.techStack.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return tech;
  } catch (error) {
    console.error('Error fetching tech:', error);
    throw new Error('Failed to fetch tech');
  }
};
