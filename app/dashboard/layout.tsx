import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import KBar from '@/components/kbar';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { redirect } from 'next/navigation';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/sign-in');
  const isAdmin = currentUser.role === 'ADMIN';

  if (!isAdmin) redirect('/');
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar currentUser={currentUser} />
        <SidebarInset>
          <Header currentUser={currentUser} />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
};

export default DashboardLayout;
