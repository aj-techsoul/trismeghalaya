import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

// Import the user's custom full image and bottom slice
import fullImg from './full.png';
import bottomImg from './bottom.png';

interface ParallaxHeroProps {
  onShopClick: () => void;
  onPlanClick: () => void;
  tagline: string;
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  onShopClick,
  onPlanClick,
  tagline
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth the scroll progress for buttery-smooth visual inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 30,
    mass: 1.2,
    restDelta: 0.001
  });

  // ─── Parallax Speeds ───
  
  // 1. Background Landscape Translation: Slow lift and zoom
  const backgroundY = useTransform(smoothProgress, [0, 0.45], ["0px", "-45px"]);
  const backgroundScale = useTransform(smoothProgress, [0, 0.45], [1.01, 1.03]);

  // 2. Brand Logo translates independently to create depth
  const logoY = useTransform(smoothProgress, [0, 0.45], ["0px", "-60px"]);

  // 3. Text "MEGHALAYA" translates independently, sliding in the 3D space
  const textY = useTransform(smoothProgress, [0, 0.45], ["0px", "-80px"]);
  const textOpacity = useTransform(smoothProgress, [0.2, 0.45], [1, 0]);

  // 4. CTA panel: Fades and lifts
  const ctaY = useTransform(smoothProgress, [0, 0.25], ["0px", "-45px"]);
  const ctaOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  return (
    <div 
      ref={containerRef}
      className="relative h-[160vh] w-full bg-[#050e08] select-none" 
      id="home-parallax-storyteller"
    >
      {/* Sticky Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none z-10" id="parallax-viewport">
        
        {/* ═══ LAYER 1: Background Landscape Group (z-10) ═══ */}
        <motion.div
          style={{ 
            y: backgroundY,
            scale: backgroundScale,
            willChange: 'transform'
          }}
          className="absolute inset-0 pointer-events-none z-10"
        >
          <div className="aspect-cover-container overflow-hidden">
            {/* A. Background Fill Layer (z-9) - Loads bottom.png to fill any transparent holes in full.png.
                Since bottom.png has 100% solid rocks at the bottom, this completely covers the center black spot hole. */}
            <div 
              style={{ 
                backgroundImage: `url(${bottomImg})`,
                height: '67.06%', // 712/1240 relative to container width scaling
                bottom: 0,
                backgroundSize: '100% 100%'
              }}
              className="absolute inset-x-0 bg-bottom pointer-events-none z-9"
            />

            {/* B. Background fullImg (Waterfall & Sky) - Scaled to 100% 100% of container to prevent rounding alignment errors */}
            <div 
              style={{ 
                backgroundImage: `url(${fullImg})`,
                height: '100%',
                top: 0,
                backgroundSize: '100% 100%'
              }}
              className="absolute inset-x-0 bg-top pointer-events-none z-10"
            />
          </div>
        </motion.div>

        {/* LAYER 2: Brand Logo (z-14) */}
        <motion.div
          style={{
            y: logoY,
            opacity: textOpacity,
            willChange: 'transform, opacity'
          }}
          className="absolute inset-x-0 top-[24%] flex justify-center items-center pointer-events-none z-14"
        >
          <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/8 text-white backdrop-blur-md border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)] animate-float-slow overflow-hidden p-2.5">
            <img 
              src="https://static.wixstatic.com/media/ea1287_745329563a6c4e198ea8b8f42e6a377f~mv2.png/v1/crop/x_669,y_335,w_2829,h_3224/fill/w_137,h_157,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo_tristravels-02.png"
              alt="TRIS travels logo"
              className="w-full h-full object-contain filter invert"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* LAYER 3: Brand Text "MEGHALAYA" (z-15) - Resting nicely on the water line level */}
        <motion.div
          style={{ 
            y: textY,
            opacity: textOpacity,
            willChange: 'transform, opacity'
          }}
          className="absolute inset-x-0 top-[34%] flex flex-col items-center pointer-events-none z-15 select-none"
        >
          <div className="relative flex flex-col items-center justify-center select-none pb-4">
            <h1 className="text-[13vw] md:text-[9.5vw] font-montserrat font-black tracking-[0.04em] text-white/95 select-none leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
              MEGHALAYA
            </h1>
          </div>
        </motion.div>

        {/* Redesigned Floating CTA Container (z-35) */}
        <motion.div
          style={{ 
            y: ctaY,
            opacity: ctaOpacity,
            willChange: 'transform, opacity'
          }}
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-35 w-[90%] max-w-xl pointer-events-auto flex flex-col items-center justify-center text-center space-y-5"
        >
          {/* Subtle typography for the CTA headline */}
          <h3 className="font-sans font-semibold text-white/90 text-xs sm:text-sm tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Embark on an Authentic Adventure
          </h3>
          
          {/* Symmetrical, minimal pill buttons */}
          <div className="flex flex-row items-center justify-center gap-4 w-full">
            <button
              onClick={onPlanClick}
              className="bg-brand-lime hover:bg-white text-[#050e08] border border-white py-2.5 px-8 rounded-full font-sans font-bold text-[10px] sm:text-xs tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(226,246,181,0.2)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              Plan Travel
            </button>
            <button
              onClick={onShopClick}
              className="bg-white/5 hover:bg-white/15 text-white border border-white py-2.5 px-8 rounded-full font-sans font-bold text-[10px] sm:text-xs tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              Shop Crafts
            </button>
          </div>
        </motion.div>

        {/* Ambient bottom fog fade blending the container smoothly with the cream bento grid */}
        <div className="absolute inset-x-0 bottom-[-2px] h-32 bg-gradient-to-t from-brand-cream via-brand-cream/40 to-transparent z-40 pointer-events-none" />
      </div>
    </div>
  );
};
