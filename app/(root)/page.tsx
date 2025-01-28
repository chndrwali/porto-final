import { getTechStack } from '@/actions/getTech';
import { CareerSection } from '@/components/root/career';
import HeroSection from '@/components/root/heroSection';
import TechStackSection from '@/components/root/techStack/techStackSection';

export default async function Home() {
  const techStack = await getTechStack();
  return (
    <>
      <HeroSection />
      <CareerSection />
      <TechStackSection techStack={techStack} />
    </>
  );
}
