'use client';

import { motion } from 'framer-motion';

export const ReviewSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto space-y-6 p-6 bg-white rounded-xl shadow-lg">
      {children}
    </motion.div>
  );
};
