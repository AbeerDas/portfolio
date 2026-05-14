import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import CaseTOC from "@/components/CaseTOC";

import uwmapsImage from '@/images/uwmaps.png';
import floorPlan from '@/images/hagey_hall_floor_plan.webp';
import campus from '@/images/waterloo_campus.jpg';

import identify from '@/images/identify.png';
import specify from '@/images/specify.png';
import rank from '@/images/rank.png';
import convo from '@/images/convo.png';
import miro from '@/images/miro.png';
import notes from '@/images/Notes.png';
import mountain from '@/images/mountain.png';
import existing from '@/images/existing.png';
import otherUni from '@/images/otherUni.png';
import colours from '@/images/colours.png';
import typography from '@/images/typography.png';
import logos from '@/images/logo.png';
import infoarch from '@/images/infoarch.png';
import wireframes from '@/images/wireframes.png';

import final1 from '@/images/final1.svg';
import final2 from '@/images/final2.svg';
import final3 from '@/images/final3.svg';

const tocItems = [
  { id: "background", label: "Background" },
  { id: "research", label: "Research & Ideation" },
  { id: "design", label: "Designing Process" },
  { id: "final", label: "Final Designs" },
];

const MIRO_URL = "https://miro.com/app/board/uXjVKYtlv9E=/?share_link_id=641909903582";

const UwMaps = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>UW Maps · Abeer Das</title>
        <meta
          name="description"
          content="UX design case study: rethinking campus navigation for first-year University of Waterloo students."
        />
      </Head>

      {/* Sticky top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
        <button
          onClick={() => router.push("/#projects")}
          className="group flex items-center gap-2 text-sm tracking-tight text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>
        <a
          href={MIRO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-sm tracking-tight text-muted-foreground transition-colors hover:text-foreground"
        >
          Prototype
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </header>

      <CaseTOC items={tocItems} />

      <main className="mx-auto max-w-3xl px-6 pb-32 pt-32 md:pt-40">
        {/* Title block */}
        <div className="flex flex-col items-center text-center">
          <h1 className="clash-grotesk text-6xl italic tracking-tight md:text-7xl">
            UW Maps
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">Personal Project, 2024</p>
        </div>

        {/* Hero */}
        <div className="relative mt-16 aspect-video w-full overflow-hidden rounded-2xl border borderColour bg-primary">
          <Image
            src={uwmapsImage}
            alt="UW Maps app concept hero"
            priority
            className="h-full w-full object-cover"
          />
        </div>

        {/* Two-column metadata + overview */}
        <section id="overview" className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Timeline</h3>
              <p className="mt-1 text-muted-foreground">3 weeks</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Team</h3>
              <p className="mt-1 text-muted-foreground">Solo</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Prototype</h3>
              <a
                href={MIRO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Miro Board ↗
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tools</h3>
              <p className="mt-1 text-muted-foreground">Figma · Miro · Google Forms</p>
            </div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed">
            <h3 className="text-lg font-semibold">Overview</h3>
            <p>
              Did this as a solo project at home during a coop term, mostly to practice my
              software-product muscles and eventually launch an MVP. The goal was simple: build a
              better map for the{" "}
              <span className="text-gradient font-semibold tracking-tight">
                University of Waterloo campus
              </span>{" "}
              that actually understood how students navigate it.
            </p>
            <p>
              I ran the full UX process end-to-end. User research, ideation, low- and
              high-fidelity prototypes, and a complete design system.
            </p>
          </div>
        </section>

        {/* 001 Background */}
        <section id="background" className="mt-40">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            <span className='text-gradient'>✨</span> 001 // Background & Problem
          </h2>
          <p className='mt-10 text-lg leading-relaxed'>
            As a first-year student entering university, I anticipated encountering various
            challenges, but one unexpected hurdle was the{" "}
            <span className="text-gradient font-bold tracking-tighter">
              complexity of navigating Waterloo&apos;s sprawling campus.
            </span>
            <br /><br />
            With its maze-like paths and{" "}
            <span className="text-gradient font-bold tracking-tighter">
              confusing building layouts
            </span>
            , the University of Waterloo presented a daunting challenge for newcomers like
            myself. Adding to the confusion were navigation apps like Google Maps, which often
            provided{" "}
            <span className="text-gradient font-bold tracking-tighter">
              misleading building markers
            </span>{" "}
            and{" "}
            <span className="text-gradient font-bold tracking-tighter">
              lacked comprehensive reviews of campus amenities
            </span>
            . These apps also failed to alert users to{" "}
            <span className="text-gradient font-bold tracking-tighter">accessibility issues</span>{" "}
            in study areas.
          </p>

          <div className='mt-12 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <Image
              alt="floor plan of Hagey Hall - a waterloo building"
              src={floorPlan}
              className="aspect-[4/3] w-full rounded-md bg-primary object-cover"
            />
            <Image
              alt="waterloo campus scenery"
              src={campus}
              className="aspect-[4/3] w-full rounded-md bg-primary object-cover"
            />
          </div>
        </section>

        {/* 002 Research & Ideation */}
        <section id="research" className="mt-40">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            <span className='text-gradient'>✨</span> 002 // Research & Ideation
          </h2>
          <p className='mt-10 text-lg leading-relaxed'>
            I had two main questions I wanted answers to with my user research:
          </p>

          <div className='mt-10 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='flex items-center justify-center rounded border borderColour p-8'>
              <p className='text-center text-base md:text-lg'>
                How <span className="text-gradient font-bold tracking-tighter">big</span> is the
                navigation problem?
              </p>
            </div>
            <div className='flex items-center justify-center rounded border borderColour p-8'>
              <p className='text-center text-base md:text-lg'>
                What{" "}
                <span className="text-gradient font-bold tracking-tighter">features</span>{" "}
                should be prioritized given users&apos; needs?
              </p>
            </div>
          </div>

          <p className='mt-16 text-lg'>
            To figure out the answers to both of these, I decided to conduct research in a
          </p>
          <p className='mt-2 text-3xl font-semibold tracking-tight'>Three-Pronged Approach:</p>

          <div className='mt-12 grid grid-cols-1 gap-10 md:grid-cols-3'>
            <div className='flex flex-col items-center text-center'>
              <Image alt="identify clipart" src={identify} className="h-24 w-24" />
              <p className='mt-4 text-lg font-bold'>Identifying the Problem</p>
              <p className='mt-3 text-sm text-muted-foreground'>Quantitative</p>
              <p className='mt-2 text-5xl font-semibold'>35</p>
              <p className='mt-1 text-sm text-muted-foreground'>Participants</p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <Image alt="specify clipart - thought bubble" src={specify} className="h-24 w-24" />
              <p className='mt-4 text-lg font-bold'>Identifying Specific Challenges</p>
              <p className='mt-3 text-sm text-muted-foreground'>Qualitative</p>
              <p className='mt-2 text-5xl font-semibold'>6</p>
              <p className='mt-1 text-sm text-muted-foreground'>Participants</p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <Image alt="rank clipart" src={rank} className="h-24 w-24" />
              <p className='mt-4 text-lg font-bold'>Ranking the Features</p>
              <p className='mt-3 text-sm text-muted-foreground'>Quantitative</p>
              <p className='mt-2 text-5xl font-semibold'>28</p>
              <p className='mt-1 text-sm text-muted-foreground'>Participants</p>
            </div>
          </div>

          {/* Identifying the problem */}
          <div className='mt-24'>
            <div className='flex items-center gap-4'>
              <Image alt="identify clipart" src={identify} className="h-16 w-16" />
              <h3 className='text-2xl font-bold md:text-3xl'>Identifying the Problem</h3>
            </div>
            <p className='mt-6 text-lg leading-relaxed'>
              The reason behind conducting this early quantitative study is to measure the
              extent of the issue and determine its significance. By opting for a quantitative
              approach, I was able to reach a{" "}
              <span className="text-gradient font-bold tracking-tighter">larger sample size</span>
              , providing{" "}
              <span className="text-gradient font-bold tracking-tighter">
                more conclusive and confident data.
              </span>
            </p>

            <div className='mt-10 space-y-4'>
              <div className='flex flex-col gap-4 rounded border borderColour p-6 md:flex-row md:items-center md:gap-8'>
                <p className='flex-1 text-base'>
                  Given the resources available to you, how confident are you in your ability to
                  navigate around campus effectively?
                </p>
                <p className='flex-1 text-base md:text-right'>
                  Very Confident, Somewhat Confident,{" "}
                  <span className="text-gradient font-bold tracking-tighter">
                    Neutral, Somewhat Unconfident
                  </span>
                  , Not Confident
                </p>
              </div>

              <div className='flex flex-col gap-4 rounded border borderColour p-6 md:flex-row md:items-center md:gap-8'>
                <p className='flex-1 text-base'>
                  During first semester, how many times have you been late to a class, meeting,
                  or event because you couldn&apos;t find the location on campus?
                </p>
                <p className='flex-1 text-2xl font-semibold md:text-right'>
                  At least{" "}
                  <span className="text-gradient font-bold tracking-tighter">once</span>
                </p>
              </div>

              <div className='flex flex-col gap-4 rounded border borderColour p-6 md:flex-row md:items-center md:gap-8'>
                <p className='flex-1 text-base'>
                  Would you consider using an app that provides readily available navigation
                  information, including floor plans and recommended study spots?
                </p>
                <p className='flex-1 text-2xl font-semibold md:text-right'>
                  <span className="text-gradient font-bold tracking-tighter">77%</span> said yes
                </p>
              </div>

              <div className='flex flex-col gap-4 rounded border borderColour p-6 md:flex-row md:items-center md:gap-8'>
                <p className='flex-1 text-base'>
                  Do you believe it would be better and easier for you than existing options?
                </p>
                <p className='flex-1 text-2xl font-semibold md:text-right'>
                  <span className="text-gradient font-bold tracking-tighter">92%</span> said yes
                </p>
              </div>
            </div>

            <div className='mt-12 flex flex-col items-center gap-6 md:flex-row md:gap-10'>
              <Image alt="convo clipart" src={convo} className="h-40 w-40 md:h-48 md:w-48" />
              <p className='flex-1 text-base md:text-lg'>
                During their first year, the{" "}
                <span className="text-gradient font-bold tracking-tighter">majority</span> of
                individuals relied on{" "}
                <span className="text-gradient font-bold tracking-tighter">
                  asking their friends
                </span>{" "}
                for navigation assistance.
              </p>
            </div>
          </div>

          {/* Specific problems */}
          <div className='mt-24'>
            <div className='flex items-center gap-4'>
              <Image alt="specify clipart" src={specify} className="h-16 w-16" />
              <h3 className='text-2xl font-bold md:text-3xl'>Identifying Specific Problems</h3>
            </div>
            <p className='mt-6 text-lg leading-relaxed'>
              With the problem having now been validated as a real problem, I then conducted{" "}
              <span className="text-gradient font-bold tracking-tighter">
                6 moderated interviews/coffee chats
              </span>{" "}
              with students who fit my persona. I had one simple question...
            </p>

            <div className='mt-10 flex flex-col gap-6 md:flex-row md:items-center'>
              <Image
                alt="miro board clipart"
                src={miro}
                className="w-full rounded-md md:w-2/3 object-cover"
              />
              <p className='flex-1 text-xl font-light md:text-2xl md:text-right'>
                Considering the resources available to you right now, what{" "}
                <span className="text-gradient font-bold tracking-tighter">features</span> would
                you desire on the app to enhance your campus experience?
              </p>
            </div>

            <p className='mt-10 text-lg leading-relaxed'>
              I took notes of all the features people brought up on a{" "}
              <span className="text-gradient font-bold tracking-tighter">Miro board</span> and
              created an{" "}
              <span className="text-gradient font-bold tracking-tighter">affinity map</span> of
              common themes. Here are all the features participants mentioned at least twice:
            </p>
            <Image
              alt="notes of different problems people identified"
              src={notes}
              className="mt-8 w-full rounded-md object-cover"
            />
          </div>

          {/* Ranking features */}
          <div className='mt-24'>
            <div className='flex items-end gap-4'>
              <Image alt="rank clipart" src={rank} className="h-16 w-16" />
              <h3 className='text-2xl font-bold md:text-3xl'>Ranking Potential Features</h3>
            </div>
            <p className='mt-6 text-lg leading-relaxed'>
              My last study had participants rank features they would want. I had a{" "}
              <span className="text-gradient font-bold tracking-tighter">google form</span> set
              up which had participants rank each of the above stickies 1–11. First place would
              get 11 points, second place 10 points, third 9 points, and so on.
              <br /><br />
              Worth noting that{" "}
              <span className="text-gradient font-bold tracking-tighter">
                accessibility features
              </span>{" "}
              (on the blue sticky notes) were disregarded from the ranking process. They are
              essential regardless of participant preferences.
              <br /><br />
              Here are the results:
            </p>

            <div className='mt-10 flex flex-col items-center gap-10 md:flex-row md:items-start'>
              <div className='flex-1 space-y-6'>
                <div className='flex items-center gap-6'>
                  <p className='text-4xl font-bold'>1</p>
                  <p className='text-base md:text-lg'>
                    Finding classrooms and lecture halls for classes
                  </p>
                </div>
                <div className='flex items-center gap-6'>
                  <p className='text-4xl font-bold'>2</p>
                  <p className='text-base md:text-lg'>
                    Identifying suitable study areas on campus
                  </p>
                </div>
                <div className='flex items-center gap-6'>
                  <p className='text-4xl font-bold'>3</p>
                  <p className='text-base md:text-lg'>
                    Receiving updates on campus construction, closures, events, etc.
                  </p>
                </div>
                <div className='flex items-center gap-6'>
                  <p className='text-4xl font-bold'>4</p>
                  <p className='text-base md:text-lg'>
                    Finding what on campus is open late (food, buildings, etc.)
                  </p>
                </div>
              </div>
              <Image alt="mountain clipart" src={mountain} className="h-48 w-48 md:h-56 md:w-56" />
            </div>

            <div className='mt-16'>
              <h3 className='text-2xl font-bold md:text-3xl'>Competitive Analysis</h3>
              <p className='mt-6 text-lg leading-relaxed'>
                It is very important to see what is already out there to check if similar
                services{" "}
                <span className="text-gradient font-bold tracking-tighter">
                  already exist in the market.
                </span>{" "}
                Studying existing solutions can also provide valuable inspiration for the design
                journey.
              </p>

              <div className='mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center'>
                <Image
                  alt="existing competitor apps: google maps, apple maps, waterloo online map"
                  src={existing}
                  className="w-full"
                />
                <p className='text-base md:text-lg'>
                  The Waterloo online map, the sole option for personalized campus navigation,
                  falls significantly short when measured against the interactive maps offered by
                  other universities. For example, here is our map compared to Queen&apos;s.
                </p>
              </div>

              <div className='mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center'>
                <p className='text-base md:text-lg md:order-1 order-2'>
                  Similar services in other universities offer a lot of different USPs to
                  incorporate into our own design (e.g. MacQuest&apos;s floor navigation!).
                </p>
                <Image
                  alt="apps other universities offer: McMaster, UofT, and Queen's map apps"
                  src={otherUni}
                  className="w-full md:order-2 order-1"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 003 Designing Process */}
        <section id="design" className="mt-40">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            <span className='text-gradient'>✨</span> 003 // The Designing Process
          </h2>
          <p className='mt-10 text-lg leading-relaxed'>
            The first step was to develop a design system, a crucial step for maintaining
            consistency and establishing a cohesive theme throughout the application. This
            system provides clear guidelines on colors, components, and fonts, ensuring a
            unified vision across the project.
          </p>

          <h3 className="mt-12 text-2xl font-bold md:text-3xl">Design System and Brand Creation</h3>
          <p className='mt-4 text-lg leading-relaxed'>
            In selecting the primary colors for my app, I opted for white, blue, and red. Blue,
            being a calming and universally recognized color often associated with navigation,
            aligns perfectly with the app&apos;s purpose. During designing, I will make sure to
            adhere to the 60/30/10 rule (60% primary, 30% secondary, 10% tertiary), which
            ensures a balanced and visually appealing design.
          </p>

          <h3 className="mt-12 text-2xl font-bold md:text-3xl">Colours</h3>
          <Image alt="design system colours" src={colours} className="mt-6 w-full" />

          <div className='mt-12'>
            <Image alt="design system typography" src={typography} className="w-full" />
            <p className='mt-6 text-center text-base md:text-lg'>
              I chose the Blinker font for its modern and clean aesthetic, which gives off a
              sense of friendliness that aligns well with the overall tone I am aiming for.
            </p>
          </div>

          <h3 className="mt-16 text-2xl font-bold md:text-3xl">Logo and Name</h3>
          <p className='mt-4 text-lg leading-relaxed'>
            The logos needed to be simplistic to ensure they could be scaled down without losing
            their recognizability. After a couple of iterations, these are what I ended up going
            with:
          </p>
          <Image alt="design system for logos" src={logos} className="mt-8 w-full" />

          <h3 className="mt-16 text-2xl font-bold md:text-3xl">Information Architecture</h3>
          <p className='mt-4 text-lg leading-relaxed'>
            The next step involved establishing the information architecture of the app. In
            essence, this diagram provides a layout of where each page is located, aligning with
            the primary purposes outlined through user research. For a more detailed version,
            you can access the Miro board by clicking{" "}
            <a
              href={MIRO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gradient transition-colors hover:text-yellow-500"
            >
              here
            </a>
            .
          </p>
          <a href={MIRO_URL} target="_blank" rel="noopener noreferrer">
            <Image
              alt="information architecture"
              src={infoarch}
              className="mt-8 w-full gray-overlay scale-up"
            />
          </a>

          <h3 className="mt-16 text-2xl font-bold md:text-3xl">Low & High-Fidelity Wireframes</h3>
          <p className='mt-4 text-lg leading-relaxed'>
            Time to actually start designing! To quickly visualize and have something tangible,
            I usually grab a piece of paper and start creating low-fidelity wireframes. For UW
            Maps, I started off by creating very basic sketches of each of the initial pages of
            all my navigation options.
            <br /><br />
            Then, I decided to make slightly higher fidelity wireframes of the saved locations
            and main explore tab. These are much easier to change and reiterate than actual
            designs.
          </p>
          <Image alt="low fidelity wireframes" src={wireframes} className="mt-8 w-full" />
        </section>

        {/* 004 Final Designs */}
        <section id="final" className="mt-40">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            <span className='text-gradient'>✨</span> 004 // Final Designs
          </h2>
          <Image
            src={final1 as string}
            alt="final design 1"
            className="mt-12 w-full opacity-60 transition-opacity duration-500 ease-in-out transform hover:opacity-100"
          />
          <Image
            src={final2 as string}
            alt="final design 2"
            className="mt-8 w-full opacity-60 transition-opacity duration-500 ease-in-out transform hover:opacity-100"
          />
          <Image
            src={final3 as string}
            alt="final design 3"
            className="mt-8 w-full opacity-60 transition-opacity duration-500 ease-in-out transform hover:opacity-100"
          />
        </section>

        {/* Footer signature */}
        <div className="mt-32 flex items-center justify-between border-t borderColour pt-8 text-sm text-muted-foreground">
          <span>Abeer Das</span>
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default UwMaps;
