import React, { useEffect, useRef } from 'react';
import { TECH_ITEMS } from '../constants';
import { TechItem } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SiReact, 
  SiNextdotjs, 
  SiVuedotjs, 
  SiNuxt, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiChartdotjs, 
  SiGraphql, 
  SiFirebase 
} from 'react-icons/si';
import { Code } from 'lucide-react';

// Map icon keys to components
const IconMap: Record<string, React.ElementType> = {
  Atom: SiReact, 
  Zap: SiNextdotjs, 
  Layout: SiVuedotjs, 
  Mountain: SiNuxt, 
  FileCode: SiTypescript, 
  Code: SiJavascript, 
  Wind: SiTailwindcss, 
  BarChart3: SiChartdotjs, 
  Network: SiGraphql, 
  Flame: SiFirebase
};

const Skills: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Duplicate items for seamless loop
  const topRow = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];
  const bottomRow = [...TECH_ITEMS.reverse(), ...TECH_ITEMS, ...TECH_ITEMS];

  useEffect(() => {
    let xPercent = 0;
    let direction = -1;

    const animate = () => {
      if (xPercent <= -100) {
        xPercent = 0;
      }
      if (xPercent > 0) {
        xPercent = -100;
      }
      
      // Basic movement
      gsap.set(row1Ref.current, { xPercent: xPercent });
      gsap.set(row2Ref.current, { xPercent: -xPercent - 100 }); // Reverse direction
      
      xPercent += 0.05 * direction;
      requestAnimationFrame(animate);
    };
    
    // Start base animation loop
    const rafId = requestAnimationFrame(animate);

    // Velocity-based skew and speed adjustment
    const ctx = gsap.context(() => {
        ScrollTrigger.create({
            trigger: marqueeRef.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                const skew = velocity / 200; // Adjust sensitivity
                const speedScale = 1 + Math.abs(velocity / 1000); // Speed up on scroll

                // Apply skew to container
                gsap.to([row1Ref.current, row2Ref.current], {
                    skewX: skew,
                    duration: 0.2,
                    ease: "power3.out"
                });
                
                // Note: Changing the actual animation speed frame-by-frame is complex in this setup, 
                // so we rely on the visual skew for the physics feeling.
            }
        });
    }, marqueeRef);

    return () => {
        cancelAnimationFrame(rafId);
        ctx.revert();
    };
  }, []);

  return (
    <section id="skills" className="py-32 bg-background relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10 pointer-events-none"></div>
      
      <div className="mb-20 container mx-auto px-6 md:px-12 relative z-20">
        <div className="flex items-center gap-4">
             <span className="text-xs font-mono uppercase text-secondary border border-white/10 rounded-full px-3 py-1 tracking-widest bg-background/50 backdrop-blur-md">
                03 / Tech Stack
             </span>
             <div className="h-[1px] flex-grow bg-white/10"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-8 tracking-tighter">
            ARSENAL
        </h2>
      </div>

      <div ref={marqueeRef} className="flex flex-col gap-8 rotate-[-2deg] scale-[1.05] py-10">
        
        {/* Row 1 */}
        <div className="relative flex overflow-hidden w-full">
          <div ref={row1Ref} className="flex items-center gap-6 pl-6 w-max will-change-transform">
            {topRow.map((tech, i) => (
              <TechCard key={`${tech.name}-top-${i}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative flex overflow-hidden w-full">
          <div ref={row2Ref} className="flex items-center gap-6 pl-6 w-max will-change-transform">
            {bottomRow.map((tech, i) => (
              <TechCard key={`${tech.name}-bottom-${i}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TechCard: React.FC<{ tech: TechItem }> = ({ tech }) => {
    const Icon = IconMap[tech.icon] || Code; // Fallback to Code icon

    return (
        <div className="group relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center transition-all duration-500 hover:border-white/20 hover:bg-white/[0.08] hover:scale-105 overflow-hidden">
            
            {/* Grid Pattern in Card Background */}
            <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '8px 8px' }}
            ></div>

            {/* Icon */}
            <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                <Icon 
                    size={48} 
                    className="text-white/40 group-hover:text-white transition-colors duration-300"
                />
            </div>

            {/* Label Reveal */}
            <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                    {tech.name}
                </span>
            </div>
            
            {/* Decorative Corners */}
            <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
};

export default Skills;