'use server';

import * as z from 'zod';
import { prisma } from '@/lib/db';
import { skillSchema } from '@/lib/schemas';

export const createSkill = async (values: z.infer<typeof skillSchema>) => {
  const validatedFields = skillSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal. periksa kembali kolom' };
  }

  const { textOne, textTwo, textThree, textFour } = validatedFields.data;

  try {
    const newSkill = await prisma.skill.create({
      data: {
        textOne,
        textTwo,
        textThree,
        textFour,
      },
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newSkill)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while creating the skill',
    };
  }
};
