import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

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

// Extra scrolling, in screen heights, while the screen holds still and the tiles come in.
const HOLD_SCREENS = 1.6;
// Room left for the navigation bar and some breathing space when the held screen is shrunk to fit.
const SCREEN_MARGIN = 120;

function ProjectTile({ project }: { project: Project }) {
  return (
    <Link href={project.href} target="_blank" passHref className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-background/50 backdrop-blur transition duration-200 ease-out hover:scale-[0.99] hover:border-white/20 active:scale-[0.975]">
        <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: project.tint }}>
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
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-semibold">{project.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-400">{project.description}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-full border border-[#141521] bg-[#0A0A13] px-2.5 py-0.5 text-[11px] text-gray-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

// One tile tipping up into place, timed by how far the held screen has been scrolled, so scrolling back up reverses it.
function ArrivingTile({ project, index, progress }: { project: Project; index: number; progress: MotionValue<number> }) {
  const start = 0.04 + index * 0.085;
  const arrival = useTransform(progress, [start, start + 0.22], [0, 1]);
  const y = useTransform(arrival, [0, 1], [90, 0]);
  const rotateX = useTransform(arrival, [0, 1], [28, 0]);
  const scale = useTransform(arrival, [0, 1], [0.9, 1]);
  return (
    <motion.div className="h-full" style={{ opacity: arrival, y, rotateX, scale, transformOrigin: "50% 100%" }}>
      <ProjectTile project={project} />
    </motion.div>
  );
}

function useWideScreen() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return wide;
}

// Holds the screen while scrolling deals the eight tiles in, shrinking the whole grid when the window is too short
// to show both rows at once.
function HeldGrid({ projects, children }: { projects: Project[]; children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.65", "end end"] });

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const measure = () => setFit(Math.min(1, (window.innerHeight - SCREEN_MARGIN) / content.offsetHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={trackRef} className="relative" style={{ height: `${100 + HOLD_SCREENS * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div ref={contentRef} className="w-full" style={{ transform: `scale(${fit})` }}>
          {children}
          <div className="mt-10 grid grid-cols-4 gap-4 [perspective:1400px]">
            {projects.map((project, i) => (
              <ArrivingTile key={project.title} project={project} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// The project tiles. On wide screens the page holds still while they come in one by one, and on phones, or for
// visitors who turn motion off, they simply fade in as a normal grid.
export default function ProjectShowcase({ projects, children }: { projects: Project[]; children: React.ReactNode }) {
  const wide = useWideScreen();
  const reduceMotion = useReducedMotion();

  if (wide && !reduceMotion) return <HeldGrid projects={projects}>{children}</HeldGrid>;

  return (
    <>
      <Reveal>{children}</Reveal>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 4) * 0.06} className="h-full">
            <ProjectTile project={project} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
