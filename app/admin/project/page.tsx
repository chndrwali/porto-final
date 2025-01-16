import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';
import { PlusIcon } from 'lucide-react';
import TableProject from '@/components/admin/table/tableProject';
import { getProject } from '@/actions/getProject';
import { AnimatedSection } from '@/components/admin/animatedSection';
import { AnimatedContent } from '@/components/admin/animatedContent';

export const metadata: Metadata = {
  title: 'Semua proyek',
};

const Page = async () => {
  const project = await getProject();

  return (
    <AnimatedSection className="w-full rounded-2xl bg-white p-7">
      <AnimatedContent className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Proyek</h2>
        <Button effect="expandIcon" icon={PlusIcon} iconPlacement="left" asChild>
          <Link href="/admin/project/new" className="text-white">
            Buat Proyek
          </Link>
        </Button>
      </AnimatedContent>

      <AnimatedContent className="mt-7 w-full overflow-hidden">
        <TableProject project={project} />
      </AnimatedContent>
    </AnimatedSection>
  );
};

export default Page;
