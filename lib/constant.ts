import { Home, Users, Bookmark, FolderKey, Settings, Laptop, TrendingUp } from 'lucide-react';

export const techStack = [
  { label: 'Next.js' },
  { label: 'React' },
  { label: 'Tailwind CSS' },
  { label: 'Node.js' },
  { label: 'TypeScript' },
  { label: 'JavaScript' },
  { label: 'Express.js' },
  { label: 'NestJS' },
  { label: 'Prisma' },
  { label: 'MongoDB' },
  { label: 'PostgreSQL' },
  { label: 'MySQL' },
  { label: 'GraphQL' },
  { label: 'REST API' },
  { label: 'Redux' },
  { label: 'Zustand' },
  { label: 'Vite' },
  { label: 'Webpack' },
  { label: 'SASS' },
  { label: 'Chakra UI' },
  { label: 'Material-UI (MUI)' },
  { label: 'Ant Design' },
  { label: 'Styled Components' },
  { label: 'Bootstrap' },
  { label: 'Cypress' },
  { label: 'Jest' },
  { label: 'Testing Library' },
  { label: 'Storybook' },
  { label: 'Docker' },
  { label: 'Firebase' },
  { label: 'AWS' },
  { label: 'Azure' },
  { label: 'Supabase' },
  { label: 'Strapi' },
  { label: 'Sanity' },
  { label: 'Contentful' },
  { label: 'Tiptap' },
  { label: 'ESLint' },
  { label: 'Prettier' },
  { label: 'Vitest' },
  { label: 'PNPM' },
  { label: 'Yarn' },
  { label: 'NPM' },
];

export const navigationLinks = [
  {
    href: '/library',
    label: 'Library',
  },

  {
    img: '/icons/user.svg',
    selectedImg: '/icons/user-fill.svg',
    href: '/my-profile',
    label: 'My Profile',
  },
];

export const adminSideBarLinks = [
  {
    Icon: Home,
    route: '/admin',
    text: 'Beranda',
  },
  {
    Icon: Users,
    route: '/admin/users',
    text: 'Semua Pengguna',
  },
  {
    Icon: FolderKey,
    route: '/admin/project',
    text: 'Semua Proyek',
  },
  {
    Icon: Laptop,
    route: '/admin/techstack',
    text: 'Tech Stack',
  },
  {
    Icon: TrendingUp,
    route: '/admin/review',
    text: 'Review',
  },
  {
    Icon: Settings,
    route: '/admin/settings',
    text: 'Pengaturan',
  },
];
