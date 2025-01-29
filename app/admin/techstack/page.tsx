import { getTechStack } from '@/actions/getTech';
import { AnimatedContent } from '@/components/admin/animatedContent';
import { AnimatedSection } from '@/components/admin/animatedSection';
import TechStackForm from '@/components/admin/form/techStackForm';
import TableTech from '@/components/admin/table/tableTech';
import CustomDialog from '@/components/customDialog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Stack',
};

const Page = async () => {
  const techStack = await getTechStack();
  return (
    <AnimatedSection className="w-full rounded-2xl  p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Tech Stack</h2>
        <CustomDialog textButton="Tambah Tech" titleDialog="Form">
          <TechStackForm />
        </CustomDialog>
      </div>

      <AnimatedContent className="mt-7 w-full overflow-hidden">
        <TableTech techStack={techStack} />
      </AnimatedContent>
    </AnimatedSection>
  );
};

export default Page;
