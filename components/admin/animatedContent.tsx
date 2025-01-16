'use client';

import { motion } from 'framer-motion';

interface AnimatedContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedContent = ({ children, className }: AnimatedContentProps) => {
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

  return (
    <motion.div variants={contentVariants} initial="hidden" animate="visible" className={className}>
      {children}
    </motion.div>
  );
};
