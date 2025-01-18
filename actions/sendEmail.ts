'use server';

import * as z from 'zod';
import config from '@/lib/config';
import { Resend } from 'resend';
import { emailSchema } from '@/lib/schemas';
import { generateEmailTemplate } from '@/lib/generateEmail';

const resend = new Resend(config.env.resendApiKey);

export const sendEmail = async (values: z.infer<typeof emailSchema>) => {
  const validatedFields = emailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Validasi gagal.' };
  }

  const { name, message, senderEmail, subject } = validatedFields.data;

  try {
    const data = await resend.emails.send({
      from: 'Calling to Work <onboarding@resend.dev>',
      to: 'chndrwali@gmail.com',
      subject,
      replyTo: senderEmail,
      html: generateEmailTemplate({
        name,
        message,
        senderEmail,
      }),
    });

    return { success: true, data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to send email.',
    };
  }
};
