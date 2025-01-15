import ProjectForm from '@/components/admin/form/projectForm';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Buat konten',
};

const Page = () => {
  return (
    <>
      <Button asChild className="mb-10 w-fit border border-amber-200 bg-white text-xs font-medium text-slate-900 hover:bg-slate-100">
        <Link href="/admin/content">Kembali</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <ProjectForm />
      </section>
    </>
  );
};
export default Page;
