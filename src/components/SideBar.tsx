import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaHouse, FaCircleDollarToSlot } from 'react-icons/fa6';

const SideBar: React.FC = () => {

  const [showButtonName, setShowButtonName] = useState('');

  return (
    <motion.div
        className='fixed flex flex-col self-start min-w-12 min-h-screen justify-center gap-24 pl-6'
    >
        <Link to='Home' className='flex flex-row items-center'>
            <motion.button
                onMouseEnter={() => setShowButtonName('Home')}
                onMouseLeave={() => setShowButtonName('')}
                className='flex flex-row items-center justify-center gap-4'
            >
                    <FaHouse size={24}/>
                {showButtonName === 'Home' && <p>Home</p>}
            </motion.button>
        </Link>

        <Link to='Campaigns' className='flex flex-row items-center'>
            <motion.button
                onMouseEnter={() => setShowButtonName('Campaigns')}
                onMouseLeave={() => setShowButtonName('')}
                className='flex flex-row items-center justify-center gap-4'
            >
                    <FaCircleDollarToSlot size={24}/>
                {showButtonName === 'Campaigns' && <p>Campaigns</p>}
            </motion.button>
        </Link>

        <motion.button>
            <Link to=''>
            
            </Link>
        </motion.button>
    </motion.div>
  )
}

export default SideBar;