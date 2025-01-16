'use client';

import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSection = ({ children, className }: AnimatedSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section initial="hidden" animate="visible" variants={containerVariants} className={className}>
      {children}
    </motion.section>
  );
};
