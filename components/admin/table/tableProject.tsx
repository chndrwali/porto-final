'use client';

import { deleteProject } from '@/actions/admin/deleteProject';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import { toast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/utils';
import { ProjectWithTech } from '@/types';
import { ChevronLeft, ChevronRight, LoaderIcon, Trash2 } from 'lucide-react';
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
  const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'FULLSTACK':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'FRONTEND':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      <ConfirmDialog />
      <div className="w-full overflow-hidden border rounded-lg shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full divide-y divide-gray-300 ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">Judul</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">Waktu</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">Detail</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white  divide-y divide-gray-200 ">
              {currentItems.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(row.category)}`}>{row.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500"> {row.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500"> {formatDate(row.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button asChild variant="outline">
                      <Link href={`/admin/project/detail/${row.id}`}>Detail</Link>
                    </Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} dari {totalItems}
            </p>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => changePage(Math.max(1, pagination.currentPage - 1))}
                disabled={pagination.currentPage === 1}
                className="inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
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
                className="inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

export default TableProject;
