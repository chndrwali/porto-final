import { getReview } from '@/actions/getReview';
import { AnimatedContent } from '@/components/layout/animatedContent';
import { AnimatedSection } from '@/components/layout/animatedSection';
import TableReview from '@/components/admin/table/tableReview';
import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/layout/heading';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Review',
};

const Page = async () => {
  const review = await getReview();
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AnimatedContent className="flex items-start justify-between">
          <Heading title="Reviews" description="Manage reviews (Server side table functionalities.)" />
        </AnimatedContent>
        <Separator />

        <AnimatedContent className="mt-7 w-full overflow-hidden">
          <TableReview review={review} />
        </AnimatedContent>
      </div>
    </PageContainer>
  );
};

export default Page;
