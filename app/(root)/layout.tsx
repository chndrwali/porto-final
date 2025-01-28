import Footer from '@/components/root/footer';
import { Header } from '@/components/root/header';
import { navItems } from '@/lib/constant';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative bg-black-100 overflow-hidden flex min-h-screen flex-1 flex-col px-5 xs:px-10 md:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <Header navItems={navItems} />
        <div className="mt-10 pb-20">{children}</div>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
