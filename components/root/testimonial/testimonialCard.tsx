import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { Review } from '@prisma/client';
import { motion } from 'framer-motion';
import { BadgeCheck, Star } from 'lucide-react';
interface Props {
  review: Review;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const TestimonialCard = ({ review }: Props) => {
  return (
    <motion.div
      variants={item}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800"
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12 ">
          <AvatarFallback className="bg-amber-100 text-black">{getInitials(review.reviewer)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold">{review.reviewer}</span>

            <BadgeCheck className="h-4 w-4 text-blue-400" />
          </div>
          {review.email && <div className="text-zinc-500 text-sm">{review.email}</div>}
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className={`h-4 w-4 ${index < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 text-zinc-300 leading-relaxed">{review.comment}</div>
    </motion.div>
  );
};

export default TestimonialCard;
