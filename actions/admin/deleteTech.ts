'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { revalidatePath } from 'next/cache';

export const deleteTech = async (id: string) => {
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
    const deletedTech = await prisma.techStack.delete({
      where: { id },
    });

    revalidatePath('/dashboard/techstack');

    return {
      success: true,
      data: deletedTech,
    };
  } catch (error) {
    console.error('Error deleting tech:', error);

    return {
      success: false,
      message: 'An error occurred while deleting the tech.',
    };
  }
};
