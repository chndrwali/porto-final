'use server';

import * as z from 'zod';
import { prisma } from '@/lib/db';
import { techStackSchema } from '@/lib/schemas';

export const createTech = async (values: z.infer<typeof techStackSchema>) => {
  const validatedFields = techStackSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal. periksa kembali kolom' };
  }

  const { title, image } = validatedFields.data;

  try {
    const newTech = await prisma.techStack.create({
      data: {
        title,
        image,
      },
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newTech)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while creating the tech',
    };
  }
};
