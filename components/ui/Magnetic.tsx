import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: React.ReactElement<any>;
  className?: string;
  strength?: number; // How strong the pull is
}

const Magnetic: React.FC<MagneticProps> = ({ children, className = "", strength = 0.5 }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Create refs for GSAP quickTo
  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);

  useEffect(() => {
    if (ref.current) {
      xTo.current = gsap.quickTo(ref.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      yTo.current = gsap.quickTo(ref.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    xTo.current(middleX * strength);
    yTo.current(middleY * strength);
  };

  const handleMouseLeave = () => {
    xTo.current(0);
    yTo.current(0);
  };

  return React.cloneElement(children, {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: `${children.props.className || ''} ${className}`,
  });
};

export default Magnetic;