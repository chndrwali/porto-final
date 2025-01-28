'use client';

import { calculateAverageRating } from '@/lib/utils';
import { Review } from '@prisma/client';
import { MessageSquare, Star } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
  review: Review[];
}

export const AvgRating = ({ review }: Props) => {
  const statistics = useMemo(() => {
    const averageRating = calculateAverageRating(review);
    const totalReviews = review.length;
    const ratingCounts = review.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      averageRating,
      totalReviews,
      ratingCounts,
    };
  }, [review]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border border-gray-800  p-4 text-white shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Average Rating</h3>
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">{statistics.averageRating}</p>
          <p className="text-xs text-muted-foreground">out of 5</p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-800  p-4 text-white shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total Reviews</h3>
          <MessageSquare className="size-4" />
        </div>
        <p className="text-2xl font-bold">{statistics.totalReviews}</p>
      </div>

      {/* Rating Distribution */}
      <div className="rounded-lg border border-gray-800  p-4 text-white shadow-sm md:col-span-2">
        <h3 className="text-sm font-medium pb-2">Rating Distribution</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <div className="flex w-12 items-center gap-1">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{rating}</span>
              </div>
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-300"
                  style={{
                    width: `${((statistics.ratingCounts[rating] || 0) / statistics.totalReviews) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">{statistics.ratingCounts[rating] || 0}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
