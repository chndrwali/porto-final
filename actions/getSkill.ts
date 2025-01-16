'use server';

import { prisma } from '@/lib/db';

export const getSkills = async () => {
  try {
    const skill = await prisma.skill.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return skill;
  } catch (error) {
    console.error('Error fetching skill:', error);
    throw new Error('Failed to fetch skill');
  }
};
