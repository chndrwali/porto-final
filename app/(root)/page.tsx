import { getCareer } from '@/actions/getCareer';
import { getTechStack } from '@/actions/getTech';
import { CareerSection } from '@/components/root/career';
import Experience from '@/components/root/experience';
import HeroSection from '@/components/root/heroSection';
import TechStackSection from '@/components/root/techStack/techStackSection';

export default async function Home() {
  const [techStack, career] = await Promise.all([getTechStack(), getCareer()]);
  return (
    <>
      <HeroSection />
      <CareerSection career={career} />
      <Experience />
      <TechStackSection techStack={techStack} />
    </>
  );
}
