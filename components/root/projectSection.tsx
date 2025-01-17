'use client';

import { motion } from 'framer-motion';
import { HoverEffect } from '@/components/ui/card-hover';
import { ProjectWithTech } from '@/types';
import { useState } from 'react';
import { ProjectCategory } from '@prisma/client';

interface Props {
  project: ProjectWithTech[];
}

const ProjectSection = ({ project }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);

  const categories = Array.from(new Set(project.map((item) => item.category))); // Ambil kategori unik
  const filteredProjects = selectedCategory ? project.filter((item) => item.category === selectedCategory) : project;

  return (
    <div className="min-h-screen text-white font-mono p-4 md:p-8">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl mb-4">
        Projects
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-8">
        Explore my portfolio of projects build from scratch
      </motion.div>
      <div className="flex gap-2 mb-8">
        <button className={`px-4 py-2 rounded-md ${selectedCategory === null ? 'bg-emerald-500' : 'bg-gray-700'}`} onClick={() => setSelectedCategory(null)}>
          All
        </button>
        {categories.map((category) => (
          <button key={category} className={`px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-emerald-500' : 'bg-gray-700'}`} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      <HoverEffect project={filteredProjects} />
    </div>
  );
};

export default ProjectSection;
