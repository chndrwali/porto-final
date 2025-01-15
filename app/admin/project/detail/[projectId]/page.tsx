import { getProjectById } from '@/actions/getProjectById';
import DetailProject from '@/components/admin/table/detailProject';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ projectId: string }>;
}

export const metadata: Metadata = {
  title: 'Detail Proyek',
};

const Page = async ({ params }: Props) => {
  const { projectId } = await params;
  const project = await getProjectById(projectId);
  if (!project) return redirect('/admin/project');

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center ">
        <h2 className="text-xl font-semibold">Detail Proyek</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <DetailProject project={project} />
      </div>
    </section>
  );
};

export default Page;
