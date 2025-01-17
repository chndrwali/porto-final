import config from '@/lib/config';
import { cn } from '@/lib/utils';
import { ProjectWithTech } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { IKImage } from 'imagekitio-next';
import { Link2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';

interface Props {
  project: ProjectWithTech[];
  className?: string;
}

export const HoverEffect = ({ project, className }: Props) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10', className)}>
      {project.map((item, idx) => (
        <div key={item?.id} className="relative group  block p-2 h-full w-full" onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-emerald-500 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card isHovered={hoveredIndex === idx} link={item.id} className="border border-gray-800">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <IKImage path={item.imageOne} urlEndpoint={config.env.imageKit.urlEndpoint} alt={item.title} width={400} height={300} className="object-cover w-full h-full" loading="lazy" lqip={{ active: true }} />
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.a href={`/project/${item.id}`} className="absolute inset-0 flex items-center justify-center bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="rounded-full bg-white p-3">
                      <Link2 className="h-6 w-6 text-black" />
                    </motion.div>
                  </motion.a>
                )}
              </AnimatePresence>
            </div>
            <div className="p-4">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="h-[10vh]">{item.description}</CardDescription>
              <div className="bg-zinc-800 w-fit p-1 px-2 rounded-md">
                <span className="text-neutral-100 text-xs">{item.category}</span>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

const Card = ({ className, children, isHovered, link }: { className?: string; children: React.ReactNode; isHovered: boolean; link: string }) => {
  return (
    <div className={cn('rounded-2xl h-full w-full overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20', className)}>
      <div className="relative z-50">
        <div>{children}</div>
        <AnimatePresence>
          {isHovered && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="absolute bottom-4 right-4">
              <Button asChild variant="secondary" className="rounded-full px-4 py-2 text-sm font-medium">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <h4 className={cn('text-zinc-100 font-bold  text-xl tracking-wide', className)}>{children}</h4>;
};
const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <p className={cn('mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm', className)}>{children}</p>;
};
