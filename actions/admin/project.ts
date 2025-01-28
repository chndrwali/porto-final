'use server';

import * as z from 'zod';
import { prisma } from '@/lib/db';
import { projectSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export const createProject = async (values: z.infer<typeof projectSchema>) => {
  const validatedFields = projectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal. periksa kembali kolom' };
  }

  const { category, description, imageOne, techStack, title, web, imageFive, imageFour, imageThree, imageTwo, repository } = validatedFields.data;

  try {
    const project = await prisma.$transaction(async (prisma) => {
      const newProject = await prisma.project.create({
        data: {
          title,
          description,
          web,
          category,
          repository,
          imageOne,
          imageFour,
          imageFive,
          imageThree,
          imageTwo,
        },
      });

      if (techStack && techStack.length > 0) {
        await prisma.techStackProject.createMany({
          data: techStack.map((techStackName: string) => ({
            name: techStackName,
            projectId: newProject.id,
          })),
        });
      } else {
        console.log('Error: techStack tidak dipilih');
        return { success: false, error: 'Error techstack tidak di pilih' };
      }

      return newProject;
    });

    revalidatePath(`/admin/project`);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(project)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while creating the project',
    };
  }
};
