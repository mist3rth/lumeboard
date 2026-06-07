import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import useVideoController from "../../hooks/useVideoController";
import { getAssetPath } from "../../utils/assets";

interface HeroProps {
  onDiscoverClick: () => void;
  onPreOrderClick: () => void;
}

export default function Section00Hero({ onDiscoverClick, onPreOrderClick }: HeroProps) {
  const brandName = "LUMEBOARD";
  const colors = ["#00F5FF", "#8B00FF", "#FF006E", "#0066FF", "#00FF88"];
  const [currentColorIdx, setCurrentColorIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hook de contrôle automatique de lecture du média selon sa visibilité
  useVideoController(videoRef);

  // Slowly rotate the active LED color for subtle theme shifts
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentColorIdx((prev) => (prev + 1) % colors.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeColor = colors[currentColorIdx];

  return (
    <section 
      id="hero" 
      className="fixed top-0 left-0 h-screen w-full overflow-hidden bg-black flex flex-col justify-center items-center z-0"
    >
      {/* Background loop video with darkness mask */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-60"
        autoPlay
        loop
        muted
        playsInline
        src={getAssetPath("/hero_video.webm")}
        id="hero-background-video"
      />

      {/* Heavy dark mask and ambient gradient to guarantee contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.15)_60%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Staggered dynamic glow point reflection */}
      <motion.div 
        animate={{
          boxShadow: [
            `0 0 180px 80px ${activeColor}15`,
            `0 0 280px 110px ${activeColor}08`,
            `0 0 180px 80px ${activeColor}15`
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none bg-transparent"
      />

      {/* Content layout container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl select-none">
        
        {/* LUMEBOARD letter-by-letter staggered entrance */}
        <h1 
          className="font-display text-[11.5vw] sm:text-8xl md:text-9xl lg:text-[11rem] tracking-wider text-white m-0 p-0 leading-none select-none filter drop-shadow-[0_4px_30px_rgba(255,255,255,0.1)] whitespace-nowrap"
          id="hero-main-title"
        >
          {brandName.split("").map((letter, index) => {
            const letterColor = colors[index % colors.length];
            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 35, rotateX: 60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 1.1,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  // Éclat néon instantané au passage de la souris (effet carving)
                  el.style.textShadow = `0 0 15px ${letterColor}, 0 0 35px ${letterColor}, 0 0 60px ${letterColor}`;
                  el.style.color = letterColor;
                  el.style.transform = "scale(1.15) translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  // Extinction lente et progressive gérée à 100% par le GPU
                  el.style.textShadow = `0 0 20px rgba(255, 255, 255, 0.05)`;
                  el.style.color = "white";
                  el.style.transform = "scale(1) translateY(0)";
                }}
                className="inline-block transition-all duration-[1200ms] ease-out cursor-default select-none"
                style={{
                  textShadow: `0 0 20px rgba(255, 255, 255, 0.05)`,
                  color: "white"
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </h1>

        {/* Tagline showing up with subtle blur sharp transition */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(12px)", y: 15 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
          className="font-technical italic tracking-widest text-lg sm:text-xl md:text-2xl mt-4 text-neutral-300"
          id="hero-subtitle"
        >
          Ride the light.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-xs tracking-wider text-neutral-500 uppercase font-light mt-1"
        >
          La montagne n'a plus de nuit
        </motion.p>

        {/* CTA Pulse neon sync button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12"
          id="hero-cta-box"
        >
          <motion.button
            onClick={onDiscoverClick}
            animate={{
              boxShadow: `0 0 25px 3px ${activeColor}30`,
              borderColor: `${activeColor}40`
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="px-8 py-4 bg-white/5 backdrop-blur-md rounded-full text-white text-sm tracking-wider font-light uppercase border hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 cursor-pointer flex items-center gap-3 relative overflow-hidden group"
          >
            <span className="relative z-10">Découvrir l'innovation</span>
            <ChevronDown className="w-4 h-4 relative z-10 stroke-[1.5] group-hover:translate-y-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Highly visual scrolling bouncing cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2.2 }}
        className="absolute bottom-8 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
        onClick={onDiscoverClick}
        id="hero-scroll-cue"
      >
        <span className="text-[10px] tracking-widest text-white/40 uppercase font-light font-technical">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-1 h-3 bg-white/40 rounded-full"
        />
      </motion.div>
    </section>
  );
}
