import { getCareer } from '@/actions/getCareer';
import { AnimatedContent } from '@/components/layout/animatedContent';
import CareerForm from '@/components/admin/form/careerForm';
import TableCareer from '@/components/admin/table/tableCareer';
import CustomDialog from '@/components/customDialog';
import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/layout/heading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career',
};

const Page = async () => {
  const career = await getCareer();

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AnimatedContent className="flex items-start justify-between">
          <Heading title="Careers" description="Manage careers (Server side table functionalities.)" />
          <CustomDialog textButton="Add New Career" titleDialog="Form">
            <CareerForm />
          </CustomDialog>
        </AnimatedContent>
        <Separator />

        <AnimatedContent className="mt-7 w-full max-w-5xl overflow-hidden">
          <TableCareer career={career} />
        </AnimatedContent>
      </div>
    </PageContainer>
  );
};

export default Page;
