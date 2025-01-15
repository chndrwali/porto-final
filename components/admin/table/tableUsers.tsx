'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useConfirm } from '@/hooks/use-confirm';
import { toast } from '@/hooks/use-toast';
import { getInitials } from '@/lib/utils';
import { User } from '@prisma/client';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import DetailUser from './detailUsers';
import { deleteUser } from '@/actions/admin/deleteUser';

interface Props {
  users: User[];
}

const TableUsers = ({ users }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm('Anda yakin menghapus pengguna ini?', 'Data akan di hapus dari list');
  const [rows, setRows] = useState<User[]>(users || []);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
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

  const changePage = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };
  return (
    <div className="flex flex-col items-center ">
      <ConfirmDialog />

      <div className="w-full overflow-hidden border rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto min-h-[580px]">
          <table className="w-full whitespace-no-wrap border-collapse border-gray-300 ">
            <thead>
              <tr className=" bg-gray-200 text-xs font-semibold tracking-wide text-left text-foreground uppercase border-b">
                <th className="px-4 py-2 border border-gray-300">Nama User</th>
                <th className="px-4 py-2 border border-gray-300">Email User</th>
                <th className="px-4 py-2 border border-gray-300">Role</th>
                <th className="px-4 py-2 border border-gray-300">Detail</th>
                <th className="px-4 py-2 border border-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, index) => (
                <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} text-foreground/80 `}>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="cursor-pointer ">
                        <AvatarFallback className="bg-blue-100">{getInitials(row.name || 'IN')}</AvatarFallback>
                      </Avatar>
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{row.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.role}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Dialog>
                      <DialogTrigger asChild onClick={() => setSelectedUser(row)}>
                        <Button type="button" variant="outline">
                          Detail
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[900px] w-[90%]">
                        <DialogHeader>
                          <DialogTitle>Detail User</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[75vh] overflow-y-auto px-2">{selectedUser && <DetailUser user={selectedUser} />}</div>
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center space-x-4 text-sm">
                      <Button variant="destructive" onClick={() => handleDeleteUser(row.id)} disabled={isLoading === row.id}>
                        {isLoading ? (
                          <div className=" w-5 h-5 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="mr-2 w-5 h-5" />
                            Hapus
                          </>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 text-xs font-semibold tracking-wide text-foreground/80 uppercase border-t bg-background">
          <span className="flex items-center">
            Menampilkan {indexOfFirstItem + 1} - {indexOfLastItem} dari {totalItems}
          </span>
          {/* Pagination */}
          <span className="flex mt-2 sm:mt-auto">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                {Array.from({ length: Math.ceil(totalItems / pagination.itemsPerPage) }).map((_, index) => (
                  <li key={index}>
                    <Button
                      onClick={() => changePage(index + 1)}
                      className={`${
                        pagination.currentPage === index + 1
                          ? 'px-3 py-1 text-white transition-colors duration-150 bg-gradientblue border border-r-0 border-gradientblue rounded-md focus:outline-none focus:shadow-outline-purple'
                          : 'px-3 py-1 transition-colors duration-150 hover:bg-brown-500 hover:text-white rounded-md focus:outline-none focus:shadow-outline-purple'
                      }`}
                    >
                      {index + 1}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TableUsers;
