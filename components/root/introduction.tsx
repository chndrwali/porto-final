'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Music, Tv, MapPin, Film, Laptop, UtensilsCrossed } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';

export const Introduction = () => {
  const [yearsExperience, setYearsExperience] = useState(0);

  useEffect(() => {
    const startYear = 2023;
    const currentYear = new Date().getFullYear();
    setYearsExperience(currentYear - startYear);
  }, []);

  return (
    <div className="min-h-screen text-white font-mono p-4 md:p-8">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl mb-8">
        About
      </motion.h1>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 mb-8">
        Meet Candra, a skilled Front-end Developer.
      </motion.div>

      <Card className="bg-zinc-900/50 text-white border border-gray-800 rounded-lg p-6 md:p-8">
        <div className="flex flex-1 flex-col md:flex-row  gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Image src="/images/candra.png" alt="Candra" width={400} height={500} className="object-contain" priority />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-6">
            <div>
              <div className="text-green-500 mb-4">INTRODUCTION</div>
              <h2 className="text-2xl md:text-3xl mb-4">Front-end Developer passionate about tech and personal projects</h2>
              <p className="text-gray-400 leading-relaxed">
                With around {yearsExperience} years of experience in front-end development, I currently work as a web freelancer. I enjoy creating dynamic user experiences and have experience with a range of technologies including React,
                Next.js, and Tailwind CSS.
              </p>
              <p className="text-gray-400 mt-4 leading-relaxed">Additionally, I enjoy helping others improve their skills by creating tutorials and sharing insights on social media.</p>
            </div>
            <Separator className="bg-gray-800" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-6">
                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-500">Music</div>
                    <div>Pop Punk</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Tv className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-500">TV Show</div>
                    <div>Comedy, Horror, Action</div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-500">City</div>
                    <div>Bandung, ID</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <UtensilsCrossed className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-500">Food</div>
                    <div>Rendang</div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-6">
                <div className="flex items-center gap-3">
                  <Film className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-500">Movie</div>
                    <div>The Raid 2</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Laptop className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-500">System</div>
                    <div>Windows</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Card>
    </div>
  );
};
