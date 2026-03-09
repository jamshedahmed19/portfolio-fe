import React, { useEffect, useRef } from 'react';
import Section from './ui/Section';
import { EDUCATION } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.word');
      
      if (words) {
        gsap.fromTo(words, 
          { opacity: 0.1, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.02,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 60%",
              scrub: 1,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const paragraph = "I build digital products with a focus on motion, interaction, and performance. With over 3 years of hands-on experience, I specialize in the JavaScript ecosystem—primarily React, Next.js, and Vue. My approach is engineering-first but design-driven. I don't just implement designs; I enhance them with fluid interactions and solid architecture.";
  const words = paragraph.split(" ");

  return (
    <Section id="about" className="bg-background">
      <div ref={containerRef} className="flex flex-col md:flex-row gap-12 md:gap-24 relative">
        <div className="w-full md:w-[20%]">
          <span className="sticky top-24 text-[10px] font-mono uppercase text-secondary border border-white/10 rounded-full px-3 py-1 inline-block tracking-widest">
            01 / About
          </span>
        </div>
        
        <div className="w-full md:w-[80%]">
          <p 
            ref={textRef}
            className="text-2xl md:text-5xl font-light leading-[1.3] flex flex-wrap gap-x-3 gap-y-1 text-white"
          >
            {words.map((word, i) => (
              <span key={i} className="word inline-block relative">{word}</span>
            ))}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24 pt-12 border-t border-white/10">
            <div>
              <h3 className="text-xs font-mono uppercase text-secondary mb-6 tracking-widest">Current Focus</h3>
               <p className="text-secondary/80 leading-relaxed font-light">
                Currently creating high-performance web applications at eSpark Consultants. I'm obsessed with optimizing Web Vitals, cutting bundle sizes, and building accessible design systems.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase text-secondary mb-6 tracking-widest">Education</h3>
              <div className="group">
                <h3 className="text-white font-display text-2xl mb-2 font-bold">{EDUCATION.degree}</h3>
                <p className="text-sm font-mono text-secondary">{EDUCATION.school}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;