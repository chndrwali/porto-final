import { Metadata } from 'next';
import { getUsers } from '@/actions/admin/getUsers';
import TableUsers from '@/components/admin/table/tableUsers';
import { AnimatedContent } from '@/components/layout/animatedContent';
import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/layout/heading';

export const metadata: Metadata = {
  title: 'All Users',
};

const Page = async () => {
  const users = await getUsers();

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AnimatedContent className="flex items-start justify-between">
          <Heading title="Users" description="Manage users (Server side table functionalities.)" />
        </AnimatedContent>
        <Separator />

        <AnimatedContent className="mt-7 w-full overflow-hidden">
          <TableUsers users={users} />
        </AnimatedContent>
      </div>
    </PageContainer>
  );
};

export default Page;
