import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";

import Modal from '../components/modal';
import Cursor from '../components/cursor';


import {
  ChevronRight,
  Rabbit,
  Bot,
  Database,
  PackageSearch,
  MonitorSmartphone,
  Github,
  Linkedin
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import uwmapsImage from '@/images/uwmaps.png';
import rooted from '@/images/rooted.png';
import bchm from '@/images/bchm.png';


import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Years of experience", value: "3+" },
  { label: "Technologies mastered", value: "5+" },
  { label: "Companies worked with", value: "15+" },
];

const projects = [
  {
    title: "Statsanity",
    description: "Statsanity: NBA AI Predictor",
    image: "/assets/unqueue.webm",
    href: "https://unqueue.shop/",
  },
  {
    title: "InfiniteVPS",
    description: "OnePass: Password Manager",
    image: "/assets/infinitevps.webm",
    href: "#",
  },
  {
    title: "TranslateBot",
    description: "Powerful Multilingual Translation Bot for Discord",
    image: "/assets/translate_bot.webm",
    href: "https://translatebot.app/",
  },
  {
    title: "Wrona",
    description: "Robotics-focused technology company",
    image: "/assets/wrona.jpeg",
    href: "https://www.wrona.com/",
  },
  {
    title: "This website",
    description: "My personal website",
    image: "/assets/portfolio.webm",
    href: "https://github.com/wendoj/portfolio",
  },
];

const services = [
  {
    service: "Databases for Back-End Development",
    description:
      "Covered database schema design principles, including SQL usage, ERDs, key concepts like primary & foreign keys, and database normalization up to third normal form, emphasizing CRUD operations and comprehensive database design and normalization understanding.",
    icon: Database,
    company: "Meta",
    href: "https://www.coursera.org/account/accomplishments/verify/ESJFL6QXKVMZ",
  },
  {
    service: "AI Deep Learning",
    description:
      "Explored Convolutional Neural Network (CNN) architecture, delved into data cleaning and preprocessing techniques, acquired proficiency in effective retraining methods, implemented transfer learning using GoogLeNet, and conducted comprehensive evaluations of model performance.",
    icon: Bot,
    company: "MathWorks",
    href: "https://www.coursera.org/account/accomplishments/verify/ESJFL6QXKVMZ",
  },
  {
    service: "Product Management: An Introduction",
    description:
      "Explored the responsibilities and knowledge requirements essential for a product manager’s success, while examining the end-to-end product & project management lifecycle and how to drive product success. Additionally, investigated the concept of value creation.",
    icon: PackageSearch,
    company: "IBM",
    href: "https://www.coursera.org/account/accomplishments/verify/4A53JR3JE55L",
  },
  {
    service: "Introduction to Back-End Development",
    description:
      "Explored HTTP requests and various Internet Protocols, gained proficiency in leveraging frameworks and libraries such as React, Bootstrap, Material UI, responsive design principles, and gained insight into potential career paths in backend development.",
    icon: MonitorSmartphone,
    company: "Meta",
    href: "https://www.coursera.org/account/accomplishments/verify/6Y3448H9CNQV",
  },
  {
    service: "Agile Development and Scrum",
    description:
      "Explored the fundamental principles of these techniques, enabling iterative development and efficient project management. Lqearnt how to refine product backlogs through sprint planning to ensure performance satisfaciton via metric-driven insights.",
    icon: Rabbit,
    company: "IBM",
    href: "https://www.coursera.org/account/accomplishments/verify/9KHY8854XC55",
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [expandAll, setExpandAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);


  const handleToggleExpand = () => {
    setExpandAll((prevExpandAll) => !prevExpandAll);
  }

  useEffect(() => {
    const CollapsibleTimeline = class {
      el: Element | null;
      animation: Animation | undefined;
      

      constructor(el: string) {
        this.el = document.querySelector(el) as HTMLElement;
        this.init();
      }
      init() {
        this.el?.addEventListener("click", this.itemAction.bind(this)  as EventListener);
      }
      animateItemAction(button: Element | null | undefined, ctrld: Element | null | undefined, contentHeight: number, shouldCollapse: boolean) {
        
        if (!button || !ctrld) return;

        const expandedClass = "timeline__item-body--expanded";
        const animOptions = {
          duration: 300,
          easing: "cubic-bezier(0.65,0,0.35,1)"
        };

        if (shouldCollapse) {
          button.ariaExpanded = "false";
          ctrld.ariaHidden = "true";
          ctrld.classList.remove(expandedClass);
          animOptions.duration *= 2;
          this.animation = ctrld.animate([
            { height: `${contentHeight}px` },
            { height: `${contentHeight}px` },
            { height: "0px" }
          ], animOptions);
        } else {
          button.ariaExpanded = "true";
          ctrld.ariaHidden = "false";
          ctrld.classList.add(expandedClass);
          this.animation = ctrld.animate([
            { height: "0px" },
            { height: `${contentHeight}px` }
          ], animOptions);
        }
      }
      itemAction(e: MouseEvent) {
        const { target } = e;
        const action = (target as HTMLElement)?.getAttribute("data-action");
        const item = (target as HTMLElement)?.getAttribute("data-item");

        if (action) {
          const targetExpanded = action === "expand" ? "false" : "true";
          const buttons = Array.from(this.el?.querySelectorAll(`[aria-expanded="${targetExpanded}"]`) || []);
          const wasExpanded = action === "collapse";

          for (let button of buttons) {
            const buttonID = button.getAttribute("data-item");
            const ctrld = this.el?.querySelector(`#item${buttonID}-ctrld`);
            const contentHeight = ctrld?.firstElementChild?.clientHeight || 0;

            this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
          }

        } else if (item) {
          const button = this.el?.querySelector(`[data-item="${item}"]`);
          const expanded = button?.getAttribute("aria-expanded");

          if (!expanded) return;

          const wasExpanded = expanded === "true";
          const ctrld = this.el?.querySelector(`#item${item}-ctrld`);
          const contentHeight = ctrld?.firstElementChild?.clientHeight || 0;

          this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
        }
      }
    };


    const ctl = new CollapsibleTimeline("#timeline");

    return () => {
      // Cleanup code if needed
    };
  }, []);

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
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>UX Design</span>
              <span className={styles.pill}>Software Engineering</span>
              <span className={styles.pill}>ML/AI</span>
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
                A UX designer and full-stack developer with a love for product development.
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
                onClick={() => scrollTo(document.querySelector("#projects"))}
              >
                Projects
              </Button>
              <div className="inline-flex">
                        <a
                            href="https://github.com/your-profile"
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

        {/* About */}
        <section id="about" data-scroll-section>

          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl space-y-10"
          >
            <Gradient />
            <h2 className="py-16 pb-2 text-lg font-light leading-normal tracking-tighter text-foreground xl:text-[38px] lg:text-[28px]">
              I&apos;m a student studying {" "}
              <a href="https://uwaterloo.ca/systems-design-engineering/" target="_blank" rel="noopener noreferrer"  className="text-gradient font-medium transition-colors hover:text-yellow-500">
                Systems Design Engineering
                </a> at the
              Univeristy of Waterloo. Here is my {" "}

              <span className="font-medium text-gradient italic transition-colors hover:text-blue-200 clash-grotesk">tech stack.
              </span>
              
              <br /><br />My experience spans from <span className="text-gradient transition-colors hover:text-orange-200 font-medium">
                design teams {" "}
              </span>
              to {" "}
              <span className="text-gradient sticky transition-colors hover:text-orange-200 font-medium">
                mid-sized </span>
              companies, where I&apos;ve been instrumental in the entire {" "}
              <span className="text-gradient transition-colors hover:text-orange-200 font-medium">
                product
                design process.
              </span>

              <br /><br />
              Other than that, I love playing the {" "}
              <span className="text-gradient transition-colors hover:text-orange-200 font-medium">
                acoustic 
      
                 and 
       
                 electric guitar
                 </span>, as well as the {" "}
                 <span className="text-gradient transition-colors hover:text-orange-200 font-medium"> 
                 tabla {" "}
                 </span> 
                 whenever I have
              some free time! I also enjoy {" "} 
              
              watching
              basketball
              and listening to <a href="https://open.spotify.com/playlist/3doftAiaXi0HvwySBeqAYw?si=a17bc1dc74e54404" 
              target="_blank" rel="noopener noreferrer"  
              className="text-gradient font-medium transition-colors italic hover:text-green-500"> 
              R&B.
              </a>


            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              <div className="flex items-center text-center xl:items-start xl:text-start">

              </div>
            </div>

          </div>

        </section>

        {/* Projects */}
        <section id="projects" className="flex justify-center" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
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
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="items-center space-x-1.5"
            >
                <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".04"
              className="items-center space-x-1.5"
            >
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                ✨ Featured Work
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                UX Designs
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                All my designs prioritize user experience,
                ensuring that every aspect is well-crafted to enhance
                usability, accessibility, and overall enjoyment.
              </p>
              </div>
              

              {/* new card content here */}
              <div className="max-w-6xl mx-auto">
                <Link href='/uwmaps'>
                  <div className="mt-14 rounded-xl gray-overlay scale-up">
                    <div className="border bg-card/10 text-card-foreground shadow-sm">
                      <div className='flex'>
                        <Image src={uwmapsImage} className="aspect-video rounded-2xl w-full h-full bg-primary object-cover" />
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
                        <Image src={rooted} className="aspect-video rounded-2xl h-full w-full  bg-primary object-cover" />
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
                        <Image src={bchm} className="aspect-video rounded-2xl w-full h-full  bg-primary object-cover" />
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


              <h2 className="mt-64 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                Software Projects
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                I&apos;ve worked on a variety of projects, from small websites to
                large-scale web applications. Here are some of my favorites:
              </p>

              {/* Carousel */}
              <div className="mt-14">
                <Carousel setApi={setCarouselApi} className="w-full">
                  <CarouselContent>
                    {projects.map((project) => (
                      <CarouselItem key={project.title} className="md:basis-1/2">
                        <Card id="tilt">
                          <CardHeader className="p-0">
                            <Link href={project.href} target="_blank" passHref>
                              {project.image.endsWith(".webm") ? (
                                <video
                                  src={project.image}
                                  autoPlay
                                  loop
                                  muted
                                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                                />
                              ) : (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  width={600}
                                  height={300}
                                  quality={100}
                                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                                />
                              )}
                            </Link>
                          </CardHeader>
                          <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                            <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                              {project.description}
                            </CardTitle>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="py-2 text-center text-sm text-muted-foreground">
                  <span className="font-semibold">
                    {current} / {count}
                  </span>{" "}
                  projects
                </div>
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
      
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="mt-12 flex max-w-6xl flex-col justify-start space-y-10"
          >
     
            <div className="mb-[-12.5rem]">
              <h2 className="mb-[0.5rem] text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                Work Experience
              </h2>
              <Gradient />

              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                Experience is the greatest teacher, and I've embraced diverse opportunities to learn and grow.              </p>
            </div>
            <svg display="none">
              <symbol id="arrow">
                <polyline points="7 10,12 15,17 10" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
              </symbol>
            </svg>
            <div id="timeline" className="timeline">
              <div className="btn-group">
                <div className="mt-12">
                  <button
                    className={`text-xl btn ${expandAll ? 'bg-indigo-500 text-white' : 'bg-indigo-500 text-white'}`}
                    type="button"
                    onClick={handleToggleExpand}
                    data-action={expandAll ? "collapse" : "expand"}
                  >
                    {expandAll ? "Collapse All" : "Expand All"}
                  </button>
                </div>
              </div>
              <div className="timeline__item">
                <div className="timeline__item-header">
                  <button className="timeline__arrow" type="button" id="item1" aria-labelledby="item1-name" aria-expanded="false" aria-controls="item1-ctrld" aria-haspopup="true" data-item="1">
                    <svg className="timeline__arrow-icon" viewBox="0 0 24 24" width="24px" height="24px">
                      <use href="#arrow" />
                    </svg>
                  </button>
                  <span className="timeline__dot"></span>
                  <span id="item1-name" className="timeline__meta">
                    April - Present<br />
                    <h3 className="mt-1 text-gradient clash-grotesk font-medium tracking-tighter timeline__title">
                      Product Designer</h3>
                    <h3 className="text-3xl mt-1 mb-[0.5rem]">UW Blueprint</h3>
                  </span>
                </div>
                <div className="timeline__item-body" id="item1-ctrld" role="region" aria-labelledby="item1" aria-hidden="true">
                  <div className="timeline__item-body-content">
                    <p className="text-xl sm:text-md timeline__item-p">
                      •  Currently going through the onboarding process

                    </p>
                  </div>
                </div>
              </div>

              <div className="timeline__item">
                <div className="timeline__item-header">
                  <button className="timeline__arrow" type="button" id="item2" aria-labelledby="item2-name" aria-expanded="false" aria-controls="item2-ctrld" aria-haspopup="true" data-item="2">
                    <svg className="timeline__arrow-icon" viewBox="0 0 24 24" width="24px" height="24px">
                      <use href="#arrow" />
                    </svg>
                  </button>
                  <span className="timeline__dot"></span>
                  <span id="item2-nam" className=" mb-[0.5rem] timeline__meta">
                    <span className="">
                      Winter 2024
                    </span><br /><br />
                    <h1 className="mt-[-1.2rem] text-gradient clash-grotesk font-medium tracking-tighter timeline__title">
                      UX Researcher Intern
                    </h1>
                    <h3 className="text-3xl mt-2 mb-[0.5rem]">
                      Questrade
                    </h3>
                  </span>
                </div>
                <div className="timeline__item-body" id="item2-ctrld" role="region" aria-labelledby="item2" aria-hidden="true">
                  <div className="timeline__item-body-content">
                    <p className="text-xl sm:text-md timeline__item-p">
                      •  Led 6 research initiatives, collaborating cross-departmentally to optimize digital infrastructure for their active trading platform, auto
                      insurance, and mortgage services.
                      <br /><br />•  Employed methodologies including A/B testing, usability studies, open/closed card sorting, moderated interviews, and expert reviews
                      utilizing tools such as Optimal Workshop and UserTesting
                      <br /><br />•  Presented findings and reports to diverse stakeholders, including board members, C-level executives, UX designers, product managers,
                      software engineers, and others, employing synthesis methodologies such as affinity mapping.
                      <br /><br />•  Designed Figma prototypes and components, integrating personal recommendations to influence product development

                    </p>
                  </div>
                </div>
              </div>

              <div className="timeline__item">
                <div className="timeline__item-header">
                  <button className="timeline__arrow" type="button" id="item3" aria-labelledby="item3-name" aria-expanded="false" aria-controls="item3-ctrld" aria-haspopup="true" data-item="3">
                    <svg className="timeline__arrow-icon" viewBox="0 0 24 24" width="24px" height="24px">
                      <use href="#arrow" />
                    </svg>
                  </button>
                  <span className="timeline__dot"></span>
                  <span id="item3-nam" className=" mb-[0.5rem] timeline__meta">
                    <span className="">
                      March - Present
                    </span><br /><br />
                    <h1 className="mt-[-1.1rem] text-gradient 
                    clash-grotesk font-medium 
                    tracking-tighter 
                    timeline__title">
                      Software Engineer
                    </h1>
                    <h3 className="md:text-3xl text-lg mt-2 mb-[0.5rem] timeline__body">
                      Bangladesh Canada Cultural Society
                    </h3>
                  </span>
                </div>
                <div className="timeline__item-body" id="item3-ctrld" role="region" aria-labelledby="item3" aria-hidden="true">
                  <div className="timeline__item-body-content">
                    <p className="text-xl sm:text-md timeline__item-p">
                      •   Redesigned and developed 29 new webpages by creating wireframes and prototypes on Figma, while also incorporating and reiterating
                      based on stakeholder feedback from senior committee board meetings
                      <br /><br />•   Implemented website redesign using HTML, CSS, and React, ensuring seamless user experience and modern design aesthetics resulting
                      in a 35% increase in donations
                      <br /><br />•   Integrated email subscription feature, capturing user data stored in SQL database for targeted communications resulting in 2500+ new
                      email subscribers within the first month of launch

                    </p>
                  </div>
                </div>
              </div>


            
            </div>
           
            
          </div>
        </section>

        {/* Services */}
        <section id="certifications" data-scroll-section>
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
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Need Qualifications?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  As an active learner,
                  I am always looking for ways to enhance my skillset.
                  Here are some courses I have completed.
                </p>
              </div>
              {services.map((service) => (
                <Link href={service.href} target="_blank">
                  <div
                    key={service.service}
                    className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                  >
                    <service.icon className="my-6 text-primary" size={20} />
                    <span className="text-lg tracking-tight text-foreground">
                      {service.service}
                    </span>
                    <span className="mt-2 italic tracking-tighter text-muted-foreground">
                      {service.company}
                    </span>
                    <span className="mt-2 tracking-tighter text-muted-foreground">
                      {service.description}
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
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
              I&apos;m currently seeking for 2024 fall internships as well as freelance opportunities.
            </p>
            <Link href="mailto:wendoj@proton.me" passHref>
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
