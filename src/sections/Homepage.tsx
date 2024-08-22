import { delay, motion } from 'framer-motion'
import React from 'react'
import handTop from '../assets/handtop.png';
import handBottom from '../assets/handbottom.png';
import { Link } from 'react-scroll';

const enterLeft = {
  before: {
    x: -100,
    opacity: 0,
  },
  after: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    }
  },
};

const enterRight = {
  before: {
    x: 100,
    opacity: 0,
  },
  after: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    }
  },
};

const fadeIn = {
  before: {
      opacity: 0,
  },
  after: {
      opacity: 1,
      transition: {
          delay: 1,
          duration: 1,
          staggerChildren: 0.1,
      }
  },
};

export const Homepage = () => {
  return (
    <div className='w-full min-h-screen justify-center self-center items-center flex flex-col'>
        <motion.img src={handTop} alt="HandTop" 
          variants={enterRight}
          initial="before"
          animate="after"
          sizes='100vw'
          drag={false}
          className='absolute -z-[1] grayscale'
        />
        <motion.img src={handBottom} alt="HandBottom"
          variants={enterLeft}
          initial="before"
          animate="after"
          sizes='100vw'
          drag={false}
          className='absolute -z-[1] grayscale'
        />
        <Link to='ViewCampaigns' smooth={true} duration={1000}>
          <motion.div
            variants={fadeIn}
            initial="before"
            animate="after"
            className='flex flex-col items-center justify-center min-h-screen w-full gap-y-5'
          >
            <h1 className='text-7xl font-bold'>CrowdLink</h1>
            <button className="px-7 py-3 border rounded-lg border-gray-600 text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all">
                Get Started
            </button>
          </motion.div>
        </Link>
    </div>
  )
}
