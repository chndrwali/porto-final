'use server';

import * as z from 'zod';
import { prisma } from '@/lib/db';
import { skillSchema } from '@/lib/schemas';

export const updateSkill = async (id: string, values: z.infer<typeof skillSchema>) => {
  const validatedFields = skillSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal. periksa kembali kolom' };
  }

  const { textOne, textTwo, textThree, textFour } = validatedFields.data;

  try {
    const updatedSkill = await prisma.skill.update({
      where: {
        id,
      },
      data: {
        textOne,
        textTwo,
        textThree,
        textFour,
      },
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedSkill)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while updating the skill',
    };
  }
};
