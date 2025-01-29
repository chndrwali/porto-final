'use server';

import * as z from 'zod';
import { prisma } from '@/lib/db';
import { careerSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export const createCareer = async (values: z.infer<typeof careerSchema>) => {
  const validatedFields = careerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal. periksa kembali kolom' };
  }

  const { careerType, company, period, title, type } = validatedFields.data;

  try {
    const newCareer = await prisma.career.create({
      data: {
        title,
        type,
        company,
        period,
        careerType,
      },
    });
    revalidatePath('/admin/career');

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newCareer)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while creating the career',
    };
  }
};
