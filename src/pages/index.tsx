import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
// import { SpeedInsights } from "@vercel/speed-insights/next"


import Modal from '../components/modal';
import AdminModal from '../components/AdminModal';


import {
  ArrowUpRight,
  ChevronRight,
  Github,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { updateResumeUrl, loadResumeUrl } from "@/lib/utils";
import Image from "next/image";
import PhotoWall, { type Photo } from "@/components/PhotoWall";
import ExperienceList, { OutboundLink, type Experience } from "@/components/ExperienceList";
import Reveal from "@/components/Reveal";
import SkylineHologram from "@/components/SkylineHologram";

import uwmapsImage from '@/images/uwmaps.png';
import spellbookLongLogo from '@/images/spellbook/SpellbookLongLogo.svg';



const projects: Array<{
  title: string;
  description: string;
  image?: string;
  // The colour at the image's edges, filling the rest of the tile so the whole image shows without visible bands.
  tint: string;
  href: string;
  stack: string[];
  badge?: string;
}> = [
  {
    title: "Rosetta",
    badge: "3rd Place · HackHive",
    description: "Live lecture translation that cites students' own notes as the professor speaks.",
    image: "/assets/rosetta.jpg",
    tint: "#038382",
    href: "https://devpost.com/software/rosetta-hq6aby",
    stack: ["TypeScript", "RAG", "OpenRouter", "ElevenLabs"],
  },
  {
    title: "Go-Phish",
    description: "Browser extension that flags phishing emails with 96% accuracy, gamified with fish to collect.",
    tint: "#13171A",
    href: "https://devpost.com/software/go-phish-e7qzo3",
    stack: ["TypeScript", "Django", "Scikit-Learn", "Groq"],
  },
  {
    title: "ScoutFox",
    description: "Chrome extension with 261 installs that puts YouTube reviews on Amazon listings.",
    image: "/assets/scoutfox.jpg",
    tint: "#fe6b35",
    href: "https://github.com/AbeerDas/ScoutFox",
    stack: ["TypeScript", "MV3", "React", "Vercel", "LLMs"],
  },
  {
    title: "Estia",
    description: "A library of 100+ coding projects with AI-generated project ideas.",
    image: "/assets/estia.png",
    tint: "#0e1011",
    href: "https://estiafrontend.vercel.app/",
    stack: ["React", "Node.js", "PostgreSQL", "Groq", "Vercel"],
  },
  {
    title: "Statsanity",
    description: "Predicts NBA games and the MVP with a linear regression model.",
    image: "/assets/statsanity.png",
    tint: "linear-gradient(#1d1300, #0e0e0e)",
    href: "https://github.com/achow111/Statsanity",
    stack: ["React", "Tensorflow", "Python (BeautifulSoup)", "Flask"],
  },
  {
    title: "OnePass",
    description: "Password manager that generates, checks and stores strong passwords.",
    image: "/assets/onepassv2.png",
    tint: "#070707",
    href: "#",
    stack: ["Next.js", "Firebase", "Node.js"],
  },
  {
    title: "StockAI",
    description: "LSTM model that predicts next-day stock prices from candlestick data.",
    image: "/assets/stockai.png",
    tint: "#0e1117",
    href: "https://github.com/AbeerDas/StockMarketPrediction",
    stack: ["Python", "Keras", "Pandas", "NumPy"],
  },
  {
    title: "Dungeon Map Generator",
    description: "Won WEC 2024 with tile-based dungeon maps and Dijkstra pathfinding.",
    image: "/assets/wecv4.png",
    tint: "#031e0f",
    href: "https://github.com/tawsifrm/WEC-2024",
    stack: ["Python", "Turtle Graphics"],
  },
];

const experiences: Experience[] = [
  {
    date: "Sept 2026 - Present",
    title: "AI Engineering Intern",
    company: "Theory Ventures",
    href: "https://theory.ventures",
    logo: "/assets/theory.png",
    framed: true,
    summary: (
      <>
        Built entity resolution for the firm&apos;s company records, merging duplicates across Postgres,{" "}
        <OutboundLink href="https://attio.com">Attio</OutboundLink> and{" "}
        <OutboundLink href="https://www.notion.com">Notion</OutboundLink> with long-horizon Python agents on{" "}
        <OutboundLink href="https://sailresearch.com">Sail</OutboundLink>.
      </>
    ),
  },
  {
    date: "Jan 2026 - May 2026",
    title: "Software Engineer Intern",
    company: "Spellbook",
    href: "https://www.spellbook.legal",
    logo: "/assets/spellbook.svg",
    summary: "Solo-shipped an AI agent that runs multi-step legal workflows, helping close a major enterprise contract.",
  },
  {
    date: "Sept 2025 - Dec 2025",
    title: "Software Developer",
    company: "Industry 4.0",
    href: "https://uwaterloo.ca/sedra-student-design-centre/catalogs/student-design-teams/industry-40",
    logo: "/assets/industry.png",
    framed: true,
    summary: "Led the rebuild of the case competition website with a team of executives, from design to launch.",
  },
  {
    date: "Apr 2025 - Aug 2025",
    title: "Software Engineer Intern",
    company: "BorderPass",
    href: "https://www.borderpass.ai",
    logo: "/assets/borderpass.png",
    framed: true,
    summary: "Cut time off Visitor Visa applications by auto-checking uploaded documents against government rules.",
  },
  {
    date: "Mar 2024 - Present",
    title: "Technical Software Lead",
    company: "UW Blueprint",
    href: "https://uwblueprint.org",
    logo: "/assets/blueprint.png",
    summary: (
      <>
        Leading a delivery platform for <OutboundLink href="https://beachmetro.com">Beach Metro</OutboundLink> that
        routes real Toronto addresses and splits bundles, saving volunteers hours every issue.
      </>
    ),
  },
  {
    date: "Sept 2024 - Dec 2024",
    title: "Backend Engineering Intern",
    company: "University of Toronto",
    href: "https://www.utoronto.ca",
    logo: "/assets/uoft.png",
    summary: "Split a monolithic student financial records API into independent services behind university single sign-on.",
  },
  {
    date: "Jan 2024 - Apr 2024",
    title: "UX Research Intern",
    company: "Questrade",
    href: "https://www.questrade.com",
    logo: "/assets/questrade.png",
    summary: "Ran usability tests, card sorts, A/B tests and interviews across Questrade's trading, auto insurance and mortgage products.",
  },
  {
    date: "Mar 2023 - Apr 2024",
    title: "Web Developer",
    company: "Bangladesh Canada Cultural Society",
    href: "https://hindumondir.org",
    logo: "/assets/bchm.png",
    framed: true,
    summary: "Redesigned the society's website into a modern, donor-friendly site with an email newsletter for community updates.",
  },
];

// Ordered so mountain shots alternate with city, people and event photos.
const photos: Photo[] = [
  { src: "/images/gallery/01-yosemite-railing.jpg", alt: "Abeer smiling at a railing in Yosemite", caption: "Yosemite" },
  { src: "/images/gallery/09-friends.jpg", alt: "Abeer with friends on a night out", caption: "Out with friends!" },
  { src: "/images/gallery/03-coast-deer.jpg", alt: "A deer on a hillside above the ocean at Point Reyes", caption: "Point Reyes" },
  { src: "/images/gallery/04-museum.jpg", alt: "Abeer at the National Museum of Anthropology in Mexico City", caption: "Anthropology Museum" },
  { src: "/images/gallery/06-hike-descent.jpg", alt: "Hikers heading down Mount Tam above the fog", caption: "Mount Tam" },
  { src: "/images/gallery/13-concert.jpg", alt: "The Weeknd in concert at a stadium lit with fire", caption: "The Weeknd" },
  { src: "/images/gallery/11-lake.jpg", alt: "Abeer by a lake in Banff, Alberta", caption: "Banff, Alberta" },
  { src: "/images/gallery/12-library.jpg", alt: "Abeer among the hanging shelves of Biblioteca Vasconcelos", caption: "Biblioteca Vasconcelos" },
  { src: "/images/gallery/05-yosemite-overlook.jpg", alt: "Abeer giving a thumbs up at a Yosemite overlook", caption: "Yosemite" },
  { src: "/images/gallery/10-parade.jpg", alt: "A crowd cheering at a WNBA championship parade", caption: "WNBA Parade" },
];

const featured: Array<{ href: string; kicker: string; title: string; blurb: string; visual: React.ReactNode }> = [
  {
    href: "/spellbook",
    kicker: "Software case",
    title: "Spellbook",
    blurb: "Owning an AI legal workflow agent from idea to enterprise launch.",
    visual: (
      <div style={{ backgroundColor: "#13171A" }} className="flex h-full w-full items-center justify-center">
        <Image alt="Spellbook" src={spellbookLongLogo as string} className="h-auto w-44" />
      </div>
    ),
  },
  {
    href: "/uwmaps",
    kicker: "Design case",
    title: "UW Maps",
    blurb: "Redesigning how students find their way around Waterloo's campus.",
    visual: <Image src={uwmapsImage} alt="UW Maps design case" fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover" />,
  },
  {
    href: "/sibyl",
    kicker: "Software case",
    title: "Sibyl",
    blurb: "Eight AI agents that check sustainability reports against real-world evidence. 1st place at Hack for Humanity.",
    // Its pale title card would outshine the darker cards beside it.
    visual: <Image src="/assets/sibyl.jpg" alt="Sibyl" fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover opacity-80" />,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  // const [expandAll, setExpandAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [pillClickCount, setPillClickCount] = useState(0);
  const [lastPillClickTime, setLastPillClickTime] = useState(0);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const spanRef = useRef<HTMLSpanElement>(null);

  {/* Function to handle mouse enter event */ }
  const handleMouseEnter = () => {
    setIsOverlayVisible(true);
  };

  {/* Function to handle mouse leave event */ }
  const handleMouseLeave = () => {
    setIsOverlayVisible(false);
  };

  // Function to handle pill clicks for admin access
  const handlePillClick = () => {
    const now = Date.now();
    const timeDiff = now - lastPillClickTime;
    
    // Reset count if more than 3 seconds have passed
    if (timeDiff > 3000) {
      setPillClickCount(1);
    } else {
      setPillClickCount(prev => prev + 1);
    }
    
    setLastPillClickTime(now);
    
    // Open admin modal after 3 clicks within 3 seconds
    if (pillClickCount >= 2) { // 0-indexed, so 2 means 3rd click
      setIsAdminModalOpen(true);
      setPillClickCount(0);
    }
  };

  // Function to handle resume URL update
  const handleResumeUpdate = async (newUrl: string, password: string) => {
    const result = await updateResumeUrl(newUrl, password);
    if (result.success) {
      // Force a re-render by updating a dummy state
      setPillClickCount(prev => prev + 1);
    }
    return result;
  };


  // Load resume URL from server on mount
  useEffect(() => {
    void loadResumeUrl();
  }, []);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link, .nav-sub-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        const href = li.getAttribute("href");
        if (href === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const handleToggleExpand = () => {
  //   setExpandAll((prevExpandAll) => !prevExpandAll);
  // }

  // useEffect(() => {
  //   const CollapsibleTimeline = class {
  //     el: Element | null;
  //     animation: Animation | undefined;

  //     constructor(el: string) {
  //       this.el = document.querySelector(el)!;
  //       this.init();
  //     }
  //     init() {
  //       this.el?.addEventListener("click", this.itemAction.bind(this) as EventListener);
  //     }
  //     animateItemAction(button: Element | null | undefined, ctrld: Element | null | undefined, contentHeight: number, shouldCollapse: boolean) {

  //       if (!button || !ctrld) return;

  //       const expandedClass = "timeline__item-body--expanded";
  //       const animOptions = {
  //         duration: 300,
  //         easing: "cubic-bezier(0.65,0,0.35,1)"
  //       };

  //       if (shouldCollapse) {
  //         button.ariaExpanded = "false";
  //         ctrld.ariaHidden = "true";
  //         ctrld.classList.remove(expandedClass);
  //         animOptions.duration *= 2;
  //         this.animation = ctrld.animate([
  //           { height: `${contentHeight}px` },
  //           { height: `${contentHeight}px` },
  //           { height: "0px" }
  //         ], animOptions);
  //       } else {
  //         button.ariaExpanded = "true";
  //         ctrld.ariaHidden = "false";
  //         ctrld.classList.add(expandedClass);
  //         this.animation = ctrld.animate([
  //           { height: "0px" },
  //           { height: `${contentHeight}px` }
  //         ], animOptions);
  //       }
  //     }
  //     itemAction(e: MouseEvent) {
  //       const { target } = e;
  //       const action = (target as HTMLElement)?.getAttribute("data-action");
  //       const item = (target as HTMLElement)?.getAttribute("data-item");

  //       if (action) {
  //         const targetExpanded = action === "expand" ? "false" : "true";
  //         const buttons = Array.from(this.el?.querySelectorAll(`[aria-expanded="${targetExpanded}"]`) ?? []);
  //         const wasExpanded = action === "collapse";

  //         for (const button of buttons) {
  //           const buttonID = button.getAttribute("data-item");
  //           const ctrld = this.el?.querySelector(`#item${buttonID}-ctrld`);
  //           const contentHeight = ctrld?.firstElementChild?.clientHeight ?? 0;

  //           this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
  //         }

  //       } else if (item) {
  //         const button = this.el?.querySelector(`[data-item="${item}"]`);
  //         const expanded = button?.getAttribute("aria-expanded");

  //         if (!expanded) return;

  //         const wasExpanded = expanded === "true";
  //         const ctrld = this.el?.querySelector(`#item${item}-ctrld`);
  //         const contentHeight = ctrld?.firstElementChild?.clientHeight ?? 0;

  //         this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
  //       }
  //     }
  //   };

  //   const ctl = new CollapsibleTimeline("#timeline");

  //   return () => {
  //     // Cleanup code if needed
  //   };
  // }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (

    <Container>

      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="relative flex min-h-[calc(100vh-9rem)] w-full flex-col justify-center pb-10 pt-24"
        >
          {isModalOpen && <Modal onClose={closeModal} />}
          {isAdminModalOpen && <AdminModal onClose={() => setIsAdminModalOpen(false)} onUpdateResume={handleResumeUpdate} />}

          <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="space-y-5">
              <motion.div {...heroIn(0)} className="flex flex-row items-center space-x-1.5">
                <span className={styles.pill} onClick={handlePillClick} style={{ cursor: 'pointer' }}>Software Engineering</span>
                <span className={styles.pill} onClick={handlePillClick} style={{ cursor: 'pointer' }}>ML/AI</span>
                <span className={styles.pill} onClick={handlePillClick} style={{ cursor: 'pointer' }}>UX Design</span>
              </motion.div>
              <motion.h1 {...heroIn(1)} className="text-6xl tracking-tighter text-foreground xl:text-8xl">
                Abeer <span className="clash-grotesk text-shimmer animate-shimmer motion-reduce:animate-none">Das.</span>
              </motion.h1>
              <motion.p {...heroIn(2)} className="max-w-md text-lg tracking-tight text-muted-foreground xl:text-xl">
                Product engineer. Currently at a VC firm, previously at two of the fastest-growing legal tech startups.
              </motion.p>
              <motion.div {...heroIn(3)} className="flex flex-row items-center space-x-1.5 pt-2">
                <Button onClick={openModal}>
                  Contact Me <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <SocialLink href="https://github.com/AbeerDas" label="GitHub">
                  <Github className="h-6 w-6" />
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/in/abeerdas/" label="LinkedIn">
                  <Linkedin className="h-6 w-6" />
                </SocialLink>
              </motion.div>
            </div>
            <motion.div {...heroIn(2)}>
              <PhotoWall photos={photos} className="h-72 sm:h-80 lg:-ml-6 lg:-mr-2 lg:h-[30rem] xl:-mr-12 min-[1400px]:-mr-28" />
            </motion.div>
          </div>
        </section>

        {/* Case studies */}
        <section id="cases" data-scroll-section className="mx-auto max-w-6xl scroll-mt-24">
          <motion.div {...heroIn(4)} className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="clash-grotesk text-gradient text-2xl font-semibold tracking-tight md:text-3xl">Case studies</h2>
            <p className="text-base text-muted-foreground md:text-lg">Full write-ups of three projects</p>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((card, i) => (
              <motion.div key={card.href} {...heroIn(5 + i)} className="h-full">
                <FeatureCard {...card} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section className="mx-auto mt-28 max-w-6xl scroll-mt-24">
          <Reveal>
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tighter xl:text-6xl">
              Things I&apos;ve built
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Hackathon wins, side projects and experiments, most of them with an AI twist.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={(i % 4) * 0.06} className="h-full">
                <Link href={project.href} target="_blank" passHref className="group block h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-background/50 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20">
                    <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: project.tint }}>
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                          className="object-contain transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-4 text-center">
                          <span className="clash-grotesk text-3xl italic tracking-tight text-white">
                            {project.title}
                          </span>
                          {project.badge && (
                            <span className="text-gradient clash-grotesk text-xs font-semibold tracking-tighter">
                              {project.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-base font-semibold">{project.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-400">{project.description}</p>
                      <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-[#141521] bg-[#0A0A13] px-2.5 py-0.5 text-[11px] text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section id="experience" data-scroll-section className="mx-auto mt-32 max-w-6xl scroll-mt-24">
          <Reveal>
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Experience
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tighter xl:text-6xl">
              Where I&apos;ve worked
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              From a VC firm to legal tech startups.
            </p>
          </Reveal>
          <div className="mt-14">
            <ExperienceList experiences={experiences} />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="mb-8 mt-40">
          <SkylineHologram>
            <a
              href="mailto:ak5das@uwaterloo.ca"
              className="group inline-flex items-center gap-2 rounded-full border border-[#a78bfa]/40 bg-primary/10 px-6 py-2.5 text-sm text-white shadow-[0_0_28px_rgba(121,128,254,0.35)] backdrop-blur transition hover:border-[#a78bfa]/70 hover:bg-primary/20"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </SkylineHologram>
        </section>
      </div>
    </Container>
  );
}

// The preloader covers the first two seconds, so the intro animates in once it lifts.
const HERO_DELAY = 2;
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const heroIn = (step: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: HERO_DELAY + step * 0.08, ease },
});

function FeatureCard(props: {
  href: string;
  kicker: string;
  title: string;
  blurb: string;
  visual: React.ReactNode;
}) {
  return (
    <Link
      href={props.href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-background/50 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-white/20"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="relative h-full w-full opacity-[0.88] transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100">
          {props.visual}
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/85 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 text-base font-medium text-white">
            Read the case study <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{props.kicker}</span>
        <h3 className="mt-1 text-xl font-semibold tracking-tight">{props.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{props.blurb}</p>
      </div>
    </Link>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative inline-block px-2 py-1 text-foreground/80 transition-colors hover:text-white"
    >
      {children}
      <span
        aria-hidden
        className="absolute inset-x-2 -bottom-0.5 h-px origin-left scale-x-0 bg-[#a78bfa] transition-transform duration-300 group-hover:scale-x-100"
      />
    </a>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
