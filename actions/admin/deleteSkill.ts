'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/actions/getCurrentUser';

export const deleteSkill = async (id: string) => {
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
    const deletedSkill = await prisma.skill.delete({
      where: { id },
    });

    return {
      success: true,
      data: deletedSkill,
    };
  } catch (error) {
    console.error('Error deleting skill:', error);

    return {
      success: false,
      message: 'An error occurred while deleting the skill.',
    };
  }
};
