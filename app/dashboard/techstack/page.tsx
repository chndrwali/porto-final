import { getTechStack } from '@/actions/getTech';
import { AnimatedContent } from '@/components/layout/animatedContent';
import TechStackForm from '@/components/admin/form/techStackForm';
import TableTech from '@/components/admin/table/tableTech';
import CustomDialog from '@/components/customDialog';
import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/layout/heading';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Tech Stack',
};

const Page = async () => {
  const techStack = await getTechStack();
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AnimatedContent className="flex items-start justify-between">
          <Heading title="Tech Stack" description="Manage tech stack (Server side table functionalities.)" />
          <CustomDialog textButton="Add Tech Stack" titleDialog="Form">
            <TechStackForm />
          </CustomDialog>
        </AnimatedContent>
        <Separator />

        <AnimatedContent className="mt-7 w-full overflow-hidden">
          <TableTech techStack={techStack} />
        </AnimatedContent>
      </div>
    </PageContainer>
  );
};

export default Page;
