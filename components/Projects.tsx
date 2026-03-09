import React, { useRef, useState, useEffect } from 'react';
import Section from './ui/Section';
import { PROJECT_DATA } from '../constants';
import gsap from 'gsap';

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // GSAP QuickTo for performant mouse following
  const xMoveCursor = useRef<any>(null);
  const yMoveCursor = useRef<any>(null);
  const xMoveLabel = useRef<any>(null);
  const yMoveLabel = useRef<any>(null);

  useEffect(() => {
    // Initialize QuickTo functions
    if (cursorRef.current && cursorLabelRef.current) {
      xMoveCursor.current = gsap.quickTo(cursorRef.current, "left", { duration: 0.5, ease: "power3" });
      yMoveCursor.current = gsap.quickTo(cursorRef.current, "top", { duration: 0.5, ease: "power3" });
      xMoveLabel.current = gsap.quickTo(cursorLabelRef.current, "left", { duration: 0.45, ease: "power3" });
      yMoveLabel.current = gsap.quickTo(cursorLabelRef.current, "top", { duration: 0.45, ease: "power3" });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    // Update cursor position
    xMoveCursor.current(clientX);
    yMoveCursor.current(clientY);
    xMoveLabel.current(clientX);
    yMoveLabel.current(clientY);
  };

  // Generate abstract UI skeletons based on project ID/Type
  const renderPreview = (id: string | null) => {
    if (!id) return null;

    // Dashboard Layout (Analytics)
    if (id === 'proj-2') {
        return (
            <div className="w-full h-full flex flex-col gap-2 p-3">
                <div className="flex gap-2 h-1/3">
                    <div className="w-1/3 bg-blue-500/20 rounded animate-pulse"></div>
                    <div className="w-1/3 bg-purple-500/20 rounded animate-pulse delay-75"></div>
                    <div className="w-1/3 bg-emerald-500/20 rounded animate-pulse delay-150"></div>
                </div>
                <div className="flex gap-2 h-2/3">
                    <div className="w-2/3 bg-white/5 rounded animate-pulse delay-100 flex items-end p-2 gap-1">
                         <div className="w-full bg-white/10 h-[40%] rounded-t"></div>
                         <div className="w-full bg-white/10 h-[70%] rounded-t"></div>
                         <div className="w-full bg-white/10 h-[50%] rounded-t"></div>
                         <div className="w-full bg-white/10 h-[80%] rounded-t"></div>
                    </div>
                    <div className="w-1/3 bg-white/5 rounded animate-pulse delay-200"></div>
                </div>
            </div>
        );
    }

    // E-Commerce / Listing (AutoMarket)
    if (id === 'proj-1') {
        return (
            <div className="w-full h-full p-3 flex flex-col gap-2">
                 <div className="w-full h-8 bg-white/10 rounded flex items-center px-2 gap-2">
                     <div className="w-4 h-4 rounded-full bg-white/20"></div>
                     <div className="w-20 h-2 bg-white/10 rounded"></div>
                 </div>
                 <div className="grid grid-cols-2 gap-2 h-full">
                      <div className="bg-red-500/10 rounded h-24 w-full animate-pulse"></div>
                      <div className="bg-red-500/10 rounded h-24 w-full animate-pulse delay-75"></div>
                      <div className="bg-red-500/10 rounded h-24 w-full animate-pulse delay-150"></div>
                      <div className="bg-red-500/10 rounded h-24 w-full animate-pulse delay-200"></div>
                 </div>
            </div>
        );
    }

    // CMS / Admin (Custom CMS)
    if (id === 'proj-3') {
        return (
            <div className="w-full h-full flex p-3 gap-2">
                 <div className="w-1/4 h-full bg-white/5 rounded flex flex-col gap-2 p-2">
                      <div className="w-full h-2 bg-white/20 rounded"></div>
                      <div className="w-full h-2 bg-white/10 rounded"></div>
                      <div className="w-full h-2 bg-white/10 rounded"></div>
                      <div className="w-full h-2 bg-white/10 rounded"></div>
                 </div>
                 <div className="w-3/4 h-full flex flex-col gap-2">
                      <div className="w-full h-1/2 bg-green-500/10 rounded animate-pulse"></div>
                      <div className="w-full h-1/2 bg-white/5 rounded"></div>
                 </div>
            </div>
        );
    }

    // Default / Tooling
    return (
        <div className="w-full h-full p-4 flex flex-col justify-center items-center gap-3">
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 to-orange-500 blur-sm animate-pulse"></div>
             <div className="w-3/4 h-2 bg-white/10 rounded"></div>
             <div className="w-1/2 h-2 bg-white/10 rounded"></div>
        </div>
    );
  };

  return (
    <Section id="projects" className="bg-background relative z-20">
      <div 
        ref={containerRef} 
        className="flex flex-col gap-12 group/list" // group/list enables the cinema mode
        onMouseMove={handleMouseMove}
      >
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-8xl font-display font-bold text-white tracking-tighter">
                SELECTED<br/>WORKS
            </h2>
            <div className="flex items-center gap-3 mt-4 md:mt-0 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase text-secondary tracking-[0.2em]">
                    Showcase {new Date().getFullYear()}
                </span>
            </div>
        </div>

        <div className="flex flex-col">
          {PROJECT_DATA.map((project, index) => (
            <div
              key={project.id}
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 py-16 cursor-none transition-all duration-500 
                         hover:opacity-100 group-hover/list:opacity-30 hover:!opacity-100 hover:pl-8"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex flex-col gap-3 md:w-1/2 pointer-events-none z-10">
                 <h3 className="text-3xl md:text-6xl font-display font-bold text-secondary group-hover:text-white transition-colors duration-300">
                    {project.title}
                 </h3>
                 <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                     {project.tags.map(tag => (
                         <span key={tag} className="text-[10px] font-mono uppercase text-white/60 border border-white/10 px-2 py-0.5 rounded-full tracking-wider">
                             {tag}
                         </span>
                     ))}
                 </div>
              </div>

              <div className="mt-6 md:mt-0 md:w-1/3 flex flex-col items-end pointer-events-none z-10">
                 <p className="text-secondary text-sm leading-relaxed text-right opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 font-light">
                    {project.description}
                 </p>
                 <span className="text-[10px] font-mono uppercase text-white/40 mt-4 tracking-widest">{project.category} — {project.year}</span>
              </div>
              
              {/* Hover Indicator Icon */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-10 group-hover:translate-x-0">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                       <i className="ri-arrow-right-up-line text-white"></i>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Browser Window Modal */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-[400px] h-[280px] bg-[#0a0a0a] rounded-xl overflow-hidden pointer-events-none z-50 hidden md:flex flex-col border border-white/20 shadow-2xl"
        style={{ 
            opacity: hoveredProject ? 1 : 0, 
            transform: 'translate(-50%, -50%) scale(' + (hoveredProject ? 1 : 0.8) + ') rotate(' + (hoveredProject ? '2deg' : '0deg') + ')',
            transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
         {/* Window Header */}
         <div className="h-8 w-full border-b border-white/10 flex items-center px-4 gap-2 bg-white/5 backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
            <div className="ml-4 w-32 h-1.5 bg-white/10 rounded-full"></div>
         </div>
         
         {/* Window Content (Skeleton) */}
         <div className="flex-grow relative bg-[#050505]">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
             {renderPreview(hoveredProject)}
             
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-50"></div>
         </div>
      </div>

      {/* Floating 'View' Label */}
      <div
         ref={cursorLabelRef}
         className="fixed top-0 left-0 pointer-events-none z-[51] hidden md:flex items-center justify-center mix-blend-difference"
         style={{ 
            opacity: hoveredProject ? 1 : 0,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.2s ease'
         }}
      >
         <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
             <i className="ri-eye-line text-black text-xl"></i>
         </div>
      </div>
    </Section>
  );
};

export default Projects;