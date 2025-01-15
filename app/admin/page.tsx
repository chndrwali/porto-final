import ClockWidget from '@/components/admin/clockWidget';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const Page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <ClockWidget />
      </div>
    </section>
  );
};

export default Page;
