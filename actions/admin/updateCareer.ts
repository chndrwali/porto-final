'use server';

import * as z from 'zod';
import { prisma } from '@/lib/db';
import { careerSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export const updateCareer = async (id: string, values: z.infer<typeof careerSchema>) => {
  const validatedFields = careerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal. periksa kembali kolom' };
  }

  const { type, careerType, company, period, title } = validatedFields.data;

  try {
    const updatedCareer = await prisma.career.update({
      where: {
        id,
      },
      data: {
        careerType,
        company,
        period,
        title,
        type,
      },
    });

    revalidatePath('/admin/career');
    revalidatePath('/');
    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedCareer)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while updating the career',
    };
  }
};
