'use client';

import { useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, TechStackProject } from '@prisma/client';
import { IKImage } from 'imagekitio-next';
import config from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProjectWithTechStack extends Project {
  techStack: TechStackProject[];
}

interface ProjectProps {
  project: ProjectWithTechStack;
}

const DetailProject = ({ project }: ProjectProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const waUrl = `https://wa.me/628652648201?text=${encodeURIComponent("I'm interested in this repository *" + project.title + '*')}`;

  // Filter out null/undefined images and create array of valid images
  const images = [project.imageOne, project.imageTwo, project.imageThree, project.imageFour, project.imageFive].filter(Boolean) as string[];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleContact = () => {
    setDialogOpen(true);
  };

  return (
    <section className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span key={tech.id} className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {tech.name}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              href={project?.web}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </a>
            {project.isPublicRepo === true ? (
              <a
                href={project.repository ?? ''}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                <Github className="h-4 w-4" />
                View Source
              </a>
            ) : (
              <button
                onClick={handleContact}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                <Github className="h-4 w-4" />
                Request Access
              </button>
            )}
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative aspect-video mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden group">
          <IKImage path={images[currentImageIndex]} urlEndpoint={config.env.imageKit.urlEndpoint} alt={project.title} fill className="object-contain" loading="lazy" lqip={{ active: true }} />

          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${currentImageIndex === index ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Project Description */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Project</h2>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            {project.description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Project Metadata */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">{project?.category}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {new Date(project.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Repository Access</DialogTitle>
            <DialogDescription>This repository is private. Please contact us via WhatsApp to request access.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                window.open(waUrl, '_blank');
                setDialogOpen(false);
              }}
            >
              Open WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DetailProject;
