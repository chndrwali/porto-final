'use client';

import { motion } from 'framer-motion';
import { HoverEffect } from '@/components/ui/card-hover';
import { ProjectWithTech } from '@/types';
import { useEffect, useState } from 'react';
import { ProjectCategory } from '@prisma/client';

interface Props {
  project: ProjectWithTech[];
}

const ProjectSection = ({ project }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Debounce selama 300ms

    return () => {
      clearTimeout(handler); // Bersihkan timeout jika searchTerm berubah sebelum 300ms
    };
  }, [searchTerm]);

  const categories = Array.from(new Set(project.map((item) => item.category)));

  const filterProjects = () => {
    const filteredByCategory = selectedCategory ? project.filter((item) => item.category === selectedCategory) : project;

    return filteredByCategory.filter((item) => item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
  };

  // Handle klik pada tombol kategori
  const handleCategoryClick = (category: ProjectCategory | null) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProjects = filterProjects();

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl mb-4">
        Projects
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 mb-8">
        Explore my portfolio of projects built from scratch
      </motion.div>
      <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
        <div className="flex gap-2">
          {/* Tombol untuk menampilkan semua proyek */}
          <button className={`px-4 py-2 rounded-md ${selectedCategory === null ? 'bg-purple text-black' : 'bg-gray-700'} transition-colors`} onClick={() => handleCategoryClick(null)}>
            All
          </button>
          {/* Tombol untuk menampilkan kategori-kategori proyek */}
          {categories.map((category) => (
            <button key={category} className={`px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-purple text-black' : 'bg-gray-700'} transition-colors`} onClick={() => handleCategoryClick(category)}>
              {category}
            </button>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-md w-full md:w-72 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-purple"
          />
        </div>
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
