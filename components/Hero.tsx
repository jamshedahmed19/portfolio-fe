import React, { useEffect, useRef } from 'react';
import Magnetic from './ui/Magnetic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const wrapperRef1 = useRef<HTMLDivElement>(null);
  const wrapperRef2 = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial Entrance
      tl.from(metaRef.current, { y: -20, opacity: 0, duration: 1, delay: 2 })
        .from([textRef1.current, textRef2.current], { 
          y: '100%', 
          opacity: 0, 
          duration: 1.5, 
          stagger: 0.2,
          ease: 'power4.out'
        }, "-=0.5")
        // Remove overflow hidden after entrance to allow parallax without clipping
        .set([wrapperRef1.current, wrapperRef2.current], { overflow: 'visible' })
        .from(footerRef.current, { y: 20, opacity: 0, duration: 1 }, "-=1");

      // Parallax Effect
      gsap.to(textRef1.current, {
        y: 150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(textRef2.current, {
        y: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    const aboutSection = document.getElementById('about');
    // @ts-ignore
    if (window.lenis && aboutSection) {
      // @ts-ignore
      window.lenis.scrollTo(aboutSection);
    } else {
      aboutSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center bg-background overflow-hidden px-4 md:px-8">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
               backgroundSize: '8vw 8vw'
             }}>
        </div>

      <div className="container mx-auto relative z-10 h-full flex flex-col justify-center">
        
        {/* Top Meta Data */}
        <div ref={metaRef} className="absolute top-6 right-0 md:top-12 md:right-0 flex flex-col items-end gap-2 text-right z-20 opacity-1 pr-4 md:pr-0">
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
             <p className="text-white font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">Available for Freelance</p>
          </div>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">Based in Karachi, PK</p>
        </div>

        {/* Main Typography */}
        <div className="relative z-0 flex flex-col justify-center w-full mix-blend-exclusion select-none">
          <div ref={wrapperRef1} className="overflow-hidden">
            <h1 ref={textRef1} className="clamp-text-hero leading-[0.8] font-display font-extrabold text-white tracking-tighter">
              JAMSHED
            </h1>
          </div>
          
          <div ref={wrapperRef2} className="overflow-hidden self-end mt-[-2vw] md:mt-[-3vw]">
             <h1 ref={textRef2} className="clamp-text-hero leading-[0.8] font-display font-extrabold text-transparent text-stroke tracking-tighter text-right">
              AHMED
            </h1>
          </div>
        </div>

        <div ref={footerRef} className="absolute bottom-12 left-0 w-full flex flex-col md:flex-row justify-between items-end z-20 pointer-events-none px-4 md:px-0 opacity-1">
             <div className="max-w-md mb-8 md:mb-0 pointer-events-auto">
                <p className="text-xs md:text-sm text-white/60 leading-relaxed font-mono tracking-wide uppercase">
                Senior Frontend Engineer.<br/>
                Crafting digital perfection.
                </p>
            </div>
          
            <div className="pointer-events-auto">
                <Magnetic strength={0.3}>
                    <button 
                        onClick={handleScroll} 
                        className="group flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 hover:border-white transition-colors duration-500 bg-transparent relative overflow-hidden"
                        aria-label="Scroll to content"
                    >
                        <span className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></span>
                        <i className="ri-arrow-down-line text-2xl text-white group-hover:text-black relative z-10 transition-colors duration-500"></i>
                    </button>
                </Magnetic>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;