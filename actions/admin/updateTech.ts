'use server';

import * as z from 'zod';
import { prisma } from '@/lib/db';
import { techStackSchema } from '@/lib/schemas';

export const updateTech = async (id: string, values: z.infer<typeof techStackSchema>) => {
  const validatedFields = techStackSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal. periksa kembali kolom' };
  }

  const { title, image } = validatedFields.data;

  try {
    const updatedTech = await prisma.techStack.update({
      where: {
        id,
      },
      data: {
        title,
        image,
      },
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedTech)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while updating the tech',
    };
  }
};
