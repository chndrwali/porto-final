'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@prisma/client';
import { FaUser } from 'react-icons/fa6';

interface DetailUserProps {
  user: User;
}

const DetailUser = ({ user }: DetailUserProps) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
      {/* User Information */}
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.image || ''} />
          <AvatarFallback>
            <FaUser size={40} />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user.name || 'Tidak ada nama'}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500 capitalize">Role: {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
