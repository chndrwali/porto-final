import { Metadata } from 'next';
import { getUsers } from '@/actions/admin/getUsers';
import TableUsers from '@/components/admin/table/tableUsers';
import { AnimatedSection } from '@/components/admin/animatedSection';
import { AnimatedContent } from '@/components/admin/animatedContent';

export const metadata: Metadata = {
  title: 'Semua pengguna',
};

const Page = async () => {
  const users = await getUsers();

  return (
    <AnimatedSection className="w-full rounded-2xl p-7">
      <div className="flex flex-wrap items-center">
        <h2 className="text-xl font-semibold">Pengguna</h2>
      </div>

      <AnimatedContent className="mt-7 w-full overflow-hidden">
        <TableUsers users={users} />
      </AnimatedContent>
    </AnimatedSection>
  );
};

export default Page;
