import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion';

import Logo from '../assets/crowdlink_logo.png';
import { enterBottom } from '../utils/animations';

export const About = () => {

  const aboutRef = useRef(null);
  const aboutIsInView = useInView(aboutRef, {margin:'0px'});

  return (
    <motion.div className="flex flex-row justify-center mt-[18vh] mx-[40vh] text-lg text-black text-justify items-center ubuntu-sans"
          variants={enterBottom}
          ref={aboutRef}
          initial="before"
          animate={aboutIsInView && "after"}
        >
        <img src={Logo} alt="Logo" width={240} height={240}/>
        <p>
          <strong>Welcome to <span>CrowdLink</span></strong>, where <strong><em>transparency meets innovation</em></strong> in crowdfunding. 
          <strong> Powered by blockchain technology</strong>, CrowdLink ensures every transaction is 
          <strong><em> secure, transparent, and immutable</em></strong>. Whether you're a project creator or a backer, our platform provides the 
          <strong><em> trust and accountability</em></strong> you need to confidently engage in the world of crowdfunding. 
          Join us and <strong><span>experience the future of fundraising</span></strong> with <span>CrowdLink</span>.
        </p>
        </motion.div>
  )
}
