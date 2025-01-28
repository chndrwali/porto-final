'use server';

import * as z from 'zod';
import { prisma } from '@/lib/db';
import { projectSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export const updateProject = async (id: string, values: z.infer<typeof projectSchema>) => {
  const validatedFields = projectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal. Periksa kembali kolom.' };
  }

  const { category, description, imageOne, techStack, title, web, imageFive, imageFour, imageThree, imageTwo, repository } = validatedFields.data;

  try {
    const project = await prisma.$transaction(async (prisma) => {
      // Update project details
      const updatedProject = await prisma.project.update({
        where: { id },
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

      // Clear existing techStack for this project
      await prisma.techStackProject.deleteMany({
        where: { projectId: id },
      });

      // Add updated techStack entries
      if (techStack && techStack.length > 0) {
        await prisma.techStackProject.createMany({
          data: techStack.map((techStackName: string) => ({
            name: techStackName,
            projectId: id,
          })),
        });
      } else {
        console.log('Error: techStack tidak dipilih');
        return { success: false, error: 'Error: techStack tidak dipilih' };
      }

      return updatedProject;
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
      message: 'An error occurred while updating the project',
    };
  }
};
