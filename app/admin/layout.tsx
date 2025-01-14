import { getCurrentUser } from '@/actions/getCurrentUser';
import Header from '@/components/admin/header';
import Sidebar from '@/components/admin/sidebar';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/sign-in');
  const isAdmin = currentUser.role === 'ADMIN';

  if (!isAdmin) redirect('/');

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar currentUser={currentUser} />
      <div className="flex w-[calc(100%-264px)] flex-1 flex-col bg-white p-5 xs:p-10">
        <Header currentUser={currentUser} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
