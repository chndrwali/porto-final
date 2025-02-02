import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import SearchInput from '@/components/searchInput';
import { UserMenu } from '@/components/layout/user-menu';
import ThemeToggle from '@/components/layout/theme-toggle';
import { SafeUser } from '@/types';

export default async function Header({ currentUser }: { currentUser: SafeUser }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2 px-4">
        <div className="hidden md:flex">
          <SearchInput />
        </div>
        <UserMenu currentUser={currentUser} />
        <ThemeToggle />
      </div>
    </header>
  );
}
