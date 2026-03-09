import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { MessageSquare, QrCode, Smartphone, Mail, Linkedin, ArrowRight } from 'lucide-react';

const HangingBadge: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Motion values for drag position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Physics springs for elastic return
  const springConfig = { damping: 15, stiffness: 150, mass: 1 };
  
  // Create rotation based on drag movement for realistic sway
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), springConfig);

  // Use motion templates to bind SVG coordinates directly to motion values on the compositor
  // This prevents the "detachment" lag by avoiding React state renders for line position
  const x2 = useMotionTemplate`calc(50% + ${x}px)`;
  const y2 = useMotionTemplate`calc(100px + ${y}px)`; // Offset by drag Y
  const cx = x2;
  const cy = y2;

  return (
    <div className="relative flex flex-col items-center perspective-1000 z-50">
      
      {/* Elastic String Visualization */}
      {/* The SVG covers the area above the badge to render the string */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 -z-10 h-[300px] w-full pointer-events-none overflow-visible">
         <svg className="w-full h-full overflow-visible">
             {/* Dynamic string connecting anchor (top center) to badge clip */}
             <motion.line 
                x1="50%" 
                y1="0" 
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="2" 
                strokeLinecap="round"
             />
             {/* Connection point circle */}
             <motion.circle cx={cx} cy={cy} r="3" fill="#e1e1e1" />
         </svg>
      </div>

      {/* Draggable Badge Container */}
      <motion.div
        style={{ x, y, rotateX, rotateY, cursor: "grab" }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.15}
        whileDrag={{ cursor: "grabbing" }}
        onClick={() => setIsFlipped(!isFlipped)}
        className="mt-[100px] relative preserve-3d" // 'mt' matches the string connection point
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Metal Clip Top - Removed backface-hidden so it shows on both sides */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-gray-200 to-gray-500 rounded-sm z-20 shadow-md flex items-center justify-center">
            <div className="w-6 h-1 bg-black/40 rounded-full"></div>
        </div>

        {/* --- FRONT SIDE --- */}
        <div className="w-[280px] h-[420px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden backface-hidden absolute inset-0">
            
            {/* Holographic Sheen Layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10"></div>
            
            {/* Content */}
            <div className="h-full flex flex-col items-center pt-10 p-6 relative z-0">
                
                {/* ID Header */}
                <div className="w-full flex justify-between items-center mb-8 opacity-60">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white">Online</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white">PRIORITY</span>
                </div>

                {/* Photo Area */}
                <div className="w-32 h-32 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                     <MessageSquare size={56} className="text-white/80" strokeWidth={1} />
                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-white/40 uppercase tracking-widest whitespace-nowrap">Click to Flip</div>
                </div>

                {/* Name & Role */}
                <h3 className="text-white font-display font-bold text-3xl tracking-tight text-center mb-2">LET'S TALK</h3>
                <p className="text-white/50 font-mono text-[10px] uppercase tracking-[0.2em] mb-8">Send a Message</p>

                {/* Footer Details */}
                <div className="mt-auto w-full border-t border-white/10 pt-4">
                     <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] text-white/40 font-mono uppercase">Status</span>
                            <span className="text-lg text-white font-mono tracking-widest">OPEN</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                            <span className="text-[8px] font-mono uppercase">Tap Card</span>
                            <ArrowRight size={14} />
                        </div>
                     </div>
                </div>

                {/* Decorative Hologram Patch */}
                <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-md animate-pulse"></div>
            </div>
        </div>

        {/* --- BACK SIDE (QR Flow) --- */}
        <div className="w-[280px] h-[420px] bg-white text-black rounded-xl shadow-2xl overflow-hidden backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 relative">
            
            {/* Centered Top Label */}
            <div className="absolute top-6 left-0 right-0 text-center">
                 <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Scan Me</span>
            </div>
            
            <div className="w-48 h-48 bg-black p-2 rounded-lg mb-6 shadow-xl relative overflow-hidden mt-4">
                <div className="absolute inset-0 border-[4px] border-white/10 m-1 rounded"></div>
                {/* Simulated QR Pattern */}
                <div className="w-full h-full bg-white flex items-center justify-center">
                    <QrCode size={120} className="text-black" />
                </div>
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 animate-[scan_2s_ease-in-out_infinite] opacity-50"></div>
            </div>

            <h3 className="font-display font-bold text-2xl tracking-tighter mb-2">CONTACT</h3>
            <p className="font-mono text-[10px] uppercase tracking-wider opacity-60 text-center mb-6 max-w-[200px]">
                Scan to get in touch directly or use the links below.
            </p>

            <div className="flex gap-4 w-full justify-center">
                 <a href="mailto:jamsheda4ahmed786@gmail.com" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                    <Mail size={16} />
                 </a>
                 <a href="https://linkedin.com/in/jamshedahmed19" target="_blank" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-colors cursor-pointer">
                    <Linkedin size={16} />
                 </a>
                 <a href="tel:+92318901744" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                    <Smartphone size={16} />
                 </a>
            </div>
        </div>
        
      </motion.div>
    </div>
  );
};

export default HangingBadge;