import { getProjectById } from '@/actions/getProjectById';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ projectId: string }>;
}

export const metadata: Metadata = {
  title: 'Detail Proyek',
};

const Page = async ({ params }: Props) => {
  const { projectId } = await params;
  const project = await getProjectById(projectId);

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center ">
        <h2 className="text-xl font-semibold">Detail Proyek</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">{project?.id}</div>
    </section>
  );
};

export default Page;
