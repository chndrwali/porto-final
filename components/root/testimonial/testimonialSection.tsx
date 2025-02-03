'use client';

import { Review } from '@prisma/client';
import { motion } from 'framer-motion';
import { AvgRating } from './avgRating';
import { InfiniteMovingCards } from '@/components/ui/infinite-card';
import GradientText from '@/components/gradientText';

interface Props {
  review: Review[];
}

const TestimonialSection = ({ review }: Props) => {
  return (
    <div className="text-white p-4 md:p-8">
      <GradientText colors={['#CBACF9', '#4079ff', '#CBACF9', '#4079ff', '#CBACF9']} animationSpeed={3} showBorder={false}>
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-bold text-4xl md:text-5xl mb-4">
          Testimonial
        </motion.span>
      </GradientText>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-8">
        What clients and collaborators say <span className="text-purple">about my work.</span>
      </motion.div>
      <div className="space-y-4">
        <AvgRating review={review} />
        <div className=' className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"'>
          <InfiniteMovingCards items={review} direction="right" speed="normal" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
