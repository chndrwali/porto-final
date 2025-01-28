'use server';

import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';

export const getReview = async () => {
  try {
    const review = unstable_cache(
      async () => {
        return await prisma.review.findMany({
          orderBy: {
            createdAt: 'desc',
          },
        });
      },
      ['review'],
      {
        revalidate: 60,
      }
    )();
    return review;
  } catch (error) {
    console.error('Error fetching review:', error);
    throw new Error('Failed to fetch review');
  }
};
