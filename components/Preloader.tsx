import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const words = ["HELLO", "BONJOUR", "SALUT", "HOLA", "GUTEN TAG", "CIAO", "NAMASTE"];

const Preloader: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index == words.length - 1) return;
    setTimeout(() => {
      setIndex(index + 1);
    }, 140);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.3 }
    }
  }

  return (
    <motion.div
      variants={{
        initial: { top: 0 },
        exit: { top: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.2 } }
      }}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#141516]"
    >
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex text-white text-4xl md:text-6xl items-center font-display font-bold z-10"
      >
        <span className="block w-3 h-3 bg-white rounded-full mr-4"></span>
        {words[index]}
      </motion.p>
      
      <svg className="absolute top-0 w-full h-[calc(100%+300px)] pointer-events-none fill-[#141516]">
        <motion.path 
          variants={curve} 
          initial="initial" 
          exit="exit" 
        ></motion.path>
      </svg>
    </motion.div>
  );
};

export default Preloader;