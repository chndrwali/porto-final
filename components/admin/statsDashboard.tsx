import { ProjectWithTech } from '@/types';
import { Skill, TechStack, User } from '@prisma/client';
import { FolderKey, Laptop, PenTool, Users } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
  user: User[];
  project: ProjectWithTech[];
  skill: Skill[];
  techStack: TechStack[];
}

const StatsDashboard = ({ user, project, skill, techStack }: Props) => {
  const statistics = useMemo(() => {
    const totalUser = user.length;
    const totalProject = project.length;
    const totalSkill = skill.length;
    const totalTech = techStack.length;

    return {
      totalUser,
      totalProject,
      totalSkill,
      totalTech,
    };
  }, [user, project, skill, techStack]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total Pengguna</h3>
          <Users className="size-4" />
        </div>
        <p className="text-2xl font-bold">{statistics.totalUser}</p>
      </div>

      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total Proyek</h3>
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
          <h3 className="text-sm font-medium">Total Skill</h3>
          <PenTool className="size-4" />
        </div>
        <p className="text-2xl font-bold">{statistics.totalSkill}</p>
      </div>
    </div>
  );
};

export default StatsDashboard;
