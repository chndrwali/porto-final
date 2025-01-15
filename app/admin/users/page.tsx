import { Metadata } from 'next';
import { getUsers } from '@/actions/admin/getUsers';
import TableUsers from '@/components/admin/table/tableUsers';

export const metadata: Metadata = {
  title: 'Semua pengguna',
};

const Page = async () => {
  const users = await getUsers();

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center">
        <h2 className="text-xl font-semibold">Semua Pengguna</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <TableUsers users={users} />
      </div>
    </section>
  );
};

export default Page;
