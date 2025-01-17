import { getProject } from '@/actions/getProject';
import ProjectSection from '@/components/root/projectSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
};

const Page = async () => {
  const project = await getProject();

  return <ProjectSection project={project} />;
};

export default Page;
