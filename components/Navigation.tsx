import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import Magnetic from './ui/Magnetic';

const Navigation: React.FC = () => {
  const [active, setActive] = useState('');
  const navRef = useRef<HTMLDivElement>(null);
  
  // Spotlight effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Create a gradient that follows the mouse
  const background = useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 80%)`;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActive(href);
    
    // @ts-ignore
    if (typeof window !== 'undefined' && window.gtag) {
      // @ts-ignore
      window.gtag('event', 'click', {
        'event_category': 'navigation',
        'event_label': `Nav: ${href}`
      });
    }

    const targetElement = document.querySelector(href);
    
    // @ts-ignore
    if (window.lenis && targetElement) {
      // @ts-ignore
      window.lenis.scrollTo(targetElement);
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      if (!navRef.current) return;
      const { left, top } = navRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
  }

  return (
    <div className="fixed top-6 md:top-8 left-0 right-0 flex justify-center z-[100] pointer-events-none">
      <motion.nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto group relative flex items-center gap-1 p-1.5 bg-[#0a0a0a]/70 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Spotlight Overlay */}
        <motion.div 
            className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background }}
        />

        {NAV_ITEMS.map((item) => (
           <Magnetic key={item.label} strength={0.2}>
                <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="relative px-5 py-2.5 text-xs md:text-sm font-medium text-gray-400 transition-colors hover:text-white rounded-full"
                >
                    <span className="relative z-10 text-[10px] md:text-xs uppercase tracking-widest">{item.label}</span>
                    
                    {/* Active State */}
                    {active === item.href && (
                        <motion.span 
                            layoutId="nav-bg"
                            className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}

                    {/* Hover Glow */}
                    <span className="absolute inset-0 rounded-full bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                </a>
           </Magnetic>
        ))}
        
        <div className="w-[1px] h-4 bg-white/10 mx-2"></div>
        
        <Magnetic strength={0.4}>
            <a 
            href="/resume.pdf" 
            target="_blank"
            onClick={() => {
              // @ts-ignore
              if (typeof window !== 'undefined' && window.gtag) {
                // @ts-ignore
                window.gtag('event', 'download', {
                  'event_category': 'resume',
                  'event_label': 'Resume Download'
                });
              }
            }}
            className="px-6 py-2.5 text-[10px] md:text-xs uppercase tracking-widest font-bold text-black bg-white rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 block relative overflow-hidden group/btn"
            >
                <span className="relative z-10">Resume</span>
                {/* Button Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"></div>
            </a>
        </Magnetic>
      </motion.nav>
    </div>
  );
};

export default Navigation;