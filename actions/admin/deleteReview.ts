'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { revalidatePath } from 'next/cache';

export const deleteReview = async (id: string) => {
  // Memeriksa pengguna saat ini
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { error: 'Unauthorized', status: 401 };
  }

  // Memeriksa apakah pengguna adalah admin
  const isAdmin = currentUser.role === 'ADMIN';

  if (!isAdmin) {
    return { error: 'Access denied', status: 403 };
  }

  try {
    // Menghapus pengguna berdasarkan ID
    const deletedReview = await prisma.review.delete({
      where: { id },
    });

    revalidatePath('/dashboard/review');
    revalidatePath('/testimonial');

    return {
      success: true,
      data: deletedReview,
    };
  } catch (error) {
    console.error('Error deleting review:', error);

    return {
      success: false,
      message: 'An error occurred while deleting the review.',
    };
  }
};
