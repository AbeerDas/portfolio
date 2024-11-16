import React from 'react';

import Container from "@/components/Container";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

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

const UwMaps = () => {
  return (
    <section
      id="home"
      data-scroll-section
      className="mt-40 flex w-full flex-col mx-auto items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
    >
      <div className={styles.intro}>
        <Container>
          <div className="mt-36 ">
            <div className=" mx-auto rounded-2xl w-9/10 border bg-card/10 text-card-foreground shadow-sm">
              <div className='flex flex-col'>
                <Image alt="header image waterloo campus mobile app"
                src={uwmapsImage} className="rounded-3xl bg-primary object-cover" />

              </div>
            </div>
          </div>

          <div className='flex items-center flex-col lg:flex-row items-center md:my-24 mt-12'>
            <div className='
            md:mr-[15rem]
            w-9/10
            md:w-[28rem]
            font-light text-foreground 
            text-lg
            mb-12
            md:mb-0
            md:text-2xl'>
              Did this as a solo project at home
              during co-op. Looking to eventually
              practice my software skills and
              launch an MVP.
            </div>
            <div className='md:ml-20 lg:ml-44 flex flex-col lg:flex-row border borderColour rounded p-4'>
              <div className='p-6'>
                <div className='font-bold 
                text-foreground 
                text-2xl'>
                  Duration
                </div>
                <div>
                  3 weeks
                </div>
              </div>
              <div className="p-6">
                <div className='font-bold
                text-foreground 
                text-2xl inline'>
                  My Team
                </div>
                <div >
                  Solo
                </div>
              </div>
              <div className="p-6">
                <div className='font-bold 
                text-foreground 
            text-2xl'>
                  Prototype
                </div>
                <div>
                  Link
                </div>
              </div>
            </div>

          </div>
          <div className='mt-24 md:mt-44 mb-20'>
            <h1 className="text-5xl">
            <span className='text-gradient'>✨</span> 001 // Background & Problem 
            </h1>
            <p className='text-2xl mt-16'>
              As a first-year student entering university, I anticipated
              encountering various challenges, but one unexpected hurdle
              was the <span className="text-gradient font-bold tracking-tighter">complexity of navigating Waterloo&apos;s sprawling campus.
              </span>

              <br></br>
              <br></br>
              With its maze-like paths and <span className="text-gradient font-bold tracking-tighter">
                confusing building layouts</span>,
              the University of Waterloo presented a daunting challenge for newcomers
              like myself. Adding to the confusion were navigation apps like Google Maps,
              which often provided <span className="text-gradient font-bold tracking-tighter">misleading building markers
              </span> and <span className="text-gradient font-bold tracking-tighter">lacked comprehensive
                reviews of campus amenities </span>. These apps also failed to alert users to
              <span className="text-gradient font-bold tracking-tighter"> accessibility
                issues</span> in study areas.
            </p>
          </div>
          <div className='flex  flex-col md:flex-row justify-center items-center'>
            <Image alt="floor plan of Hagey Hall - a waterloo building"
            src={floorPlan} className="h-[26rem]  md:w-[40rem] mb-12 md:mb-0 mx-4 rounded-md bg-primary object-cover" />
            <Image alt="waterloo campus scenary"
            src={campus} className="md:w-1/2 h-[26rem] rounded-md bg-primary object-cover" />

          </div>



          <div className='mt-44 mb-20'>
            <h1 className="text-5xl">
            <span className='text-gradient'>✨</span> 002 // Research & Ideation
            </h1>
            <p className='text-2xl mt-16'>
              I had two main questions I wanted answers to with my user research:

            </p>

            <div className='flex flex-col md:flex-row  justify-center items-center mt-16'>
              <div className='md:w-5/12 mb-12 md:mb-0 md:mr-12 flex border borderColour rounded p-12 md:p-14'>
                <p className='text-md md:text-xl mx-auto text-center mt-2'>
                  How <span className="text-gradient font-bold tracking-tighter">big</span> is the
                  navigation problem?
                </p>
              </div>
              <div className='md:w-5/12 flex border borderColour rounded p-12'>
                <p className=' text-md md:text-xl mx-auto text-center'>
                  What<span className="text-gradient font-bold tracking-tighter"> features</span>  should be prioritized given users&apos; needs?
                </p>
              </div>
            </div>
            <p className='text-2xl mt-32'>
              To figure out the answers to both of these, I decided to conduct research in a
            </p>
            <p className='text-4xl mt-6'>
              Three-Pronged Approach:
            </p>


            <div className='flex flex-col md:flex-row items-center justify-center mt-12'>
              <div className='list1 scale-up-more md:mb-0 mb-24 mx-20'>
                <div className='flex items-center justify-center flex-col'>
                  <Image alt="identify clipart"
                  src={identify} className="" />
                  <p className='text-center w-4/6 text-2xl font-bold mt-6'>
                    Identifying the Problem
                  </p>
                </div>
                <div className='flex items-center justify-center flex-col mt-2'>
                  <p className='text-center w-4/6 text-lg mt-4'>
                    Quantitative
                  </p>
                  <h1 className='text-center w-4/6 text-6xl mt-6'>
                    35
                  </h1>
                  <p className='text-center w-4/6 text-lg mt-2'>
                    Participants
                  </p>
                </div>
              </div>
              <div className='list2 scale-up-more md:mb-0 mb-24 mx-20'>
                <div className='flex items-center justify-center flex-col '>
                  <Image alt="specify clipart - thought bubble"
                  src={specify} className="" />
                  <p className='text-center w-5/6 text-2xl font-bold mt-6'>
                    Identifying specific challenges
                  </p>
                </div>
                <div className='flex items-center justify-center flex-col mt-2'>
                  <p className='text-center w-4/6 text-lg mt-4'>
                    Qualitative
                  </p>
                  <h1 className='text-center w-4/6 text-6xl mt-6'>
                    6
                  </h1>
                  <p className='text-center w-4/6 text-lg mt-2'>
                    Participants
                  </p>
                </div>
              </div>
              <div className='list3 scale-up-more mx-20'>
                <div className='flex items-center justify-center flex-col '>
                  <Image alt="rank clipart"
                  src={rank} className="" />
                  <p className='text-center w-5/6 text-2xl font-bold mt-6'>
                    Ranking the features                  </p>
                </div>
                <div className='flex items-center justify-center flex-col mt-2'>
                  <p className='text-center w-4/6 text-lg mt-4'>
                    Quantitative
                  </p>
                  <h1 className='text-center w-4/6 text-6xl mt-6'>
                    28
                  </h1>
                  <p className='text-center w-4/6 text-lg mt-2'>
                    Participants
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-40'>
              <div className='flex items-center '>
                <Image alt="identify clipart"
                src={identify} className="w-[7rem]" />
                <h1 className='font-bold ml-8 text-4xl'>
                  Identifying the Problem
                </h1>
              </div>
              <p className='text-2xl mt-6'>
                The reason behind conducting this early quantitative study is
                to measure the extent of the issue and determine its significance.
                By opting for a quantitative approach, I was able to reach a
                <span className="text-gradient font-bold tracking-tighter"> larger
                  sample size</span>, providing   <span className="text-gradient font-bold tracking-tighter">more conclusive and confident data.</span>

              </p>


              <div className='text-gray-500 text-lg hidden md:flex mt-16'>
                <h2 className='ml-12 mr-64'>
                  Question
                </h2>
                <h2 className="ml-16 md:ml-80">
                  Results
                </h2>
              </div>
              <div>
                <div className='w-full scale-up my-6 items-center flex flex-col md:flex-row border borderColour rounded p-12'>
                  <h1 className='md:mr-48 text-center md:text-left md:mb-0 mb-16 text-xl w-1/2'>
                    Given the resources available to you,
                    how confident are you in your ability to
                    navigate around campus effectively?
                  </h1>
                  <p className='w-1/3 text-lg text-center md:text-right'>
                    Very Confident,
                    Somewhat Confident, {" "}
                    <span className="text-gradient font-bold tracking-tighter">
                      Neutral,
                      Somewhat Unconfident</span>, Not Confident
                  </p>
                </div>

                <div className='w-full scale-up my-6 items-center flex flex-col md:flex-row border borderColour rounded p-12'>
                  <h1 className='md:mr-48 md:mb-0 mb-16 md:text-left text-center text-xl w-1/2'>
                    During first semester, how many times have you been
                    late to a class, meeting, or event because you couldn&apos;t
                    find the location on campus?
                  </h1>
                  <p className='w-1/3 text-4xl text-center md:text-right'>
                    At least <span className="text-gradient font-bold tracking-tighter">
                      once </span>
                  </p>
                </div>

                <div className='w-full scale-up my-6 items-center flex flex-col md:flex-row border borderColour rounded p-12'>
                  <h1 className='md:mr-48 md:mb-0 mb-16 md:text-left text-center text-xl w-1/2'>
                    Would you consider using an app that provides readily available navigation
                    information, including floor plans and recommended study spots?
                    (Yes/No/Not Sure)                  </h1>
                  <p className='w-1/3 text-4xl text-center md:text-right'>
                    <span className="text-gradient font-bold tracking-tighter">
                      77% {" "}
                    </span>
                    said yes
                  </p>
                </div>

                <div className='w-full scale-up my-6 items-center flex flex-col md:flex-row border borderColour rounded p-12'>
                  <h1 className='md:mr-48 md:text-left text-center md:mb-0 mb-16 text-xl w-1/2'>
                    Do you believe it would be better and easier for you than existing
                    options? (Yes/No/Not Sure)
                  </h1>
                  <p className='w-1/3 text-4xl md:text-right text-center'>
                    <span className="text-gradient font-bold tracking-tighter">
                      92% </span>
                    said yes
                  </p>
                </div>
              </div>
              <div className='flex flex-col md:flex-row justify-center mx-auto items-center mt-16'>
                <Image alt="convo clipart"
                src={convo} className="md:mb-0 mb-16 md:mr-72 w-[18rem]" />
                <p className='w-1/2 md:w-1/4 text-2xl text-center'>
                  During their first year, the{" "}
                  <span className="text-gradient font-bold tracking-tighter">
                    majority {" "}
                  </span>
                  of individuals relied on {" "}
                  <span className="text-gradient font-bold tracking-tighter">
                    asking their friends {" "}
                  </span>
                  for navigation assistance.
                </p>
              </div>
            </div>

            <div className='mt-40'>
              <div className='flex items-center '>
                <Image alt="specify clipart - thought bubble"
                src={specify} className="w-[7rem]" />
                <h1 className='font-bold ml-8 text-4xl'>
                  Identifying Specific Problems
                </h1>
              </div>
              <p className='text-2xl mt-6'>
                With the problem having now been validated as a real problem, I then
                conducted {" "}
                <span className="text-gradient font-bold tracking-tighter">
                  6 moderated interviews/coffee chats</span> with students who fit
                my persona. I had one simple question...
              </p>
              <div className='flex flex-col lg:flex-row mt-20 mx-auto items-center'>
                <Image alt="miro board clipart"
                src={miro} className="lg:ml-12 h-[30rem] md:w-[46rem]
                 mb-12 md:mb-0 mx-28
              rounded-md flex-col md:flex-row object-cover" />

                <p className='md:w-1/3 mt-16 lg:mt-0 text-2xl text-center lg:text-4xl flex-col lg:flex-row font-light mt-6 lg:text-right'>
                  Considering the resources available to you right now,
                  what {" "}
                  <span className="text-gradient font-bold tracking-tighter">
                    features </span>
                  would you desire on the app to enhance your
                  campus experience?
                </p>
              </div>
              <div className=''>
                <p className='text-2xl mt-24'>
                  I took notes of all the features people brought up on a {' '}
                  <span className="text-gradient font-bold tracking-tighter">
                    Miro board </span> and created an {" "}
                  <span className="text-gradient font-bold tracking-tighter">
                    affinity map </span> of common themes. Here are all the features participants mentioned at
                  least twice:
                </p>
                <Image alt="notes of different problems people identified"
                src={notes} className="mx-auto w-5/6 mt-24 
              rounded-md object-cover" />

              </div>
            </div>

            <div className='mt-40'>
              <div className='flex items-end'>
                <Image alt="rank clipart"
                src={rank} className="w-[7rem]" />
                <h1 className='font-bold ml-8 text-4xl'>
                  Ranking Potential Features
                </h1>
              </div>
              <div>
                <p className='text-2xl mt-24'>
                  My last study had participants rank features they would want.
                  I had a {" "}
                  <span className="text-gradient font-bold tracking-tighter">
                    google form </span> set up which had participants rank each of the above
                  stickys 1-11. First place would get 11 points, second place - 10 points,
                  3rd - 9 points, etc.

                  <br></br>
                  <br></br>It is important to note that {" "}
                  <span className="text-gradient font-bold tracking-tighter">
                    accessibility features {" "}
                  </span>
                  which are on the blue
                  sticky notes were disregarded from the ranking process, as they are essential
                  components irrespective of participant preferences.
                  <br></br>
                  <br></br>
                  Here are the results:

                </p>
              </div>
              <div className='flex flex-col md:flex-row items-center'>
                <div className='mt-16'>
                  <div className='flex my-6 items-center'>
                    <div>
                      <p className='mx-11 font-bold text-5xl'>
                        1
                      </p>
                    </div>
                    <div>
                      <p className='w-2/3 text-2xl'>
                        Finding classrooms
                        and lecture halls for classes
                      </p>
                    </div>
                  </div>
                  <div className="flex my-6 items-center">
                    <div> <p className='mx-10 font-bold text-5xl'>
                      2
                    </p>
                    </div>
                    <div>
                      <p className='w-2/3 text-2xl '>
                        Identifying suitable study
                        areas on campus
                      </p>
                    </div>
                  </div>
                  <div className='flex my-6 items-center'>
                    <div>
                      <p className='mx-10 font-bold text-5xl'>
                        3
                      </p>
                    </div>
                    <div>
                      <p className='w-2/3 text-2xl'>
                        Receiving updates on campus
                        construction, closures, events, etc.
                      </p>
                    </div>
                  </div>
                  <div className="flex my-6 items-center">
                    <div>
                      <p className='mx-10 font-bold text-5xl'>
                        4
                      </p>
                    </div>
                    <div>
                      <p className='w-2/3 text-2xl'>
                        Finding what in the
                        campus is open late (food, buildings,
                        etc.)
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-16 md:mt-0'>
                  <Image alt="mountain clipart"
                  src={mountain} className="w-[20rem]" />
                </div>
              </div>

              <div className=' mt-32 '>
                <h1 className='font-bold text-4xl'>
                  Competitive Analysis
                </h1>
                <p className='text-2xl mt-16'>
                  It is very important to see what is already out there to check if
                  similar services {" "}
                  <span className="text-gradient font-bold tracking-tighter">
                    already exist in the market. {" "}</span>
                  Studying existing solutions
                  can provide valuable inspiration for our my own design journey as well.

                </p>
                <div className='mt-32'>
                  <div className='mx-auto justify-center flex flex-col md:flex-row items-center'>
                    <Image alt="image of existing compeititor apps - google maps, apple maps, waterloo online map"
                    src={existing} className="w-[24rem]" />
                    <p className='mt-16 md:mt-0 md:ml-32 text-center md:text-right text-xl w-5/12'>
                      The Waterloo online map, the sole
                      option for personalized campus navigation, falls significantly
                      short when measured against the interactive maps offered by other universities.
                      For example, here is our map compared to Queen&apos;s.
                    </p>
                  </div>

                  <div className='mt-16 mx-auto justify-center flex flex-col md:flex-row items-center'>
                    <p className='mb-16 md:mb-0 md:mr-32 text-center md:text-left text-xl w-5/12'>
                      Similar services in other univeristies&apos; offer us
                      a lot of different USPs to incorporate into our own
                      design (e.g. MacQuest&apos;s floor navigation!)
                    </p>
                    <Image alt="apps other universities offer: Mcmaaster, UofT, and Queen's map apps"
                    src={otherUni} className="w-[24rem]" />

                  </div>
                </div>


              </div>


            </div>
          </div>

          <div className='mt-44 mb-20'>
            <h1 className="font-bold text-5xl">
            <span className='text-gradient'>✨</span> 003 // The Designing Process
            </h1>
            <p className='text-2xl mt-16'>
              The first step was to develop a design system, a crucial step for maintaining
              consistency and establishing a cohesive theme throughout the application. This system
              provides clear guidelines on colors, components, and fonts, ensuring a unified vision
              across the project.
            </p>
            <h1 className="font-bold text-3xl mt-16">
              Design System and Brand Creation
            </h1>
            <p className='text-2xl mt-6'>
              In selecting the primary colors for my app, I opted for white, blue, and red.
              Blue, being a calming and universally recognized color often associated with
              navigation, aligns perfectly with the app&apos;s purpose. During designing, I will make
              sure to adhere to the 60/30/10 rule (60% primary colour, 30% secondary,
              10% tertiary) as this ensures a balanced and visually appealing design.
            </p>
            <h1 className="font-bold text-3xl mt-16 mb-6">
              Colours
            </h1>
            <Image alt="design system colours"
            src={colours} className="w-full" />
            <div className='my-16 mx-auto'>
              <Image alt="design system typography"
              src={typography} className="w-full" />
              <p className='text-2xl mt-10 text-center'>
                I chose the Blinker font for its modern and clean aesthetic, which gives off a sense of
                friendliness that aligns well with the overall tone that I am aiming to go for.
              </p>
            </div>
            <h1 className="font-bold text-3xl mt-32">
              Logo and Name
            </h1>
            <p className='text-2xl mt-6'>
              The logos needed to be simplistic to ensure they could be scaled
              down without losing their recognizability. After a couple of iterations,
              these are what I ended up going with:
            </p>
            <div className='mt-12 mx-auto items-center justify-center'>
              <Image alt="design system for logos"
              src={logos} className="w-full" />
            </div>
            <h1 className="font-bold text-4xl mt-32">
              Information Architecture
            </h1>
            <p className='text-2xl mt-6'>
              The next step involved establishing the information
              architecture of the app. In essence, this diagram provides a
              layout of where each page is located, aligning with the primary purposes
              we&apos;ve outlined through our user research.
              For a more detailed version of the image displayed below, you
              can access the Miro Board by clicking <a
                href="https://miro.com/app/board/uXjVKYtlv9E=/?share_link_id=641909903582"
                target="_blank" rel="noopener noreferrer"
                className="text-gradient 
             transition-colors hover:text-yellow-500">here.</a>

            </p>
            <a
              href="https://miro.com/app/board/uXjVKYtlv9E=/?share_link_id=641909903582"
              target="_blank" rel="noopener noreferrer">
              <Image alt="information architecture"
              src={infoarch} className="w-full gray-overlay scale-up mt-16" />
            </a>

            <h1 className="font-bold text-4xl mt-32">
              Low & High-Fidelity Wireframes
            </h1>
            <p className='text-2xl mt-6'>
              Time to actually start designing! To quickly visualize and have something
              tangible, I usually grab a piece of paper and start creating an low-fidelity
              wireframes. For UW Maps, I started off by creating very basic sketches of each of
              the initial pages of all my navigation options.
              <br></br>
              <br></br>
              Then, I decided to make slightly higher fidelity wireframes of the saved locations and
              main explore tab. These are much easier to change and reiterate than actual designs.
            </p>
            <Image alt="low fidelity wireframes"
            src={wireframes} className="w-full mt-16" />
            <h1 className="font-bold text-5xl mt-32">
            <span className='text-gradient'>✨</span> 004 // Final Designs
            </h1>
            <Gradient />
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
            <Image alt="final images"
            src={final1 as string} className="w-full mt-16 opacity-60 transition-opacity duration-500 ease-in-out transform hover:opacity-100" />
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
            <Image alt="final images"
            src={final2 as string} className="w-full mt-16 opacity-60 transition-opacity duration-500 ease-in-out transform hover:opacity-100" />
            <Image alt="final images"
            src={final3 as string} className="w-full mt-16 opacity-60 transition-opacity duration-500 ease-in-out transform hover:opacity-100" />
          </div>

          <h1 className='mb-16'>This is Project 1</h1>
          {/* Add content for Project 1 here */}
        </Container>
      </div >


    </section >
  );
};

export default UwMaps;


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