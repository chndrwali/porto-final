'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Building2, GraduationCap, LucideIcon } from 'lucide-react';
import { Career, CareerType } from '@prisma/client';

interface Props {
  career: Career[];
}

const careerIcons: Record<CareerType, LucideIcon> = {
  STUDY: BookOpen,
  WORK: Building2,
  GRADUATE: GraduationCap,
};

export const CareerSection = ({ career }: Props) => {
  const sortedCareers = [...career].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const currentRole = sortedCareers[0]; // Role terbaru
  const previousRoles = sortedCareers.slice(1);
  return (
    <div className="text-white z-[5000] p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className=" text-white rounded-lg border border-gray-800 p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Experience</h2>

        {/* Current Role */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="flex items-start gap-4">
            {currentRole.careerType && (
              <div className="mt-1">
                {(() => {
                  const Icon = careerIcons[currentRole.careerType];
                  return <Icon className="size-5 text-gray-400" />;
                })()}
              </div>
            )}
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
            <AccordionTrigger className="hover:no-underline py-4 text-gray-400">Show previous roles</AccordionTrigger>
            <AccordionContent>
              <AnimatePresence>
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 pt-2">
                  {previousRoles.map((role, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-start gap-4">
                      {role.careerType && (
                        <div className="mt-1">
                          {(() => {
                            const Icon = careerIcons[role.careerType];
                            return <Icon className="size-5 text-gray-400" />;
                          })()}
                        </div>
                      )}
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
