'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navigationLinks } from '@/lib/constant';
import { cn } from '@/lib/utils';

const Header = () => {
  const pathname = usePathname();

  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="sticky top-0 z-50 font-mono backdrop-blur-md">
      <div className="container mx-auto py-4 flex justify-between items-center px-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/">
            <Image src="/logo/logo.png" alt="logo" width={40} height={40} className="object-contain" />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <AnimatePresence mode="wait">
              {navigationLinks.map((nav) => (
                <motion.li key={nav.label} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} whileHover={{ y: -2 }} className="relative group">
                  <Link href={nav.href} className={cn('text-muted/60 transition-colors group-hover:text-emerald-500', pathname === nav.href && 'text-muted font-medium')}>
                    {nav.label}
                    {pathname === nav.href && <motion.div layoutId="underline" className="absolute left-0 top-full h-[2px] w-full bg-muted group-hover:bg-emerald-500" initial={false} />}
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {navigationLinks.map((nav) => (
                <motion.div key={nav.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} whileHover={{ x: 4 }}>
                  <Link href={nav.href} className={cn('block py-2 text-lg text-muted-foreground transition-colors hover:text-primary', pathname === nav.href && 'text-primary font-medium')}>
                    {nav.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
};

export default Header;
