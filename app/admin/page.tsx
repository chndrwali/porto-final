import { getUsers } from '@/actions/admin/getUsers';
import { getProject } from '@/actions/getProject';
import { getReview } from '@/actions/getReview';
import { getCareer } from '@/actions/getCareer';
import { getTechStack } from '@/actions/getTech';
import { AnimatedContent } from '@/components/admin/animatedContent';
import { AnimatedSection } from '@/components/admin/animatedSection';
import ClockWidget from '@/components/admin/clockWidget';
import StatsDashboard from '@/components/admin/statsDashboard';
import AverageRating from '@/components/averageRating';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const Page = async () => {
  const [review, user, project, career, techStack] = await Promise.all([getReview(), getUsers(), getProject(), getCareer(), getTechStack()]);

  return (
    <AnimatedSection className="w-full rounded-2xl p-7">
      <div className="flex flex-wrap items-center">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      <AnimatedContent className="mt-7 space-y-4 w-full overflow-hidden">
        <ClockWidget />
        <StatsDashboard user={user} project={project} career={career} techStack={techStack} />
        <AverageRating review={review} />
      </AnimatedContent>
    </AnimatedSection>
  );
};

export default Page;
