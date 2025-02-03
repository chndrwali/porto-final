'use client';

import { useDebouncedValue } from '@mantine/hooks';
import { Search } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import searchProject from '@/actions/searchProject';
import { cn } from '@/lib/utils';
import { DialogTitle } from '@/components/ui/dialog';
import { IKImage } from 'imagekitio-next';
import config from '@/lib/config';

type SearchResult = {
  id: string;
  name: string;
  category: string;
  image: string;
};

const groupByCategory = (items: SearchResult[]) => {
  return items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);
};

const SearchButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [debounced] = useDebouncedValue(query, 300);
  const [data, setData] = useState<{ id: string; name: string; category: string; image: string }[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (debounced.length <= 0) {
      setData(null);
      return;
    }

    const fetchProducts = async () => {
      const response = await searchProject(debounced);
      setData(response);
    };

    startTransition(fetchProducts);

    return () => setData(null);
  }, [debounced]);

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  const handleSelect = useCallback((callback: () => unknown) => {
    setOpen(false);
    callback();
  }, []);

  const groupedData = data ? groupByCategory(data) : null;

  return (
    <>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant="outline"
        className={cn('relative h-9 w-full sm:w-9 p-0 sm:p-0', 'sm:xl:h-10 sm:xl:w-60 sm:xl:justify-start sm:xl:px-3 sm:xl:py-2', 'bg-gray-700 backdrop-blur supports-[backdrop-filter]:bg-gray-700')}
      >
        <Search className="h-4 w-4 sm:xl:mr-2" aria-hidden="true" />
        <span className="inline-flex sm:hidden sm:xl:inline-flex">Search project...</span>
        <span className="sr-only">Search project</span>
        <kbd className={cn('pointer-events-none absolute right-2 top-2 hidden h-6', 'select-none items-center gap-1 rounded-full border', 'bg-muted px-1.5 font-mono text-xs font-medium opacity-100', 'sm:hidden sm:xl:flex')}>
          <abbr title="Control" className="no-underline">
            Ctrl
          </abbr>
          K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden">Search</DialogTitle>
        <CommandInput value={query} onValueChange={setQuery} placeholder="Search project..." />
        <CommandList>
          <CommandEmpty className={isPending ? 'hidden' : 'py-6 text-center text-sm'}>No results found.</CommandEmpty>
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            groupedData &&
            Object.entries(groupedData).map(([category, items]) => (
              <CommandGroup key={category} className="capitalize" heading={category}>
                {items.map((item) => (
                  <CommandItem value={item.name} onSelect={() => handleSelect(() => router.push(`/project/${item.id}`))} className="cursor-pointer">
                    <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                      <IKImage path={item.image} urlEndpoint={config.env.imageKit.urlEndpoint} alt={item.name} fill sizes="40px" className="object-cover w-full h-full" loading="lazy" lqip={{ active: true }} />
                    </div>
                    <span className="truncate">{item.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchButton;
