import { getUsers } from '@/actions/admin/getUsers';
import { getProject } from '@/actions/getProject';
import { getReview } from '@/actions/getReview';
import { getCareer } from '@/actions/getCareer';
import { getTechStack } from '@/actions/getTech';
import { AnimatedContent } from '@/components/layout/animatedContent';
import ClockWidget from '@/components/admin/clockWidget';
import StatsDashboard from '@/components/admin/statsDashboard';
import AverageRating from '@/components/averageRating';
import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const Page = async () => {
  const [review, user, project, career, techStack] = await Promise.all([getReview(), getUsers(), getProject(), getCareer(), getTechStack()]);

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
        </div>

        <AnimatedContent className="mt-7 space-y-4 w-full overflow-hidden">
          <ClockWidget />
          <StatsDashboard user={user} project={project} career={career} techStack={techStack} />
          <AverageRating review={review} />
        </AnimatedContent>
      </div>
    </PageContainer>
  );
};

export default Page;
