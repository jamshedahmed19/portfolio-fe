import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Lenis
    // @ts-ignore
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smoothWheel: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    // Expose lenis to window for Navigation component
    // @ts-ignore
    window.lenis = lenis;

    // Synchronize Lenis with GSAP Ticker
    lenis.on('scroll', ScrollTrigger.update);

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    
    return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        // @ts-ignore
        window.lenis = null;
    }
  }, [isLoading]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background text-primary selection:bg-white selection:text-black cursor-none font-sans">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
            <Navigation />
            <main className="relative z-10 w-full">
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Skills />
            </main>
            <Contact />
        </>
      )}
      
      {/* Animated Noise Texture Overlay */}
      <div className="fixed inset-0 z-[40] pointer-events-none opacity-[0.035] mix-blend-overlay">
        <div className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] w-[200%] h-[200%] animate-noise"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
      </div>
    </div>
  );
}

export default App;