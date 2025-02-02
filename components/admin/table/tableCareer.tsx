'use client';

import { deleteCareer } from '@/actions/admin/deleteCareer';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import { toast } from '@/hooks/use-toast';
import { Career } from '@prisma/client';
import { ChevronLeft, ChevronRight, LoaderIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
  career: Career[];
}

const TableCareer = ({ career }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm('Apakah anda yakin menghapus item ini?', 'Item ini akan di hapus dari list');
  const [rows, setRows] = useState<Career[]>(career ?? []);
  const [loading, setLoading] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });

  const totalItems = rows.length;
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);

  const changePage = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  const handleDelete = async (careerId: string) => {
    const ok = await confirm();
    if (ok) {
      setLoading(careerId);
      try {
        const result = await deleteCareer(careerId);
        if (result.success) {
          toast({
            title: 'Berhasil!',
            description: 'Karir berhasil dihapus.',
            variant: 'success',
          });
          setRows((prevRows) => prevRows.filter((career) => career.id !== careerId));
        } else {
          toast({
            title: 'Gagal!',
            description: result.message || 'Terjadi kesalahan saat menghapus karir.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error deleting karir:', error);
        toast({
          title: 'Gagal!',
          description: 'Terjadi kesalahan, coba lagi nanti.',
          variant: 'destructive',
        });
      } finally {
        setLoading(null);
      }
    }
  };
  return (
    <div className="space-y-4">
      <ConfirmDialog />

      <div className="w-full overflow-hidden border rounded-lg shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full divide-y divide-foreground">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground  uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground  uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground  uppercase tracking-wider">Period</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground  uppercase tracking-wider">Work Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground  uppercase tracking-wider">Career Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground  uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-background  divide-y divide-foreground">
              {currentItems.map((row) => (
                <tr key={row.id} className="hover:bg-gray-950 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{row.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{row.company} </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{row.period} </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{row.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{row.careerType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button onClick={() => handleDelete(row.id)} disabled={loading === row.id} variant="destructive" effect="expandIcon" icon={Trash2} iconPlacement="right">
                      {loading === row.id ? (
                        <>
                          <LoaderIcon className="size-4 animate-spin" />
                        </>
                      ) : (
                        <>Delete</>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-background">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
            </p>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => changePage(Math.max(1, pagination.currentPage - 1))}
                disabled={pagination.currentPage === 1}
                className="inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-300 dark:text-gray-400 bg-background hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;

                  // Show first page, current page, last page, and pages around current
                  if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= pagination.currentPage - 1 && pageNumber <= pagination.currentPage + 1)) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => changePage(pageNumber)}
                        className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors ${
                          pagination.currentPage === pageNumber ? 'bg-blue-600 text-white border-transparent' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-background hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }

                  // Show ellipsis for gaps
                  if (pageNumber === pagination.currentPage - 2 || pageNumber === pagination.currentPage + 2) {
                    return (
                      <span key={pageNumber} className="text-gray-500 dark:text-gray-400">
                        ...
                      </span>
                    );
                  }

                  return null;
                })}
              </div>

              <button
                onClick={() => changePage(Math.min(totalPages, pagination.currentPage + 1))}
                disabled={pagination.currentPage === totalPages}
                className="inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-500 dark:text-gray-400 bg-background hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableCareer;
