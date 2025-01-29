import { getProjectById } from '@/actions/getProjectById';
import { AnimatedContent } from '@/components/admin/animatedContent';
import { AnimatedSection } from '@/components/admin/animatedSection';
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
  title: 'Detail Proyek',
};

const Page = async ({ params }: Props) => {
  const { projectId } = await params;
  const project = await getProjectById(projectId);
  if (!project) return redirect('/admin/project');

  return (
    <AnimatedSection className="w-full rounded-2xl  p-7">
      <Button asChild variant="outline" effect="expandIcon" icon={ArrowLeftIcon} iconPlacement="left" className="mb-10 w-fit border-2 border-blue-200 text-xs font-medium">
        <Link href="/admin/project">Kembali</Link>
      </Button>
      <AnimatedContent className="flex flex-wrap items-center ">
        <h2 className="text-xl font-semibold">Detail Proyek</h2>
      </AnimatedContent>

      <AnimatedContent className="mt-7 w-full overflow-hidden">
        <DetailProject project={project} />
      </AnimatedContent>
    </AnimatedSection>
  );
};

export default Page;
