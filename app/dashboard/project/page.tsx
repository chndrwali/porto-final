import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Heading } from '@/components/layout/heading';
import { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { getProject } from '@/actions/getProject';
import { buttonVariants } from '@/components/ui/button';
import { AnimatedContent } from '@/components/layout/animatedContent';
import TableProject from '@/components/admin/table/tableProject';
import PageContainer from '@/components/layout/page-container';

export const metadata: Metadata = {
  title: 'All Projects',
};

const Page = async () => {
  const project = await getProject();

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AnimatedContent className="flex items-start justify-between">
          <Heading title="Projects" description="Manage projects (Server side table functionalities.)" />
          <Link href="/dashboard/project/new" className={cn(buttonVariants(), 'text-xs md:text-sm')}>
            <Plus className="mr-2 h-4 w-4" /> Add New Project
          </Link>
        </AnimatedContent>
        <Separator />

        <TableProject project={project} />
      </div>
    </PageContainer>
  );
};

export default Page;
