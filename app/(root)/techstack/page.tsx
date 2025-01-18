import { getTechStack } from '@/actions/getTech';
import TechStackSection from '@/components/root/techStack/techStackSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Stack',
};

const Page = async () => {
  const techStack = await getTechStack();
  return (
    <>
      <TechStackSection techStack={techStack} />
    </>
  );
};

export default Page;
