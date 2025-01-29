import { getCareer } from '@/actions/getCareer';
import { AnimatedContent } from '@/components/admin/animatedContent';
import { AnimatedSection } from '@/components/admin/animatedSection';
import CareerForm from '@/components/admin/form/careerForm';
import TableCareer from '@/components/admin/table/tableCareer';
import CustomDialog from '@/components/customDialog';

const Page = async () => {
  const career = await getCareer();

  return (
    <AnimatedSection className="w-full rounded-2xl p-7">
      <AnimatedContent className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Karir</h2>
        <CustomDialog textButton="Tambah Karir" titleDialog="Form">
          <CareerForm />
        </CustomDialog>
      </AnimatedContent>

      <AnimatedContent className="mt-7 w-full overflow-hidden">
        <TableCareer career={career} />
      </AnimatedContent>
    </AnimatedSection>
  );
};

export default Page;
