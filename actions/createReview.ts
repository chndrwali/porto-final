'use server';

import * as z from 'zod';
import { prisma } from '@/lib/db';
import { reviewSchema } from '@/lib/schemas';

export const createReview = async (values: z.infer<typeof reviewSchema>) => {
  const validatedFields = reviewSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal. periksa kembali kolom' };
  }

  const { rating, comment, reviewer, email } = validatedFields.data;

  try {
    const newReview = await prisma.review.create({
      data: {
        rating,
        comment,
        reviewer,
        email,
      },
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newReview)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while creating the review',
    };
  }
};
