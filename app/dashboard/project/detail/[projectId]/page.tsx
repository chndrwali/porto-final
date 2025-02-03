import { getProjectById } from '@/actions/getProjectById';
import { AnimatedContent } from '@/components/layout/animatedContent';
import DetailProject from '@/components/admin/table/detailProject';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';

interface Props {
  params: Promise<{ projectId: string }>;
}

export const metadata: Metadata = {
  title: 'Detail Project',
};

const Page = async ({ params }: Props) => {
  const { projectId } = await params;
  const project = await getProjectById(projectId);
  if (!project) return redirect('/admin/project');

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <Button asChild variant="outline" effect="expandIcon" icon={ArrowLeftIcon} iconPlacement="left" className="mb-10 w-fit border-2 border-purple text-xs font-medium">
          <Link href="/dashboard/project">Back</Link>
        </Button>
        <AnimatedContent className="flex flex-wrap items-center ">
          <h2 className="text-xl font-semibold">Detail Project</h2>
        </AnimatedContent>

        <AnimatedContent className="mt-7 w-full overflow-hidden">
          <DetailProject project={project} />
        </AnimatedContent>
      </div>
    </PageContainer>
  );
};

export default Page;
