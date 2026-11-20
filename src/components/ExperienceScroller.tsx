import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import Glow from "@/components/Glow";
import { cn } from "@/lib/utils";

export type Experience = {
  date: string;
  title: string;
  company: string;
  href: string;
  logo: string;
  // Logos that are a full-bleed square read best inside a rounded frame, while marks with their own shape stand alone.
  framed?: boolean;
  summary: React.ReactNode;
};

// Opens a company's site in a new tab, with an arrow so it reads as leaving the page.
export function OutboundLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-secondary transition-colors hover:text-white"
    >
      {children}
      <ArrowUpRight aria-hidden className="ml-0.5 inline-block h-[0.8em] w-[0.8em] align-baseline" />
    </a>
  );
}

// How far the page scrolls for each role while the screen is held, as a share of the screen's height.
const SCROLL_PER_ROLE = 0.55;

const pad = (n: number) => String(n).padStart(2, "0");

// Holds the screen still while scrolling through the work history, bringing in one role at a time.
// Scrolling back up steps back through them in reverse, and the page moves on after the last one.
export default function ExperienceScroller({
  experiences,
  children,
}: {
  experiences: Experience[];
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ index: 0, direction: 1 });
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  // How far through the current role the scroll is, filling the line once per role.
  const roleProgress = useTransform(scrollYProgress, (progress) => {
    const scaled = progress * experiences.length;
    return Math.min(1, Math.max(0, scaled - Math.min(experiences.length - 1, Math.floor(scaled))));
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(experiences.length - 1, Math.max(0, Math.floor(progress * experiences.length)));
    setView((current) => (next === current.index ? current : { index: next, direction: next > current.index ? 1 : -1 }));
  });

  const scrollToRole = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const travel = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((index + 0.5) / experiences.length) * travel, behavior: "smooth" });
  };

  const current = experiences[view.index];

  return (
    <div ref={trackRef} className="relative" style={{ height: `${100 + experiences.length * SCROLL_PER_ROLE * 100}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center">
        <Glow className="-right-72 top-[12%]" />
        <Glow className="-left-96 bottom-[6%]" />
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
          <div>
            {children}
            <ol className="mt-10 hidden space-y-2.5 md:block">
              {experiences.map((experience, i) => (
                <li key={`${experience.company}-${experience.date}`}>
                  <button
                    type="button"
                    onClick={() => scrollToRole(i)}
                    aria-current={i === view.index ? "step" : undefined}
                    className={cn(
                      "flex items-baseline gap-3 text-left transition-colors duration-300",
                      i === view.index ? "text-foreground" : "text-muted-foreground/45 hover:text-muted-foreground",
                    )}
                  >
                    <span className="font-mono text-xs tabular-nums">{pad(i + 1)}</span>
                    <span className={cn("text-base", i === view.index && "font-medium")}>{experience.company}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <div className="relative min-h-[17rem] md:min-h-[20rem]">
              <AnimatePresence mode="popLayout" initial={false} custom={view.direction}>
                {current && (
                  <motion.article
                    key={view.index}
                    custom={view.direction}
                    variants={{
                      enter: (direction: number) => ({ opacity: 0, y: direction * 48 }),
                      shown: { opacity: 1, y: 0 },
                      leave: (direction: number) => ({ opacity: 0, y: direction * -48 }),
                    }}
                    initial="enter"
                    animate="shown"
                    exit="leave"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="relative h-14 w-14 shrink-0">
                        <Image
                          src={current.logo}
                          alt={`${current.company} logo`}
                          fill
                          sizes="56px"
                          className={current.framed ? "rounded-xl object-cover ring-1 ring-white/10" : "object-contain"}
                        />
                      </span>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{current.date}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{current.title}</p>
                      </div>
                    </div>
                    <h3 className="clash-grotesk mt-6 text-4xl tracking-tight md:text-6xl">
                      <a href={current.href} target="_blank" rel="noopener noreferrer" className="group">
                        <span className="text-gradient">{current.company}</span>
                        <ArrowUpRight
                          aria-hidden
                          className="ml-1 inline-block h-[0.6em] w-[0.6em] align-baseline text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </h3>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl">{current.summary}</p>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {pad(view.index + 1)} / {pad(experiences.length)}
              </span>
              <div className="h-px flex-1 bg-white/10">
                <motion.div className="h-full origin-left bg-gradient-to-r from-primary to-secondary" style={{ scaleX: roleProgress }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
