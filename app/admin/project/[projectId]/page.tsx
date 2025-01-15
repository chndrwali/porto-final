import { getProjectById } from '@/actions/getProjectById';
import ProjectForm from '@/components/admin/form/projectForm';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params;
  const isNew = projectId === 'new';

  return {
    title: isNew ? 'Buat proyek' : 'Update proyek',
  };
}

const Page = async ({ params }: Props) => {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  return (
    <>
      <Button asChild className="mb-10 w-fit border-2 border-blue-200 bg-white text-xs font-medium text-slate-900 hover:bg-slate-100">
        <Link href="/admin/project">Kembali</Link>
      </Button>

      <section className="w-full max-w-3xl">
        <ProjectForm project={project} />
      </section>
    </>
  );
};
export default Page;
