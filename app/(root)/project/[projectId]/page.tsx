import { getProjectById } from '@/actions/getProjectById';
import DetailProject from '@/components/admin/table/detailProject';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
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
  return (
    <div className="mt-4">
      <Button asChild variant="outline" effect="expandIcon" icon={ArrowLeftIcon} iconPlacement="left" className="mb-10 w-fit border-2 border-purple text-xs font-medium">
        <Link href="/project">Back</Link>
      </Button>
      <DetailProject project={project} />
    </div>
  );
};

export default Page;
