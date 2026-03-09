import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Refs for GSAP quickTo
  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);

  useEffect(() => {
    if (cursorRef.current) {
        // Setup GSAP quickSetter for high performance
        xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
        yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });
    }

    const updateMousePosition = (e: MouseEvent) => {
      if(xTo.current && yTo.current) {
          xTo.current(e.clientX);
          yTo.current(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.closest('.group')
         ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
        style={{
             transform: 'translate(-50%, -50%)',
        }}
    >
        <div 
            className={`absolute inset-0 bg-white rounded-full transition-transform duration-300 ease-out ${isHovering ? 'scale-[4]' : 'scale-100'}`}
        ></div>
    </div>
  );
};

export default CustomCursor;