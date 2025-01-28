import { Home, Users, FolderKey, Laptop, TrendingUp, PenTool } from 'lucide-react';

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

export const adminSideBarLinks = [
  {
    Icon: Home,
    route: '/admin',
    text: 'Beranda',
  },
  {
    Icon: Users,
    route: '/admin/users',
    text: 'Pengguna',
  },
  {
    Icon: FolderKey,
    route: '/admin/project',
    text: 'Proyek',
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
    Icon: PenTool,
    route: '/admin/skills',
    text: 'Skill',
  },
];

export const projects = [
  {
    id: 1,
    title: '3D Solar System Planets to Explore',
    des: 'Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.',
    img: '/icons/root/p1.svg',
    iconLists: ['/icons/root/re.svg', '/icons/root/tail.svg', '/icons/root/ts.svg', '/icons/root/three.svg', '/icons/root/fm.svg'],
    link: '/ui.earth.com',
  },
  {
    id: 2,
    title: 'Yoom - Video Conferencing App',
    des: 'Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.',
    img: '/icons/root/p2.svg',
    iconLists: ['/icons/root/next.svg', '/icons/root/tail.svg', '/icons/root/ts.svg', '/icons/root/stream.svg', '/icons/root/c.svg'],
    link: '/ui.yoom.com',
  },
  {
    id: 3,
    title: 'AI Image SaaS - Canva Application',
    des: 'A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.',
    img: '/icons/root/p3.svg',
    iconLists: ['/icons/root/re.svg', '/icons/root/tail.svg', '/icons/root/ts.svg', '/icons/root/three.svg', '/icons/root/c.svg'],
    link: '/ui.aiimg.com',
  },
  {
    id: 4,
    title: 'Animated Apple Iphone 3D Website',
    des: 'Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..',
    img: '/icons/root/p4.svg',
    iconLists: ['/icons/root/next.svg', '/icons/root/tail.svg', '/icons/root/ts.svg', '/icons/root/three.svg', '/icons/root/gsap.svg'],
    link: '/ui.apple.com',
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
