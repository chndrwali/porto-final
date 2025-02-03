'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { revalidatePath } from 'next/cache';

export const deleteCareer = async (id: string) => {
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
    const deletedCareer = await prisma.career.delete({
      where: { id },
    });

    revalidatePath('/dashboard/career');
    revalidatePath('/');
    return {
      success: true,
      data: deletedCareer,
    };
  } catch (error) {
    console.error('Error deleting career:', error);

    return {
      success: false,
      message: 'An error occurred while deleting the career.',
    };
  }
};
