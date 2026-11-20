import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

export type Project = {
  title: string;
  description: string;
  image?: string;
  // The colour at the image's edges, filling the rest of the tile so the whole image shows without visible bands.
  tint: string;
  href: string;
  stack: string[];
  badge?: string;
};

// How far, in pixels, each layer starts below where it settles. The card travels furthest, its words less and its
// picture least, so the three drift in at different speeds as a row scrolls into view.
const CARD_RISE = 140;
const WORDS_RISE = 70;
const IMAGE_RISE = 36;
const HEADING_RISE = 80;

function ProjectTile({
  project,
  imageY,
  wordsY,
}: {
  project: Project;
  imageY?: MotionValue<number>;
  wordsY?: MotionValue<number>;
}) {
  return (
    <Link href={project.href} target="_blank" passHref className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-background/50 backdrop-blur transition duration-200 ease-out hover:scale-[0.99] hover:border-white/20 active:scale-[0.975]">
        <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: project.tint }}>
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                className="object-contain"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-4 text-center">
                <span className="clash-grotesk text-3xl italic tracking-tight text-white">{project.title}</span>
                {project.badge && (
                  <span className="text-gradient clash-grotesk text-xs font-semibold tracking-tighter">{project.badge}</span>
                )}
              </div>
            )}
          </motion.div>
        </div>
        <motion.div className="flex flex-1 flex-col p-4" style={{ y: wordsY }}>
          <h3 className="text-base font-semibold">{project.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-400">{project.description}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-full border border-[#141521] bg-[#0A0A13] px-2.5 py-0.5 text-[11px] text-gray-300">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </Link>
  );
}

// Rises a tile into place as its row scrolls into view, the picture and words trailing the card. The motion follows
// the scroll itself, so tiles in one row move together and scrolling back up sinks them again.
function ParallaxTile({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.6"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [CARD_RISE, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [IMAGE_RISE, 0]);
  const wordsY = useTransform(scrollYProgress, [0, 1], [WORDS_RISE, 0]);
  return (
    <div ref={ref} className="h-full">
      <motion.div className="h-full" style={{ y: cardY, opacity }}>
        <ProjectTile project={project} imageY={imageY} wordsY={wordsY} />
      </motion.div>
    </div>
  );
}

function ParallaxHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.7"] });
  const y = useTransform(scrollYProgress, [0, 1], [HEADING_RISE, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  return (
    <div ref={ref}>
      <motion.div style={{ y, opacity }}>{children}</motion.div>
    </div>
  );
}

// The project tiles. Each row rises into view with the scroll, and visitors who turn motion off get a still grid.
export default function ProjectShowcase({ projects, children }: { projects: Project[]; children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <>
      {reduceMotion ? children : <ParallaxHeading>{children}</ParallaxHeading>}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) =>
          reduceMotion ? (
            <ProjectTile key={project.title} project={project} />
          ) : (
            <ParallaxTile key={project.title} project={project} />
          ),
        )}
      </div>
    </>
  );
}
