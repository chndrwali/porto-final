'use client';

import { useConfirm } from '@/hooks/use-confirm';
import { ProjectWithTech } from '@/types';
import { useState } from 'react';

interface Props {
  project: ProjectWithTech[];
}

const TableProject = ({ project }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm('Apakah anda yakin menghapus item ini?', 'Item ini akan di hapus dari list');
  const [rows, setRows] = useState<ProjectWithTech[]>(project ?? []);
  const [selectedProject, setSelectedProject] = useState<ProjectWithTech | null>(null);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });

  const totalItems = rows.length;
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  const handleDelete = async (projectId: string) => {};

  return (
    <div className="flex flex-col rounded-md shadow-sm p-4">
      <ConfirmDialog />
    </div>
  );
};

export default TableProject;
