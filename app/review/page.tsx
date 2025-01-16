import FormReview from '@/components/review/formReview';
import { ReviewSection } from '@/components/review/reviewSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Review Form',
};

const Page = () => {
  return (
    <ReviewSection>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Leave a Review</h2>
        <p className="text-muted-foreground">Share your experience with us</p>
      </div>
      <FormReview />
    </ReviewSection>
  );
};

export default Page;
