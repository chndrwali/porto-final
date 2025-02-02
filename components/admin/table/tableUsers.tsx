'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import { toast } from '@/hooks/use-toast';
import { getInitials } from '@/lib/utils';
import { User } from '@prisma/client';
import { ChevronLeft, ChevronRight, LoaderIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DetailUser from './detailUsers';
import { deleteUser } from '@/actions/admin/deleteUser';
import CustomDialog from '@/components/customDialog';

interface Props {
  users: User[];
}

const TableUsers = ({ users }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm('Anda yakin menghapus pengguna ini?', 'Data akan di hapus dari list');
  const [rows, setRows] = useState<User[]>(users || []);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleDeleteUser = async (userId: string) => {
    const ok = await confirm();

    if (ok) {
      setIsLoading(userId);

      try {
        const result = await deleteUser(userId);

        if (result.success) {
          toast({
            title: 'Berhasil!',
            description: 'Pengguna berhasil dihapus.',
            variant: 'success',
          });

          setRows((prevRows) => prevRows.filter((user) => user.id !== userId));
        } else {
          toast({
            title: 'Gagal!',
            description: result.message || 'Terjadi kesalahan saat menghapus pengguna.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        toast({
          title: 'Gagal!',
          description: 'Terjadi kesalahan, coba lagi nanti.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(null);
      }
    }
  };

  const totalItems = rows.length;
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);

  const changePage = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'USER':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };
  return (
    <div className="space-y-4">
      <ConfirmDialog />

      <div className="w-full overflow-hidden border rounded-lg shadow-sm">
        <div className="w-full overflow-x-auto ">
          <table className="w-full divide-y divide-foreground ">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground  uppercase tracking-wider">Name User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground  uppercase tracking-wider">Email User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground  uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground  uppercase tracking-wider">Detail</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground  uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-background  divide-y divide-gray-400 ">
              {currentItems.map((row) => (
                <tr key={row.id} className="hover:bg-gray-900 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar className="cursor-pointer ">
                        <AvatarFallback className="bg-purple">{getInitials(row.name || 'IN')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-muted-foreground ">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{row.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(row.role)}`}>{row.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <CustomDialog textButton="Detail" titleDialog="Detail User">
                      <DetailUser user={row} />
                    </CustomDialog>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4 text-sm">
                      {row.role === 'ADMIN' ? (
                        <></>
                      ) : (
                        <Button variant="destructive" onClick={() => handleDeleteUser(row.id)} disabled={isLoading === row.id} effect="expandIcon" icon={Trash2} iconPlacement="right">
                          {isLoading === row.id ? (
                            <>
                              <LoaderIcon className="size-4 animate-spin" />
                            </>
                          ) : (
                            <>Delete</>
                          )}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-background">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700 dark:text-muted-foreground">
              showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
            </p>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => changePage(Math.max(1, pagination.currentPage - 1))}
                disabled={pagination.currentPage === 1}
                className="inline-flex items-center px-2 py-2 border border-muted-foreground dark:border-gray-600 rounded-md text-sm text-gray-500 dark:text-gray-400 bg-background hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                          pagination.currentPage === pageNumber
                            ? 'bg-blue-600 text-white border-transparent'
                            : 'border-muted-foreground dark:border-gray-600 text-gray-700 dark:text-muted-foreground bg-background hover:bg-gray-50 dark:hover:bg-gray-700'
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
                className="inline-flex items-center px-2 py-2 border border-muted-foreground dark:border-gray-600 rounded-md text-sm text-gray-500 dark:text-gray-400 bg-background hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

export default TableUsers;
