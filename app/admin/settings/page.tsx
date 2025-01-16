import { AnimatedContent } from '@/components/admin/animatedContent';
import { AnimatedSection } from '@/components/admin/animatedSection';

const Page = () => {
  return (
    <AnimatedSection className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center">
        <h2 className="text-xl font-semibold">Pengaturan</h2>
      </div>

      <AnimatedContent className="mt-7 w-full overflow-hidden">TechStack</AnimatedContent>
    </AnimatedSection>
  );
};

export default Page;
