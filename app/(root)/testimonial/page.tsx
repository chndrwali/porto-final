import { getReview } from '@/actions/getReview';
import TestimonialSection from '@/components/root/testimonial/testimonialSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonial',
};

const Page = async () => {
  const review = await getReview();
  return (
    <>
      <TestimonialSection review={review} />
    </>
  );
};

export default Page;
