'use client';

import { TechStack } from '@prisma/client';
import { motion } from 'framer-motion';
import TechCard from './techCard';
import TrueFocus from '@/components/trueFocus';

interface Props {
  techStack: TechStack[];
}

const TechStackSection = ({ techStack }: Props) => {
  return (
    <div className=" text-white font-mono p-4 md:p-8">
      <TrueFocus sentence="Tech Stack" manualMode={false} blurAmount={5} borderColor="purple" animationDuration={1} pauseBetweenAnimations={1} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-8">
        Tools and technologies that <span className="text-purple">power my projects.</span>
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
