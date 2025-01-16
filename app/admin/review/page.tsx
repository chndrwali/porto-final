import { getReview } from '@/actions/getReview';
import { AnimatedContent } from '@/components/admin/animatedContent';
import { AnimatedSection } from '@/components/admin/animatedSection';
import TableReview from '@/components/admin/table/tableReview';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Review',
};

const Page = async () => {
  const review = await getReview();
  return (
    <AnimatedSection className="w-full rounded-2xl bg-white p-7">
      <AnimatedContent className="flex flex-wrap items-center ">
        <h2 className="text-xl font-semibold">Review</h2>
      </AnimatedContent>

      <AnimatedContent className="mt-7 w-full overflow-hidden">
        <TableReview review={review} />
      </AnimatedContent>
    </AnimatedSection>
  );
};

export default Page;
