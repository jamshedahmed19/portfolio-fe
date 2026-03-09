import React, { useEffect, useRef } from 'react';
import Section from './ui/Section';
import { EXPERIENCE_DATA } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    Atom, 
    Database, 
    Shield, 
    Zap, 
    FileCode, 
    Layout, 
    Mountain, 
    BarChart3, 
    Key, 
    Network,
    Code,
    Globe
} from 'lucide-react';

const getSkillIcon = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes('react')) return <Atom size={12} />;
    if (s.includes('vue') || s.includes('layout')) return <Layout size={12} />;
    if (s.includes('nuxt')) return <Mountain size={12} />;
    if (s.includes('data') || s.includes('query')) return <Database size={12} />;
    if (s.includes('auth') || s.includes('oauth') || s.includes('security')) return <Key size={12} />;
    if (s.includes('rbac') || s.includes('access')) return <Shield size={12} />;
    if (s.includes('perform') || s.includes('optimiz')) return <Zap size={12} />;
    if (s.includes('chart') || s.includes('visual')) return <BarChart3 size={12} />;
    if (s.includes('graph') || s.includes('network') || s.includes('api')) return <Network size={12} />;
    if (s.includes('type') || s.includes('script') || s.includes('cms')) return <FileCode size={12} />;
    if (s.includes('i18n') || s.includes('translation')) return <Globe size={12} />;
    return <Code size={12} />;
};

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.exp-item');
      items.forEach((item: any) => {
        gsap.fromTo(item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="experience" className="bg-background">
      <div ref={containerRef} className="flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* Sticky Left Column */}
        <div className="w-full md:w-1/3">
           <div className="sticky top-24">
              <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 tracking-tighter">
                WORK<br/>HISTORY
              </h2>
              <div className="w-12 h-0.5 bg-white/20 mb-8"></div>
              <p className="text-secondary text-sm max-w-xs leading-relaxed font-light">
                A selection of my recent roles contributing to high-performance web applications and scalable architectures.
              </p>
              
              <div className="mt-12 hidden md:block">
                  <span className="text-[10px] font-mono uppercase text-secondary border border-white/10 rounded-full px-3 py-1 tracking-widest">
                    3+ Years Experience
                  </span>
              </div>
           </div>
        </div>

        {/* Scrolling Right Column */}
        <div className="w-full md:w-2/3">
          <div className="flex flex-col gap-20">
            {EXPERIENCE_DATA.map((exp) => (
              <div 
                key={exp.id}
                className="exp-item group border-t border-white/10 pt-12"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4 mb-6">
                   <h3 className="text-3xl md:text-4xl font-display font-semibold text-white group-hover:text-white transition-colors">
                      {exp.company}
                    </h3>
                    <span className="font-mono text-xs text-secondary border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                       {exp.period}
                    </span>
                </div>
                
                <div className="flex flex-col mb-8">
                     <h4 className="text-lg md:text-xl text-white/80 mb-1 font-light">{exp.role}</h4>
                     <p className="text-xs font-mono text-secondary uppercase tracking-widest">{exp.location}</p>
                </div>

                <ul className="space-y-3 mb-8">
                    {exp.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-secondary group-hover:text-primary transition-colors duration-300 leading-relaxed text-[15px] font-light">
                            <span className="mt-2.5 w-1 h-1 rounded-full bg-white/40 shrink-0"></span>
                            {point}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (
                        <span key={skill} className="flex items-center gap-1.5 text-[10px] font-mono uppercase border border-white/10 px-3 py-1.5 text-secondary/80 rounded-full hover:bg-white/10 hover:text-white transition-all cursor-default tracking-wider hover:border-white/30 bg-white/5">
                            {getSkillIcon(skill)}
                            {skill}
                        </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Experience;