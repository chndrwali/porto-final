import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';
import { PlusIcon } from 'lucide-react';
import TableProject from '@/components/admin/table/tableProject';
import { getProject } from '@/actions/getProject';

export const metadata: Metadata = {
  title: 'Semua proyek',
};

const Page = async () => {
  const project = await getProject();

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Semua Proyek</h2>
        <Button effect="expandIcon" icon={PlusIcon} iconPlacement="left" asChild>
          <Link href="/admin/project/new" className="text-white">
            Buat Proyek
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <TableProject project={project} />
      </div>
    </section>
  );
};

export default Page;
