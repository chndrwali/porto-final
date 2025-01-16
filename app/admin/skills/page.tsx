import { getSkills } from '@/actions/getSkill';
import { AnimatedContent } from '@/components/admin/animatedContent';
import { AnimatedSection } from '@/components/admin/animatedSection';
import SkillForm from '@/components/admin/form/skillFom';
import TableSkill from '@/components/admin/table/tableSkill';
import CustomDialog from '@/components/customDialog';

const Page = async () => {
  const skill = await getSkills();

  return (
    <AnimatedSection className="w-full rounded-2xl bg-white p-7">
      <AnimatedContent className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Skill</h2>
        <CustomDialog textButton="Tambah Skill" titleDialog="Form">
          <SkillForm />
        </CustomDialog>
      </AnimatedContent>

      <AnimatedContent className="mt-7 w-full overflow-hidden">
        <TableSkill skill={skill} />
      </AnimatedContent>
    </AnimatedSection>
  );
};

export default Page;
