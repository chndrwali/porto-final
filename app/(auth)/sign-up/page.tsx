import { RegisterForm } from '@/components/auth/registerForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daftar',
};

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">Buat Akun Anda</h1>
      <p className="text-muted-foreground">Harap lengkapi semua kolom yang valid untuk mendapatkan akses ke Admin</p>
      <RegisterForm />
    </div>
  );
};

export default Page;
