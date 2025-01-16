'use server';

import { prisma } from '@/lib/db';

export const getReview = async () => {
  try {
    const review = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return review;
  } catch (error) {
    console.error('Error fetching review:', error);
    throw new Error('Failed to fetch review');
  }
};
