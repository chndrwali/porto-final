'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { IoStarSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const StarRating = ({ field, maxStars = 5 }: { field: any; maxStars?: number }) => {
  // State to track the star being hovered
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {Array(maxStars)
        .fill(null)
        .map((_, idx) => {
          const currentValue = idx + 1;
          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => field.onChange(currentValue)}
              onMouseEnter={() => setHoveredStar(currentValue)}
              onMouseLeave={() => setHoveredStar(null)}
              className="focus:outline-none"
            >
              <Star className={`h-8 w-8 ${currentValue <= (hoveredStar || field.value) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors`} />
            </motion.button>
          );
        })}
    </div>
  );
};
