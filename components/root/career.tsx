'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Building2 } from 'lucide-react';

interface Role {
  title: string;
  company: string;
  type: string;
  period: string;
}

const currentRole: Role = {
  title: 'Front-end Developer',
  company: 'Actio Software',
  type: 'Remote',
  period: 'November 2023 - Present',
};

const previousRoles: Role[] = [
  {
    title: 'Frontend Developer',
    company: 'Tech Corp',
    type: 'Hybrid',
    period: 'January 2023 - October 2023',
  },
  {
    title: 'Junior Developer',
    company: 'Start Up Inc',
    type: 'On-site',
    period: 'March 2022 - December 2022',
  },
];

export const CareerSection = () => {
  return (
    <div className="text-white font-mono p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-zinc-900/50 text-white rounded-lg border border-gray-800 p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Career</h2>

        {/* Current Role */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="flex items-start gap-4">
            <Building2 className="mt-1 size-5 text-gray-400" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{currentRole.title}</h3>
              <div className="text-gray-400 space-y-1">
                <p>
                  {currentRole.company} · {currentRole.type}
                </p>
                <p>{currentRole.period}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Previous Roles Accordion */}
        <Accordion type="single" collapsible className="border-t border-gray-800">
          <AccordionItem value="previous-roles" className="border-b-0">
            <AccordionTrigger className="hover:no-underline w-fit py-4 text-gray-400">Show previous roles</AccordionTrigger>
            <AccordionContent>
              <AnimatePresence>
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 pt-2">
                  {previousRoles.map((role, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-start gap-4">
                      <Building2 className="mt-1 size-5 text-gray-400" />
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold">{role.title}</h3>
                        <div className="text-gray-400 space-y-1">
                          <p>
                            {role.company} · {role.type}
                          </p>
                          <p>{role.period}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </div>
  );
};
