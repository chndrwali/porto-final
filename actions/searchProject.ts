'use server';

import { prisma } from '@/lib/db';
import { ProjectCategory } from '@prisma/client';

const searchProject = async (query: string): Promise<{ id: string; name: string; category: string; image: string }[]> => {
  const lowerCaseQuery = query.toLowerCase();

  const projects = await prisma.project.findMany({
    where: {
      title: {
        contains: lowerCaseQuery,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      title: true,
      category: true,
      imageOne: true,
    },
    orderBy: [
      {
        category: 'asc',
      },
      {
        createdAt: 'desc',
      },
    ],
    take: 10,
  });

  return projects.map((project) => ({
    id: project.id,
    name: project.title,
    category: project.category,
    image: project.imageOne,
  }));
};

export default searchProject;
