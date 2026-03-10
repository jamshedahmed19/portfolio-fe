import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import Magnetic from './ui/Magnetic';
import HangingBadge from './ui/HangingBadge';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="min-h-screen flex flex-col justify-between px-6 md:px-12 pt-12 md:pt-20 pb-6 relative bg-background overflow-hidden">
      
      {/* Header with border-b */}
      <div className="w-full border-b border-white/10 pb-8 relative z-20">
         <span className="text-xs font-mono uppercase text-secondary border border-white/10 rounded-full px-3 py-1 bg-background">
            04 / Contact
         </span>
      </div>

      {/* Badge Container - Starts right below the border */}
      <div className="flex flex-col items-center flex-grow relative z-10 w-full">
        
        {/* Interactive Badge */}
        <div className="relative w-full flex justify-center h-[650px]">
            <HangingBadge />
        </div>
        
        <div className="mt-4 z-20">
            <Magnetic>
                <a 
                href="mailto:jamsheda4ahmed786@gmail.com" 
                className="px-8 py-4 border border-white/20 rounded-full text-white font-mono uppercase text-xs tracking-wider hover:bg-white hover:text-black transition-colors duration-300 inline-block backdrop-blur-sm bg-black/20"
                >
                jamsheda4ahmed786@gmail.com
                </a>
            </Magnetic>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end gap-10 relative z-10 mt-10">
        <div className="flex gap-8">
          {SOCIAL_LINKS.map((link) => (
             <Magnetic key={link.platform} strength={0.5}>
                <a 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white transition-colors text-xs uppercase font-mono tracking-wider flex items-center gap-2"
                >
                    <i className={link.iconClass}></i>
                    {link.platform}
                </a>
             </Magnetic>
          ))}
        </div>
        
        <div className="flex flex-col items-end gap-1">
             <p className="text-secondary text-xs font-mono">
            © {new Date().getFullYear()} Jamshed Ahmed
            </p>
            <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest">
                Designed & Developed
            </p>
        </div>
      </div>

        {/* Ambient background light */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-t from-white/[0.05] to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Contact;