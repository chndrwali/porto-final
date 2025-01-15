'use client';

import { deleteProject } from '@/actions/admin/deleteProject';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import { toast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/utils';
import { ProjectWithTech } from '@/types';
import { LoaderIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  project: ProjectWithTech[];
}

const TableProject = ({ project }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm('Apakah anda yakin menghapus item ini?', 'Item ini akan di hapus dari list');
  const [rows, setRows] = useState<ProjectWithTech[]>(project ?? []);
  const [loading, setLoading] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });

  const totalItems = rows.length;
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  const handleDelete = async (projectId: string) => {
    const ok = await confirm();

    if (ok) {
      setLoading(projectId);

      try {
        const result = await deleteProject(projectId);

        if (result.success) {
          toast({
            title: 'Berhasil!',
            description: 'Proyek berhasil dihapus.',
            variant: 'success',
          });

          setRows((prevRows) => prevRows.filter((project) => project.id !== projectId));
        } else {
          toast({
            title: 'Gagal!',
            description: result.message || 'Terjadi kesalahan saat menghapus proyek.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error deleting project:', error);
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
    <div className="flex flex-col rounded-md shadow-sm p-4">
      <ConfirmDialog />
      <div className="w-full overflow-hidden border rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-nowrap border-collapse border-gray-300">
            <thead>
              <tr className=" bg-gray-200 text-xs font-semibold tracking-wide text-left text-foreground uppercase border-b">
                <th className="px-4 py-2 border border-gray-300">Kategori</th>
                <th className="px-4 py-2 border border-gray-300">Judul</th>
                <th className="px-4 py-2 border border-gray-300">Waktu</th>
                <th className="px-4 py-2 border border-gray-300">Detail</th>
                <th className="px-4 py-2 border border-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, index) => (
                <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} text-foreground/80`}>
                  <td className="px-4 py-2 border border-gray-300"> {row.category}</td>
                  <td className="px-4 py-2 border border-gray-300"> {row.title}</td>
                  <td className="px-4 py-2 border border-gray-300"> {formatDate(row.createdAt)}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <Button asChild variant="outline">
                      <Link href={`/admin/project/detail/${row.id}`}>Detail</Link>
                    </Button>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex items-center gap-4">
                      <Button asChild effect="shine">
                        <Link href={`/admin/project/${row.id}`}>Update</Link>
                      </Button>
                      <Button onClick={() => handleDelete(row.id)} disabled={loading === row.id} variant="destructive" effect="expandIcon" icon={Trash2} iconPlacement="right">
                        {loading === row.id ? (
                          <>
                            <LoaderIcon className="size-4 animate-spin" />
                          </>
                        ) : (
                          <>Hapus</>
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
                          ? 'px-3 py-1 text-white transition-colors duration-150 bg-blue-400 hover:bg-blue-500 border  rounded-md focus:outline-none focus:shadow-md'
                          : 'px-3 py-1 transition-colors duration-150 hover:bg-blue-500 hover:text-white rounded-md focus:outline-none focus:shadow-md'
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

export default TableProject;
