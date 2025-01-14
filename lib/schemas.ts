import * as z from 'zod';

function extractTextFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent?.trim() || '';
}

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Email harus diisi dengan format yang valid.',
  }),
  password: z.string().min(1, {
    message: 'Password wajib diisi.',
  }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(1, {
    message: 'Password wajib diisi.',
  }),
  newPassword: z.string().min(1, {
    message: 'Password baru harus diisi',
  }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: 'Email harus diisi dengan format yang valid.',
  }),
  password: z.string().min(1, {
    message: 'Password wajib diisi.',
  }),
  name: z.string().min(1, {
    message: 'Nama harus diisi',
  }),
});

export const projectSchema = z.object({
  category: z.enum(['FULLSTACK', 'FRONTEND', 'BACKEND'], {
    message: 'Kategori harus dipilih',
  }),
  techStack: z.array(
    z.string().min(1, {
      message: 'techStack harus sipilih, minimal 1!',
    })
  ),
  title: z.string().min(1, 'Judul harus diisi'),
  description: z.string().min(8, 'Deskripsi minimal 8 karakter'),
  web: z.string().min(1, 'Web harus diisi'),
  repository: z.string().optional(),
  imageOne: z.string().min(1, 'Gambar harus diisi'),
  imageTwo: z.string().optional(),
  imageThree: z.string().optional(),
  imageFour: z.string().optional(),
  imageFive: z.string().optional(),
});

export const blogSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi'),
  description: z.string().refine(
    (value) => {
      return extractTextFromHTML(value).trim().length >= 5;
    },
    {
      message: 'The text must be at least 5 characters long after trimming',
    }
  ),
  createdBy: z.string().min(1, 'Pembuat harus diisi'),
});
