'use client';

import { motion } from 'framer-motion';
import FormEmail from './formEmail';
import GradientText from '@/components/gradientText';

const ContactSection = () => {
  return (
    <div className="min-h-screen text-white font-mono p-4 md:p-8">
      <GradientText colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']} animationSpeed={3} showBorder={false}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl mb-4">
          Get in Touch
        </motion.h1>
      </GradientText>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-8">
        Have a question or want to work together? Feel free to reach out.
      </motion.div>

      <FormEmail />
    </div>
  );
};

export default ContactSection;
