import { getProjectById } from '@/actions/getProjectById';
import ProjectForm from '@/components/admin/form/projectForm';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import PageContainer from '@/components/layout/page-container';
import { AnimatedContent } from '@/components/layout/animatedContent';

interface Props {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params;
  const isNew = projectId === 'new';

  return {
    title: isNew ? 'Create project' : 'Update project',
  };
}

const Page = async ({ params }: Props) => {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <Button asChild variant="outline" effect="expandIcon" icon={ArrowLeftIcon} iconPlacement="left" className="mb-10 w-fit border-2 border-purple text-xs font-medium">
          <Link href="/dashboard/project">Back</Link>
        </Button>

        <AnimatedContent className="w-full">
          <ProjectForm project={project} />
        </AnimatedContent>
      </div>
    </PageContainer>
  );
};
export default Page;
