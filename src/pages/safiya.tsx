import React from 'react';


import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
} from "lucide-react";

import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
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
import finalMain from '@/images/finalmain.svg';


import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";




const UwMaps = () => {
  return (
    <section
      id="home"
      data-scroll-section
      className="my-24 flex w-full flex-col mx-auto items-center  xl:min-h-screen justify-center"
    >
      <div className={styles.intro}>
        <Container>
          <div className='ml-[32rem] my-[20rem] justify-center mx-auto'>
          <h1
          className='text-6xl'>I love my gf Safiya ❤️</h1>
          </div>
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