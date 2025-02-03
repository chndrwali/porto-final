'use client';

import { motion } from 'framer-motion';
import { HoverEffect } from '@/components/ui/card-hover';
import { ProjectWithTech } from '@/types';
import { useState } from 'react';
import { ProjectCategory } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SearchButton from './searchButton';
import GradientText from '../gradientText';

interface Props {
  project: ProjectWithTech[];
}

const ProjectSection = ({ project }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);

  const categories = Array.from(new Set(project.map((item) => item.category)));

  const filterProjects = () => {
    return selectedCategory ? project.filter((item) => item.category === selectedCategory) : project;
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === 'all' ? null : (value as ProjectCategory));
  };

  const filteredProjects = filterProjects();

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <GradientText colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']} animationSpeed={3} showBorder={false} className="text-4xl text-left mb-4">
        Projects
      </GradientText>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl mb-4"></motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-8">
        Explore my portfolio of projects built from scratch
      </motion.div>
      <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
        <Select onValueChange={handleCategoryChange} defaultValue="all">
          <SelectTrigger className="w-fit bg-gray-700 border-gray-600">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <SearchButton />
      </div>

      {filteredProjects.length > 0 ? (
        <HoverEffect project={filteredProjects} />
      ) : (
        <div className="w-full text-center py-8 rounded-md">
          <p className="text-xl text-gray-400">No data available</p>
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
