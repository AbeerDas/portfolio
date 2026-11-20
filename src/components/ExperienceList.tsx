import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
      className="inline-flex items-center gap-0.5 text-[#c4b5fd] transition-colors hover:text-white"
    >
      {children}
      <ArrowUpRight aria-hidden className="h-[0.8em] w-[0.8em] shrink-0" />
    </a>
  );
}

// The work history as a plain list, newest first, with one line on what was built at each place.
export default function ExperienceList({ experiences }: { experiences: Experience[] }) {
  return (
    <ul className="border-t border-white/10">
      {experiences.map((experience, i) => (
        <motion.li
          key={`${experience.company}-${experience.date}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-x-10 gap-y-3 border-b border-white/10 py-7 md:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1.6fr)] md:items-center"
        >
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{experience.date}</p>
          <div className="flex items-center gap-4">
            <span className="relative h-10 w-10 shrink-0">
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                fill
                sizes="40px"
                className={cn(experience.framed ? "rounded-xl object-cover ring-1 ring-white/10" : "object-contain")}
              />
            </span>
            <div className="min-w-0">
              <p className="text-lg font-medium tracking-tight">
                <OutboundLink href={experience.href}>{experience.company}</OutboundLink>
              </p>
              <p className="text-sm text-muted-foreground">{experience.title}</p>
            </div>
          </div>
          <p className="text-base leading-relaxed text-foreground/80">{experience.summary}</p>
        </motion.li>
      ))}
    </ul>
  );
}
