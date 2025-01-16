import { getReview } from '@/actions/getReview';
import { AnimatedContent } from '@/components/admin/animatedContent';
import { AnimatedSection } from '@/components/admin/animatedSection';
import ClockWidget from '@/components/admin/clockWidget';
import AverageRating from '@/components/averageRating';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const Page = async () => {
  const review = await getReview();
  return (
    <AnimatedSection className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      <AnimatedContent className="mt-7 space-y-4 w-full overflow-hidden">
        <ClockWidget />
        <AverageRating review={review} />
      </AnimatedContent>
    </AnimatedSection>
  );
};

export default Page;
