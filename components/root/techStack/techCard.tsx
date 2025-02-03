import config from '@/lib/config';
import { TechStack } from '@prisma/client';
import { IKImage } from 'imagekitio-next';

interface Props {
  tech: TechStack;
}

const TechCard = ({ tech }: Props) => {
  return (
    <div className="w-[calc(100%/2-1rem)] sm:w-[calc(100%/3-1rem)] md:w-[calc(100%/4-1.5rem)] lg:w-[calc(100%/5-2.5rem)]">
      <div className="flex flex-wrap justify-center text-center group">
        <div className="px-8 py-3 border-[1.5px] rounded-md border-purple bg-purple mb-2 shadow-lg">
          <IKImage
            path={tech.image}
            urlEndpoint={config.env.imageKit.urlEndpoint}
            alt={`Logo ${tech.title}`}
            width={96}
            height={96}
            className="w-24 h-24 object-scale-down aspect-square image-animation"
            loading="lazy"
            lqip={{ active: true }}
          />
        </div>
        <h3 className="w-full text-sm font-bold md:text-base">
          <span title={` ${tech.title}`} aria-label={`${tech.title}`} className="uppercase hover:text-purple hover:underline hover:decoration-2 hover:decoration-purple transition-all duration-200 ease-in-out">
            {tech.title}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default TechCard;
