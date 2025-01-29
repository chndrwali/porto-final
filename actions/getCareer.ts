'use server';

import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';

export const getCareer = async () => {
  try {
    const career = unstable_cache(
      async () => {
        return await prisma.career.findMany({
          orderBy: {
            createdAt: 'desc',
          },
        });
      },
      ['career'],
      {
        revalidate: 60,
      }
    )();
    return career;
  } catch (error) {
    console.error('Error fetching career:', error);
    throw new Error('Failed to fetch career');
  }
};
