import { NavItem } from '@/types';

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
  { label: 'Dicoding' },
  { label: 'Alibaba Cloud' },
  { label: 'Google TensorFlow' },
  { label: 'Microsoft Certified' },
  { label: 'Coursera' },
  { label: 'Udemy' },
  { label: 'Code Politan' },
  { label: 'LinkedIn Learning' },
];

export const navItems = [
  {
    name: 'About',
    link: '/',
  },
  {
    name: 'Projects',
    link: '/project',
  },
  {
    name: 'Testimonials',
    link: '/testimonial',
  },
  {
    name: 'Contact',
    link: '/contact',
  },
];

export const adminSideBarLink: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: 'User',
    url: '/dashboard/users',
    icon: 'user',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [], // No child items
  },
  {
    title: 'Project',
    url: '/dashboard/project',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [], // No child items
  },
  {
    title: 'Career',
    url: '/dashboard/career',
    icon: 'career',
    shortcut: ['c', 'c'],
    isActive: false,
    items: [], // No child items
  },
  {
    title: 'Review',
    url: '/dashboard/review',
    icon: 'review',
    shortcut: ['r', 'r'],
    isActive: false,
    items: [], // No child items
  },
  {
    title: 'Tech Stack',
    url: '/dashboard/techstack',
    icon: 'laptop',
    shortcut: ['t', 't'],
    isActive: false,
    items: [], // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm'],
      },
    ],
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [], // No child items
  },
];

export const workExperience = [
  {
    id: 1,
    title: 'Frontend Engineer Intern',
    desc: 'Assisted in the development of a web-based platform using React.js, enhancing interactivity.',
    className: 'md:col-span-2',
    thumbnail: '/icons/root/exp1.svg',
  },
  {
    id: 2,
    title: 'Web Dev',
    desc: 'Designed and developed web app platforms using Next JS.',
    className: 'md:col-span-2', // change to md:col-span-2
    thumbnail: '/icons/root/exp2.svg',
  },
  {
    id: 3,
    title: 'Freelance Web Dev Project',
    desc: 'Led the dev of a web app for a client, from initial concept to deployment on vercel.',
    className: 'md:col-span-2', // change to md:col-span-2
    thumbnail: '/icons/root/exp3.svg',
  },
  {
    id: 4,
    title: 'Lead Frontend Developer',
    desc: 'Developed and maintained user-facing features using modern frontend technologies.',
    className: 'md:col-span-2',
    thumbnail: '/icons/root/exp4.svg',
  },
];

export const socialMedia = [
  {
    id: 1,
    img: '/icons/root/git.svg',
    link: 'https://github.com/chndrwali',
  },
  {
    id: 2,
    img: '/icons/root/link.svg',
    link: 'https://www.linkedin.com/in/chndrwali/',
  },
  {
    id: 3,
    img: '/icons/root/instagram.svg',
    link: 'https://www.instagram.com/chndrwali',
  },
];
