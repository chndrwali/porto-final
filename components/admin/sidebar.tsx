'use client';

import Image from 'next/image';
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
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10">
      <ConfirmDialog />
      <div>
        <div className="flex flex-row items-center gap-2 border-b border-dashed border-primary/20 pb-10 max-md:justify-center">
          <LayoutDashboard className="size-5" />
          <h1 className="text-2xl font-semibold text-primary max-md:hidden">Dashboard</h1>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected = (link.route !== '/admin' && pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div className={cn('flex flex-row items-center w-full gap-2 rounded-lg px-5 py-3.5 max-md:justify-center', isSelected && 'bg-primary shadow-sm')}>
                  <div className="relative size-5">
                    <Image src={link.img} alt="icon" fill className={`${isSelected ? 'brightness-0 invert' : ''}  object-contain`} />
                  </div>

                  <p className={cn(isSelected ? 'text-white' : 'text-primary', 'text-base font-medium max-md:hidden')}>{link.text}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="my-8 flex w-full flex-row gap-2 rounded-full border border-amber-200 px-6 py-2 shadow-sm max-md:px-2">
        <Avatar>
          <AvatarFallback className="bg-amber-100">{getInitials(currentUser?.name || 'IN')}</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex flex-col max-md:hidden">
              <p className="font-semibold text-neutral-900">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser.email}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem onClick={handleLogout}>
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
