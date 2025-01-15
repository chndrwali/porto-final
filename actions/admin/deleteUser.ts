'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '../getCurrentUser';

export const deleteUser = async (id: string) => {
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
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return {
      success: true,
      data: deletedUser,
    };
  } catch (error) {
    console.error('Error deleting user:', error);

    return {
      success: false,
      message: 'An error occurred while deleting the user.',
    };
  }
};
