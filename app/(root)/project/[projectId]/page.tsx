import { getProjectById } from '@/actions/getProjectById';
import DetailProject from '@/components/root/detailProject';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ projectId: string }>;
}

export const metadata: Metadata = {
  title: 'Detail Projects',
};

const Page = async ({ params }: Props) => {
  const { projectId } = await params;
  const project = await getProjectById(projectId);

  if (!project) redirect('/project');
  return <DetailProject project={project} />;
};

export default Page;
