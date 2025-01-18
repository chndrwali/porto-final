'use client';

import { Review } from '@prisma/client';
import { motion } from 'framer-motion';
import TestimonialCard from './testimonialCard';
import { AvgRating } from './avgRating';

interface Props {
  review: Review[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const TestimonialSection = ({ review }: Props) => {
  return (
    <div className="text-white font-mono p-4 md:p-8">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl mb-4">
        Testimonial
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-8">
        What clients and collaborators say about my work.
      </motion.div>
      <div className="space-y-4">
        <AvgRating review={review} />

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {review.length > 0 ? (
            review.map((item) => <TestimonialCard key={item.id} review={item} />)
          ) : (
            <div className=" w-full text-center py-8 rounded-md">
              <p className="text-xl text-gray-400">No data available</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialSection;
