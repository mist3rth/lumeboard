import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, Compass, Eye } from "lucide-react";
import useVideoController from "../../hooks/useVideoController";
import { getAssetPath } from "../../utils/assets";

export default function Section04NightRide() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Hook de contrôle automatique de lecture du média selon sa visibilité
  useVideoController(videoRef);

  const handleCardClick = (cardId: number) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  return (
    <section 
      ref={containerRef}
      id="experience" 
      className="relative lg:sticky lg:top-0 h-auto lg:h-screen w-full bg-[#030303] py-16 lg:py-24 px-6 md:px-16 flex flex-col justify-center overflow-visible lg:overflow-hidden z-10"
    >
      {/* Background loop video with premium darkness mask for readability */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-40 z-0"
        autoPlay
        loop
        muted
        playsInline
        src={getAssetPath("/s4.webm")}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Layout Grid: Text Info block on left, Asymmetric Media Grid on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-technical tracking-widest text-[#8B00FF] uppercase mb-3 block font-semibold">
              SECTION 04 — L'expérience
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wide leading-none text-white">
              Une descente.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-[#FF006E]">
                Une œuvre.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-neutral-300 italic font-technical">
              Chaque virage laisse une trace de lumière.
            </p>

            <p className="text-sm md:text-base font-light text-neutral-400 leading-relaxed font-sans max-w-sm">
              Imaginez dévaler une piste vide à 23h. La neige fraîche absorbe et réfléchit les couleurs de vos carres. Chaque courbe dessine une ligne lumineuse dans le noir. Vous n'êtes plus seulement un rider, vous êtes le spectacle.
            </p>

            {/* Glowing info indicator */}
            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-900/80 flex items-start gap-3.5 max-w-sm">
              <Compass className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-technical text-white font-medium uppercase tracking-wider">La nuit est à vous</h3>
                <p className="text-xs font-light text-neutral-500 mt-1 lines-relaxed">
                  Notre technologie LED projette une intensité lumineuse de plus de 1800 lumens au sol pour une visibilité sécuritaire et esthétique absolue.
                </p>
              </div>
            </div>
          </div>

          {/* Right Block: Asymmetric Grid representing 3 high-contrast Long Exposure moments */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 relative" id="experience-media-grid">
            
            {/* Ambient purple aura behind the grid */}
            <div className="absolute inset-0 bg-violet-600/5 blur-[120px] pointer-events-none rounded-full" />

            {/* CARD 01: Long Exposure Neo Traces in pure darkness (Large Card) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleCardClick(1)}
              className="sm:col-span-2 relative h-[240px] bg-black border border-neutral-900 rounded-[24px] overflow-hidden group shadow-xl cursor-pointer"
            >
              {/* Image from public/bloc1.webp */}
              <img 
                src={getAssetPath("/bloc1.webp")} 
                alt="Traces LED dans la neige" 
                width={640}
                height={240}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-110 select-none pointer-events-none ${activeCard === 1 ? 'scale-105 opacity-100 brightness-110' : 'opacity-60'}`}
                loading="lazy"
                decoding="async"
              />

              {/* Micro specs absolute overlays */}
              <div className="absolute top-6 left-6 font-mono text-[9px] text-[#FF006E] tracking-widest uppercase z-10">
                // LONG EXPOSURE RAW_MOMENT_01
              </div>
              <div className="absolute bottom-6 left-6 z-10">
                <h3 className="text-sm font-technical text-white uppercase font-light tracking-wide">Traces LED dans la neige</h3>
                <p className="text-xs text-neutral-500 mt-1">Carving fluorescent immortalisé sous la lune</p>
              </div>

              {/* Shimmer cover and hover zoom effect */}
              <div className={`absolute inset-0 transition-colors duration-500 z-0 ${activeCard === 1 ? 'bg-transparent' : 'bg-black/35 group-hover:bg-transparent'}`} />
            </motion.div>

            {/* CARD 02: Aerial view simulation (Square Card 1) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleCardClick(2)}
              className="relative h-[220px] bg-black border border-neutral-900 rounded-[24px] overflow-hidden group shadow-xl cursor-pointer"
            >
              {/* Image from public/bloc2.webp */}
              <img 
                src={getAssetPath("/bloc2.webp")} 
                alt="Vues aériennes" 
                width={320}
                height={220}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-110 select-none pointer-events-none ${activeCard === 2 ? 'scale-105 opacity-100 brightness-110' : 'opacity-60'}`}
                loading="lazy"
                decoding="async"
              />

              <div className="absolute top-5 left-5 font-mono text-[8px] text-violet-400 tracking-widest uppercase z-10">
                // TELEMETRIC RIDGE MAP_02
              </div>
              <div className="absolute bottom-5 left-5 z-10">
                <h3 className="text-xs font-technical text-white uppercase tracking-wider">Vues aériennes</h3>
                <p className="text-[10px] text-neutral-500 mt-0.5">Sinuosités colorées perçues par drone</p>
              </div>

              {/* Shimmer cover and hover zoom effect */}
              <div className={`absolute inset-0 transition-colors duration-500 z-0 ${activeCard === 2 ? 'bg-transparent' : 'bg-black/35 group-hover:bg-transparent'}`} />
            </motion.div>

            {/* CARD 03: Group of riders neon spectrum (Square Card 2) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleCardClick(3)}
              className="relative h-[220px] bg-black border border-neutral-900 rounded-[24px] overflow-hidden group shadow-xl cursor-pointer"
            >
              {/* Image from public/bloc3.webp */}
              <img 
                src={getAssetPath("/bloc3.webp")} 
                alt="Groupe de riders" 
                width={320}
                height={220}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-110 select-none pointer-events-none ${activeCard === 3 ? 'scale-105 opacity-100 brightness-110' : 'opacity-60'}`}
                loading="lazy"
                decoding="async"
              />

              <div className="absolute top-5 left-5 font-mono text-[8px] text-[#00FF88] tracking-widest uppercase z-10">
                // TEAM SYNERGY MAP_03
              </div>
              <div className="absolute bottom-5 left-5 z-10">
                <h3 className="text-xs font-technical text-white uppercase tracking-wider">Groupe de riders</h3>
                <p className="text-[10px] text-neutral-500 mt-0.5">La fusion de l'or, du rose et du cyan</p>
              </div>

              {/* Shimmer cover and hover zoom effect */}
              <div className={`absolute inset-0 transition-colors duration-500 z-0 ${activeCard === 3 ? 'bg-transparent' : 'bg-black/35 group-hover:bg-transparent'}`} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
