'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDate, getInitials } from '@/lib/utils';
import { User } from '@prisma/client';
import { FaCheckCircle, FaClock, FaEnvelope, FaShieldAlt, FaTimesCircle } from 'react-icons/fa';

interface DetailUserProps {
  user: User;
}

const DetailUser = ({ user }: DetailUserProps) => {
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
    <div className=" bg-white rounded-xl shadow-sm transition-all">
      {/* User Information */}
      <div className="flex items-center p-4 ">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="bg-amber-100">
            <span className="text-2xl">{getInitials(user.name || 'IN')}</span>
          </AvatarFallback>
        </Avatar>
        <div className="px-6 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name || 'Tidak ada nama'}</h2>
              <div className="mt-1 flex items-center gap-2">
                <FaEnvelope className="h-4 w-4 text-gray-400" />
                <a href={`mailto:${user.email}`} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  {user.email}
                </a>
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>{user.role}</span>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <FaClock className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Dibuat pada</p>
                <p className="text-sm text-gray-900 dark:text-white">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <FaShieldAlt className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status Akun</p>
                <div className="flex items-center gap-1.5">
                  {user?.emailVerified ? (
                    <>
                      <FaCheckCircle className="h-4 w-4 text-green-500" aria-label="Terverifikasi" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Terverifikasi</p>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="h-4 w-4 text-red-500" aria-label="Belum Terverifikasi" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Belum Terverifikasi</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <FaClock className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Diperbarui pada</p>
              <p className="text-sm text-gray-900 dark:text-white">{formatDate(user.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
