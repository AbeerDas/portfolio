import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
// import { SpeedInsights } from "@vercel/speed-insights/next"


import Modal from '../components/modal';
import AdminModal from '../components/AdminModal';


import {
  ChevronRight,
  Github,
  Linkedin,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, CONFIG, updateResumeUrl, loadResumeUrl } from "@/lib/utils";
import Image from "next/image";

import uwmapsImage from '@/images/uwmaps.png';
import rooted from '@/images/rooted.png';
import bchm from '@/images/bchm.png';
import spellbookLongLogo from '@/images/spellbook/SpellbookLongLogo.svg';



const projects = [
  {
    title: "Estia",
    description: "Publicly hosted platform with 100+ coding projects, AI-powered project generation, RAG retrieval, and user profiles (auth, comments, etc.)",
    image: "/assets/estia.png",
    href: "https://estiafrontend.vercel.app/",
    stack: ["React", "Node.js", "PostgreSQL", "Groq", "Vercel"],
  },
  {
    title: "Statsanity",
    description: "Full-stack application with login database to predict NBA games and MVP with linear regression AI model",
    image: "/assets/statsanity.png",
    href: "https://github.com/achow111/Statsanity",
    stack: ["React", "Tensorflow", "Python (BeautifulSoup)", "Flask"],
  },
  {
    title: "OnePass",
    description: "Password Manager CRUD app featuring strong password generation, a password checker, and a password storage system",
    image: "/assets/onepassv2.png",
    href: "#",
    stack: ["Next.js", "Firebase", "Node.js"],
  },
  {
    title: "StockAI",
    description: "Built an LSTM AI model to predict next-day stock prices using candlestick data on varying training configs to explore optimization",
    image: "/assets/stockai.png",
    href: "https://github.com/AbeerDas/StockMarketPrediction",
    stack: ["Python", "Keras", "Pandas", "NumPy"],
  },
  {
    title: "Dungeon Map Generator",
    description: "Won WEC 2024 building a dynamic tile-based map generator with pathfinding using Dijkstra's algorithm",
    image: "/assets/wecv4.png",
    href: "https://github.com/tawsifrm/WEC-2024",
    stack: ["Python", "Turtle Graphics"],
  },
  {
    title: "Movie Land",
    description: "Search tool for finding movies and TV shows, offering concise descriptions and release dates for each title",
    image: "/assets/movieland.png",
    href: "https://github.com/AbeerDas/MovieLand",
    stack: ["React", "OMDb API", "TailwindCSS"],
  },
];

const workExperiences = [
  {
    id: 1,
    date: "Jan 2026 - May 2026",
    title: "Software Engineer Intern",
    company: "Spellbook (Khosla Ventures)",
    image: "/assets/spellbook.svg",
    description: (
      <ul className="list-disc pl-5">
        <li>
          Solo-shipped a <span className="font-bold text-lightblue">legal workflow agent builder</span> using Vercel AI SDK, leading to closure of a <span className="font-bold text-lightblue">$100k+ enterprise contract</span>.
        </li>
        <li>
          Slashed AI agent failures by <span className="font-bold text-lightblue">~50%</span> by replacing unpredictable tool calls with configurable, structured execution steps.
        </li>
        <li>
          Conceived Personalization Settings and shipped <span className="font-bold text-lightblue">Company Profiles</span>, anchoring startup&apos;s push into in-house legal teams.
        </li>
        <li>
          Instrumented <span className="font-bold text-lightblue">35 Datadog</span> UX/error analytic events across all features, catching <span className="font-bold text-lightblue">3 critical drop-offs</span> before reaching users.
        </li>
      </ul>
    ),
  },
  {
    id: 2,
    date: "Sept 2025 - Dec 2025",
    title: "Software Developer",
    company: "Industry 4.0",
    image: "/assets/industry.png",
    description: (
      <ul className="list-disc pl-5">
        <li>
          Drove <span className="font-bold text-lightblue">350+ case competition signups</span> by leading a website rebuild with a team of <span className="font-bold text-lightblue">20+ executives</span>, owning the project from design through release.
        </li>
        <li>
          Ran agile delivery end-to-end, coordinating scope and timeline across cross-functional teams while keeping a high product quality bar.
        </li>
      </ul>
    ),
  },
  {
    id: 3,
    date: "Apr 2025 - Aug 2025",
    title: "Software Engineer Intern",
    company: "BorderPass",
    image: "/assets/borderpass.png",
    description: (
      <ul className="list-disc pl-5">
        <li>
          Propelled a <span className="font-bold text-lightblue">35% increase in paying customers</span> by redesigning the Visitor Visa flow in React/TypeScript, eliminating manual entry by parsing uploaded documents to validate against the latest scraped IRCC requirements.
        </li>
        <li>
          Automated document generation, scaling to <span className="font-bold text-lightblue">105k+ PDFs</span> processed via a serverless AWS Lambda pipeline with S3 triggers.
        </li>
        <li>
          Drove <span className="font-bold text-lightblue">12+ university partnerships</span> by building an AWS Redshift data warehouse with a real-time finances pipeline.
        </li>
        <li>
          Owned weekly zero-downtime prod releases, managing the full CI/CD pipeline across AWS backend services and Vercel.
        </li>
      </ul>
    ),
  },
  {
    id: 4,
    date: "Mar 2024 - Present",
    title: "Software Engineering Lead",
    company: "UW Blueprint",
    image: "/assets/blueprint.png",
    description: (
      <ul className="list-disc pl-5">
        <li>
          Led a cross-functional team of <span className="font-bold text-lightblue">12</span> to build a full-stack financial literacy platform for disabled children for a nonprofit (Extend-a-Family).
        </li>
        <li>
          Engineered a React/TypeScript PDF viewer and bookmarking dashboard using component memoization and lazy loading.
        </li>
        <li>
          Architected a JWT auth system using Express, MongoDB, and Firebase, implementing role-based access and token refresh.
        </li>
      </ul>
    ),
  },
  {
    id: 5,
    date: "Sept 2024 - Dec 2024",
    title: "Software Engineer Intern",
    company: "University of Toronto",
    image: "/assets/uoft.png",
    description: (
      <ul className="list-disc pl-5">
        <li>
          Migrated a monolithic student records API into <span className="font-bold text-lightblue">Node.js microservices</span>, improving modularity using the sidecar pattern.
        </li>
        <li>
          Delivered data access for <span className="font-bold text-lightblue">60,000+ students</span> by integrating OIDC and OAuth 2.0 for authorization over financial records.
        </li>
      </ul>
    ),
  },
  {
    id: 6,
    date: "Jan 2024 - Apr 2024",
    title: "UX Research Intern",
    company: "Questrade",
    image: "/assets/questrade.png",
    description: (
      <ul className="list-disc pl-5">
        <li>
          Conducted <span className="font-bold text-lightblue">6 UX research studies</span> across Questrade&apos;s investment platform, uncovering insights that boosted customer satisfaction by up to <span className="font-bold text-lightblue">40%</span>.
        </li>
      </ul>
    ),
  },
  {
    id: 7,
    date: "Mar 2023 - Apr 2024",
    title: "Web Developer",
    company: "Bangladesh Canada Cultural Society",
    image: "/assets/bchm.png",
    description: (
      <ul className="list-disc pl-5">
        <li>
          Led a complete website redesign covering <span className="font-bold text-lightblue">29 new pages</span>, taking the org from an outdated brochure site to a modern donor-facing presence.
        </li>
        <li>
          Drove a <span className="font-bold text-lightblue">35% increase in donations</span> through the redesign by improving navigation, accessibility, and trust signals across the site.
        </li>
        <li>
          Shipped an email marketing system that captured <span className="font-bold text-lightblue">2,500+ subscribers</span> in the first month, enabling targeted community communications.
        </li>
      </ul>
    ),
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
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
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
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
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          {isModalOpen && <Modal onClose={closeModal} />}
          {isAdminModalOpen && <AdminModal onClose={() => setIsAdminModalOpen(false)} onUpdateResume={handleResumeUpdate} />}
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill} onClick={handlePillClick} style={{ cursor: 'pointer' }}>Software Engineering</span>
              <span className={styles.pill} onClick={handlePillClick} style={{ cursor: 'pointer' }}>UX Design</span>
              <span className={styles.pill} onClick={handlePillClick} style={{ cursor: 'pointer' }}>ML/AI</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hey, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Abeer.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                SYDE @ Waterloo · Product Engineering at two VC-backed startups.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6 items-center"
            >
              <Button onClick={openModal}>
                Contact Me <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const projectsSection = document.querySelector("#projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Projects
              </Button>
              <div className="inline-flex">
                <a
                  href="https://github.com/AbeerDas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform duration-300 transform hover:scale-150"
                >
                  <Github className="h-6 w-6 ml-4 mr-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/abeerdas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform duration-300 transform hover:scale-150"
                >
                  <Linkedin className="h-6 w-6 md:mr-2 mx-2" />
                </a>
              </div>
            </span>
            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              See my work{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="flex justify-center" data-scroll-section>
          <div
            className="my-1 flex max-w-6xl flex-col justify-start space-y-10"
          >
            {/* Gradient */}
            <div className="relative isolate -z-10">
              <div
                className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
                aria-hidden="true"
              >
                <div
                  className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                />
              </div>
            </div>
            <div data-scroll data-scroll-speed=".4" className="mt-[-10.0rem]">
              {/* Software Cases (first up) */}
              <div className="mt-[90px]">
                <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                  ✨ Cases
                </span>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                  Software Cases
                </h2>
                <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                  Deep dives into the software work I&apos;m most proud of,
                  written for product engineers and recruiters who want to
                  understand the impact.
                </p>
              </div>

              <div className="max-w-6xl mx-auto">
                <Link href='/spellbook'>
                  <div className="group mt-14 rounded-2xl scale-up relative overflow-hidden">
                    {/* Smooth darkening overlay on hover */}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-black/80 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                    {/* "View Full Case Study" label */}
                    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                      <p className="text-5xl text-white">View Full Case Study</p>
                    </div>
                    <div className="border bg-card/10 text-card-foreground shadow-sm rounded-2xl overflow-hidden">
                      <div className='flex relative'>
                        <div
                          style={{ backgroundColor: '#13171A' }}
                          className="aspect-video w-full flex items-center justify-center"
                        >
                          <Image
                            alt="Spellbook"
                            src={spellbookLongLogo as string}
                            className="h-auto w-60 md:w-96"
                          />
                        </div>

                        <div className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <h3 className="border-t border-white/5 p-4 text-base font-normal tracking-tighter truncate">
                            <div className={styles.d_pill_container}>
                              <span className={styles.d_pill}>Spellbook</span>
                              <span className={styles.d_pill}>Software Engineering</span>
                              <span className={styles.d_pill}>Product Ownership</span>
                              <span className={styles.d_pill}>AI / LLMs</span>
                            </div>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Software Projects */}
              <h2 className="mt-32 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                Software Projects
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                I&apos;ve worked on a variety of projects, from small websites to
                large-scale web applications. Here are some of my favorites:
              </p>

              <div className="mt-14 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                {projects.map((project) => (
                  <Link  key={project.title} href={project.href} target="_blank" passHref>
                    <div
                      key={project.title}
                      className="flex flex-col items-start rounded-md bg-white/5 shadow-md backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:bg-white/10 hover:shadow-md"
                    >
                      <div className="relative w-full h-64 overflow-hidden rounded-t-md">
                        {/* The container has overflow hidden */}
                        <Image
                          src={project.image}
                          alt={project.title}
                          layout="fill" // This makes the image fill the container
                          quality={100}
                          className="object-cover transition-transform duration-300 hover:scale-110"
                        /* Scaling on hover */
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                        </div>
                        <p className="text-base text-gray-400">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-8">
                          {project.stack.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-[#0A0A13] border border-[#141521] text-sm text-gray-200 py-1 px-6 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>


              <div>
                <div className="mt-32">
                  <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                    ✨ Projects
                  </span>
                  <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                    UX Design Cases
                  </h2>
                  <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                    All my designs prioritize user experience,
                    ensuring that every aspect is well-crafted to enhance
                    usability, accessibility, and overall enjoyment.
                  </p>
                </div>


                <div className="max-w-6xl mx-auto">
                  <Link href='/uwmaps'>
                    <div className="group mt-14 rounded-2xl scale-up relative overflow-hidden">
                      {/* Smooth darkening overlay on hover */}
                      <div className="pointer-events-none absolute inset-0 z-10 bg-black/80 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                      {/* "View Full Design Case" label */}
                      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                        <p className="text-5xl text-white">View Full Design Case</p>
                      </div>
                      <div className="border bg-card/10 text-card-foreground shadow-sm rounded-2xl overflow-hidden">
                        <div className='flex relative'>
                          <Image alt="waterloo maps main image"
                            src={uwmapsImage} className="aspect-video w-full h-full bg-primary object-cover" />

                          <div className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                            <h3 className="border-t border-white/5 p-4 text-base font-normal tracking-tighter truncate">
                              <div className={styles.d_pill_container}>
                                <span className={styles.d_pill}>User Research</span>
                                <span className={styles.d_pill}>Low/High Fidelity Prototypes</span>
                                <span className={styles.d_pill}>Iterative Designing</span>
                              </div>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                </div>
                <Link href='/uwmaps'>
                  <div className="hidden mt-14 gray-overlay scale-up">
                    <div className="border rounded-2xl bg-card/10 text-card-foreground shadow-sm">
                      <div className='flex'>
                        <Image alt="rooted second design case"
                          src={rooted} className="aspect-video rounded-2xl h-full w-full  bg-primary object-cover" />
                        <div className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <h3 className="border-t border-white/5 p-4 text-base font-normal tracking-tighter truncate">
                            <div className={styles.d_pill_container}>
                              <span className={styles.d_pill}>Designathon</span>
                              <span className={styles.d_pill}>Low/High Fidelity Prototypes</span>
                              <span className={styles.d_pill}>User Research</span>
                              <span className={styles.d_pill}>Iterative Designing</span>
                            </div>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>


                <Link href='/uwmaps'>
                  <div className="hidden mt-14 gray-overlay scale-up">

                    <div className=" border rounded-2xl bg-card/10 text-card-foreground shadow-sm">
                      <div className='flex flex-col'>
                        <Image alt="temple design case"
                          src={bchm} className="aspect-video rounded-2xl w-full h-full  bg-primary object-cover" />
                        <div className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <h3 className="border-t border-white/5 p-4 text-base font-normal tracking-tighter truncate">
                            <div className={styles.d_pill_container}>
                              <span className={styles.d_pill2}>Reesponsive Design</span>
                              <span className={styles.d_pill2}>Non-Profit Organization</span>
                              <span className={styles.d_pill2}>User Research</span>
                            </div>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

              </div>


              <div className="relative isolate -z-10">
                <div
                  className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section id="experience" data-scroll-section>
          <div data-scroll data-scroll-speed=".4" data-scroll-position="top" className="mt-12 flex max-w-6xl flex-col justify-start space-y-10">
            <div className="mb-10">
              <h2 className="mb-[0.5rem] text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                Work Experience
              </h2>
              <Gradient />
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                Experience is the greatest teacher, and I&apos;ve embraced diverse opportunities to learn and grow.
              </p>
            </div>

            <div id="timeline" className="timeline">
              {workExperiences.map((experience) => (
                <div key={experience.id} className="timeline__item">
                  <div className="timeline__item-header">
                    <button className="timeline__arrow" type="button" aria-hidden="true">
                      <svg className="timeline__arrow-icon" viewBox="0 0 24 24" width="24px" height="24px">
                        <use href="#arrow" />
                      </svg>
                    </button>
                    <span className="timeline__dot"></span>
                    <span id={`item${experience.id}-name`} className="mb-[0.5rem] timeline__meta">
                      <span>{experience.date}</span>
                      <br /><br />
                      <div className="flex items-center">
                        {/* Logo image on the left */}
                        <Image src={experience.image} alt={`${experience.company} logo`} className="w-16 h-16 mr-4 rounded-lg" width={64} height={64} />
                        {/* Title and company name container */}
                        <div>
                          <h3 className="mt-1 text-gradient clash-grotesk font-medium tracking-tighter timeline__title">
                            {experience.title}
                          </h3>
                          <h3 className="text-3xl mt-1 mb-[0.5rem]">{experience.company}</h3>
                        </div>
                      </div>
                    </span>
                  </div>
                  <div className="timeline__item-body" role="region" aria-labelledby={`item${experience.id}`}>
                    <div className="timeline__item-body-content ml-28 z-[9999]">
                      <div className="text-xlsm:text-md timeline__item-p">
                        {experience.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Like what you {" "}
              <span className="text-gradient clash-grotesk">see?</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently looking for Summer 2026 opportunities.
            </p>
            <Link href="mailto:ak5das@uwaterloo.ca" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
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
