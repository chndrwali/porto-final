'use client';

import { TechStack } from '@prisma/client';
import { motion } from 'framer-motion';
import TechCard from './techCard';

interface Props {
  techStack: TechStack[];
}

const TechStackSection = ({ techStack }: Props) => {
  return (
    <div className=" text-white font-mono p-4 md:p-8">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl mb-4">
        Tech Stack
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-8">
        Tools and technologies that power my projects.
      </motion.div>

      <div className="flex flex-wrap justify-start gap-x-4 gap-y-5  md:gap-6 lg:gap-10">
        {techStack.map((tech) => (
          <TechCard key={tech.id} tech={tech} />
        ))}
      </div>
    </div>
  );
};

export default TechStackSection;
