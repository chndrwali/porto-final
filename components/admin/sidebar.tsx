'use client';

import { adminSideBarLinks } from '@/lib/constant';
import Link from 'next/link';
import { cn, getInitials } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SafeUser } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LayoutDashboard } from 'lucide-react';
import { useConfirm } from '@/hooks/use-confirm';
import { logout } from '@/actions/logout';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Sidebar = ({ currentUser }: { currentUser: SafeUser }) => {
  const pathname = usePathname();
  const [ConfirmDialog, confirm] = useConfirm('Konfirmasi keluar', 'Apakah Anda yakin ingin keluar dari akun?');
  const handleLogout = async () => {
    try {
      const isConfirmed = await confirm();
      if (isConfirmed) {
        logout();
        toast({
          title: 'Logout Berhasil',
          description: 'Anda telah berhasil keluar dari akun.',
          variant: 'success',
        });
      }
    } catch (error) {
      console.error('Error during logout confirmation:', error);
      toast({
        title: 'Logout Gagal',
        description: 'Terjadi kesalahan saat mencoba keluar dari akun.',
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, type: 'spring', stiffness: 100 }} className="sticky left-0 top-0 flex h-dvh w-[280px] flex-col bg-white">
      <ConfirmDialog />

      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-shrink-0 flex-row items-center gap-2 border-b border-dashed border-primary/20 px-5 py-8 max-md:justify-center"
      >
        <LayoutDashboard className="size-5" />
        <h1 className="text-2xl font-semibold text-primary max-md:hidden">Admin</h1>
      </motion.div>

      {/* Navigation Section - Scrollable */}
      <div className="flex-1 overflow-hidden px-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-full overflow-y-auto py-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          <div className="flex flex-col gap-5 pr-2">
            {adminSideBarLinks.map((link, index) => {
              const isSelected = (link.route !== '/admin' && pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

              return (
                <Link href={link.route} key={link.route}>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1 * index,
                      duration: 0.5,
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={cn('flex flex-row items-center w-full gap-2 rounded-lg px-5 py-3.5 max-md:justify-center', isSelected && 'bg-blue-400 shadow-sm')}
                  >
                    <div className="relative size-5">
                      <link.Icon className={`${isSelected ? 'brightness-0 invert' : ''}  object-contain`} />
                    </div>

                    <p className={cn(isSelected ? 'text-white' : 'text-primary', 'text-base font-medium max-md:hidden')}>{link.text}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Profile Section */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }} className="flex-shrink-0 border-t border-dashed border-primary/20 px-2 py-5">
        <motion.div whileHover={{ scale: 1.02 }} className=" flex w-full flex-row gap-2 rounded-full border-2 border-blue-200 px-6 py-2 shadow-sm max-md:px-2">
          <Avatar>
            <AvatarFallback className="bg-blue-100">{getInitials(currentUser?.name || 'IN')}</AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex flex-col max-md:hidden">
                <p className="font-semibold text-neutral-900">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.email}</p>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem onClick={handleLogout}>
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
