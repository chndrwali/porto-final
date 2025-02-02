'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

const contentVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: 0.3,
    },
  },
};

export default function PageContainer({ children, scrollable = true }: { children: React.ReactNode; scrollable?: boolean }) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <motion.div variants={contentVariants} initial="hidden" animate="visible" className="flex flex-1 p-4 md:px-6">
            {children}
          </motion.div>
        </ScrollArea>
      ) : (
        <motion.div variants={contentVariants} initial="hidden" animate="visible" className="flex flex-1 p-4 md:px-6">
          {children}
        </motion.div>
      )}
    </>
  );
}
