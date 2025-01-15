import { Project, TechStackProject, User, UserRole } from '@prisma/client';
import { type DefaultSession } from 'next-auth';

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  role?: UserRole;
};

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

interface ProjectProps {
  project: ProjectWithTech | null;
}

export type ProjectWithTech = Project & {
  techStack: TechStackProject[];
};
