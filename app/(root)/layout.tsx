import Footer from '@/components/root/footer';
import Header from '@/components/root/header';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-black px-5 xs:px-10 md:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <Header />
        <div className="mt-10 pb-20">{children}</div>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
