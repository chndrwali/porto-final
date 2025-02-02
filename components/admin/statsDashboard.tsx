import { ProjectWithTech } from '@/types';
import { Career, TechStack, User } from '@prisma/client';
import { FolderKey, Laptop, PenTool, Users } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
  user: User[];
  project: ProjectWithTech[];
  career: Career[];
  techStack: TechStack[];
}

const StatsDashboard = ({ user, project, career, techStack }: Props) => {
  const statistics = useMemo(() => {
    const totalUser = user.length;
    const totalProject = project.length;
    const totalCareer = career.length;
    const totalTech = techStack.length;

    return {
      totalUser,
      totalProject,
      totalCareer,
      totalTech,
    };
  }, [user, project, career, techStack]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total Users</h3>
          <Users className="size-4" />
        </div>
        <p className="text-2xl font-bold">{statistics.totalUser}</p>
      </div>

      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total Projects</h3>
          <FolderKey className="size-4" />
        </div>
        <p className="text-2xl font-bold">{statistics.totalProject}</p>
      </div>

      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total Tech Stack</h3>
          <Laptop className="size-4" />
        </div>
        <p className="text-2xl font-bold">{statistics.totalTech}</p>
      </div>

      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total Career</h3>
          <PenTool className="size-4" />
        </div>
        <p className="text-2xl font-bold">{statistics.totalCareer}</p>
      </div>
    </div>
  );
};

export default StatsDashboard;
