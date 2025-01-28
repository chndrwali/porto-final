'use server';

import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';

export const getTechStack = async () => {
  try {
    const tech = unstable_cache(
      async () => {
        return await prisma.techStack.findMany({
          orderBy: {
            createdAt: 'desc',
          },
        });
      },
      ['tech'],
      {
        revalidate: 60,
      }
    )();
    return tech;
  } catch (error) {
    console.error('Error fetching tech:', error);
    throw new Error('Failed to fetch tech');
  }
};
