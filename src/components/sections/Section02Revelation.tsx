import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Sparkles, BatteryCharging, Smartphone, Eye } from "lucide-react";
import { getAssetPath } from "../../utils/assets";
import { BlossomCarousel } from "@blossom-carousel/react";

export default function Section02Revelation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const [activeFeature, setActiveFeature] = useState<number>(1);
  const [activeColor, setActiveColor] = useState<string>("rgb(40, 210, 114)");
  const [sliderHue, setSliderHue] = useState<number>(145); // Approx hue for rgb(40, 210, 114)

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    if (window.innerWidth >= 1024) return;
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const card = container.querySelector("li");
    const cardWidth = card ? card.clientWidth : 320;
    const gap = 24; // gap-6 est de 24px (1.5rem)
    const index = Math.round(scrollLeft / (cardWidth + gap));
    if (index >= 0 && index < features.length) {
      const feat = features[index];
      if (activeFeature !== feat.id) {
        setActiveFeature(feat.id);
        setActiveColor(feat.color);
        if (feat.id === 1) setSliderHue(145);
        else if (feat.id === 2) setSliderHue(319);
        else if (feat.id === 3) setSliderHue(211);
      }
    }
  };

  const handleCardClick = (feat: typeof features[0], index: number) => {
    setActiveFeature(feat.id);
    setActiveColor(feat.color);
    if (feat.id === 1) setSliderHue(145);
    else if (feat.id === 2) setSliderHue(319);
    else if (feat.id === 3) setSliderHue(211);

    if (window.innerWidth < 1024) {
      const container = document.querySelector(".carousel-cover-flow-sec02");
      if (container) {
        const card = container.querySelector("li");
        const cardWidth = card ? card.clientWidth : 320;
        const gap = 24;
        container.scrollTo({
          left: index * (cardWidth + gap),
          behavior: "smooth"
        });
      }
    }
  };

  // We don't need static colors anymore, we use the chromatic picker!

  const features = [
    {
      id: 1,
      title: "LED intégrées dans les carres",
      sub: "Aucune pièce externe. Aucun risque. Une lumière qui fait partie de la planche.",
      icon: Sparkles,
      color: "rgb(40, 210, 114)",
      positionLabel: "Carres en composite lumineux"
    },
    {
      id: 2,
      title: "Batteries dans les fixations",
      sub: "6 heures d'autonomie. Rechargeable. Compact. Invisible.",
      icon: BatteryCharging,
      color: "rgb(255, 0, 174)",
      positionLabel: "Fixations intelligentes rechargeables USB-C"
    },
    {
      id: 3,
      title: "Contrôle via application",
      sub: "Choisis ta couleur. Active le mode automatique. Synchronise avec ta musique.",
      icon: Smartphone,
      color: "rgb(0, 123, 255)",
      positionLabel: "Puce Bluetooth 5.0 intégrée"
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="product" 
      className="relative z-30 min-h-screen w-full bg-[#050505] shadow-[0_-50px_120px_rgba(0,0,0,1)] border-t border-neutral-900/40 py-24 px-6 md:px-16 flex flex-col justify-center overflow-hidden"
    >
      {/* Filtre SVG de distorsion électrique de turbulence optimisé pour les performances (60fps) */}
      <svg className="absolute w-0 h-0 pointer-events-none" style={{ visibility: "hidden" }} aria-hidden="true">
        <defs>
          <filter id="electric-turbulence" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="4" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="7s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="4" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="7s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="4" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="7s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="4" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="7s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="12" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Title structure */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-technical tracking-widest text-[#FF006E] uppercase mb-3 block font-semibold">
            SECTION 02 — L'innovation
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wide leading-none text-white mb-6">
            Nous avons réinventé la planche.
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 font-light max-w-2xl mx-auto">
            Du bord à la fixation, la lumière fait partie de la ride.
          </p>
          <div className="mt-8 text-xs text-neutral-500 font-mono flex justify-center items-center gap-4">
            <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-[#FF006E]" /> clique sur les features pour tester l'éclairage</span>
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start">
          
          {/* Left Block: Features List / Carousel on Mobile */}
          {isMobile ? (
            <>
              <div className="flex justify-between items-center mb-4 px-2" id="mobile-carousel-indicator-sec02">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">// Innovations</span>
                <span className="text-sm font-technical font-medium text-emerald-400 bg-neutral-900/40 border border-neutral-800/60 px-3 py-1 rounded-full">
                  {features.findIndex(f => f.id === activeFeature) !== -1 ? features.findIndex(f => f.id === activeFeature) + 1 : 1} / {features.length}
                </span>
              </div>
              <BlossomCarousel 
                as="ul"
                onScroll={handleScroll}
                className="carousel-cover-flow carousel-cover-flow-sec02 overflow-x-auto no-scrollbar scroll-smooth pb-6"
              >
              {features.map((feat, index) => {
                const IconComponent = feat.icon;
                const isSelected = activeFeature === feat.id;

                return (
                  <li key={feat.id} className="relative flex-shrink-0 snap-center w-[80vw] sm:w-[320px] lg:w-auto lg:flex-shrink">
                    <div className="slide">
                      {/* CARTE PRINCIPALE — Box-shadow underglow néon directement sur la carte */}
                      <motion.div
                        layout
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ 
                          opacity: isInView ? 1 : 0, 
                          x: isInView ? 0 : -30,
                          borderColor: isSelected ? feat.color : `${feat.color}44`
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: 380,
                          damping: 28,
                          borderColor: { duration: 0.15, ease: "easeOut" }
                        }}
                        whileHover={{ 
                          x: 6,
                          borderColor: feat.color,
                          backgroundColor: isSelected ? "rgba(23, 23, 23, 0.7)" : "rgba(14, 14, 14, 0.5)"
                        }}
                        onClick={() => handleCardClick(feat, index)}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isSelected}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleCardClick(feat, index);
                          }
                        }}
                        style={isSelected ? {
                          boxShadow: [
                            `0 20px 60px -10px ${feat.color}55`,
                            `0 35px 80px -15px ${feat.color}30`,
                            `0 50px 100px -20px ${feat.color}15`,
                            `0 15px 40px rgba(0,0,0,0.8)`
                          ].join(", ")
                        } : {}}
                        className={`card p-6 rounded-2xl border cursor-pointer flex gap-4 relative transition-shadow duration-500 w-full focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black ${
                          isSelected 
                            ? "bg-neutral-900/60 z-10" 
                            : "bg-[#090909]/40 hover:bg-[#0e0e0e]/50 z-10"
                        }`}
                        id={`feature-card-${feat.id}`}
                      >
                        {/* EFFET BORDURE ÉLECTRIQUE ACTIF (z-0 - Placé en arrière-plan) */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15, ease: "easeOut" }} // Disparition et apparition ultra-rapides
                              className="absolute inset-0 pointer-events-none rounded-2xl z-0"
                            >
                              {/* Calque principal de turbulence électrique (Desktop uniquement) */}
                              <div 
                                className="hidden lg:block absolute inset-0 rounded-2xl pointer-events-none"
                                style={{
                                  border: `2.5px solid ${feat.color}`,
                                  filter: "url(#electric-turbulence)",
                                  margin: "-1px"
                                }}
                              />
                              {/* Bordure simple et fluide (Mobile/Tablette) */}
                              <div 
                                className="block lg:hidden absolute inset-0 rounded-2xl pointer-events-none"
                                style={{
                                  border: `2px solid ${feat.color}`,
                                  margin: "-1px"
                                }}
                              />
                              {/* Glow Layer 1 (blur fin) */}
                              <div 
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{
                                  border: `2px solid ${feat.color}`,
                                  filter: "blur(2.5px)",
                                  opacity: 0.85
                                }}
                              />
                              {/* Glow Layer 2 (halo de rayonnement) */}
                              <div 
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{
                                  border: `2px solid ${feat.color}`,
                                  filter: "blur(7px)",
                                  opacity: 0.45
                                }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* CONTENU DE LA CARTE (relative z-10 - Lisibilité totale garantie) */}
                        <div 
                          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 relative z-10"
                          style={{ 
                            backgroundColor: isSelected ? `${feat.color}20` : '#171717',
                            color: isSelected ? feat.color : '#a3a3a3',
                            boxShadow: isSelected ? `0 0 15px ${feat.color}40` : 'none'
                          }}
                        >
                          <IconComponent className="w-5 h-5 animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0 relative z-10">
                          <h3 className="text-lg font-normal text-white uppercase tracking-wider mb-2 font-technical">
                            {feat.title}
                          </h3>
                          <p className="text-sm font-light text-neutral-400 leading-relaxed">
                            {feat.sub}
                          </p>
                          
                          {/* Détails toujours visibles et colorés */}
                          <div className="mt-3 overflow-hidden">
                            <div 
                              className="text-xs font-mono tracking-wider flex items-center gap-2.5 bg-black/55 px-3 py-1.5 rounded-lg border transition-all duration-300 w-fit"
                              style={{ 
                                color: feat.color,
                                textShadow: `0 0 8px ${feat.color}40`,
                                boxShadow: `inset 0 0 10px ${feat.color}05`,
                                borderColor: isSelected ? feat.color : `${feat.color}33`,
                                opacity: isSelected ? 1 : 0.7
                              }}
                            >
                              {/* Voyant LED néon pulsant */}
                              <div className="relative flex h-2 w-2">
                                {isSelected && (
                                  <span 
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                    style={{ backgroundColor: feat.color }}
                                  />
                                )}
                                <span 
                                  className="relative inline-flex rounded-full h-2 w-2"
                                  style={{ 
                                    backgroundColor: feat.color,
                                    boxShadow: isSelected ? `0 0 10px ${feat.color}, 0 0 20px ${feat.color}` : `0 0 5px ${feat.color}`
                                  }}
                                />
                              </div>
                              
                              <span className="font-semibold uppercase text-[10px] tracking-widest opacity-90 flex items-center gap-1">
                                ⚡ Active : <span className="text-white font-normal capitalize tracking-normal">{feat.positionLabel}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </li>
                );
              })}
             </BlossomCarousel>
            </>
          ) : (
            <div 
              className="order-2 lg:order-1 lg:col-span-5 flex lg:flex-col gap-6"
            >
              {features.map((feat, index) => {
                const IconComponent = feat.icon;
                const isSelected = activeFeature === feat.id;

                return (
                  <div key={feat.id} className="w-full">
                    {/* CARTE PRINCIPALE — Box-shadow underglow néon directement sur la carte */}
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ 
                        opacity: isInView ? 1 : 0, 
                        x: isInView ? 0 : -30,
                        borderColor: isSelected ? feat.color : `${feat.color}44`
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 380,
                        damping: 28,
                        borderColor: { duration: 0.15, ease: "easeOut" }
                      }}
                      whileHover={{ 
                        x: 6,
                        borderColor: feat.color,
                        backgroundColor: isSelected ? "rgba(23, 23, 23, 0.7)" : "rgba(14, 14, 14, 0.5)"
                      }}
                      onClick={() => handleCardClick(feat, index)}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isSelected}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleCardClick(feat, index);
                        }
                      }}
                      style={isSelected ? {
                        boxShadow: [
                          `0 20px 60px -10px ${feat.color}55`,
                          `0 35px 80px -15px ${feat.color}30`,
                          `0 50px 100px -20px ${feat.color}15`,
                          `0 15px 40px rgba(0,0,0,0.8)`
                        ].join(", ")
                      } : {}}
                      className={`p-6 rounded-2xl border cursor-pointer flex gap-4 relative transition-shadow duration-500 w-full focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black ${
                        isSelected 
                          ? "bg-neutral-900/60 z-10" 
                          : "bg-[#090909]/40 hover:bg-[#0e0e0e]/50 z-10"
                      }`}
                      id={`feature-card-${feat.id}`}
                    >
                      {/* EFFET BORDURE ÉLECTRIQUE ACTIF (z-0 - Placé en arrière-plan) */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15, ease: "easeOut" }} // Disparition et apparition ultra-rapides
                            className="absolute inset-0 pointer-events-none rounded-2xl z-0"
                          >
                            {/* Calque principal de turbulence électrique */}
                            <div 
                              className="absolute inset-0 rounded-2xl pointer-events-none border-[2.5px]"
                              style={{
                                borderColor: feat.color,
                                filter: "url(#electric-turbulence)",
                                margin: "-1px"
                              }}
                            />
                            {/* Glow Layer 1 (blur fin) */}
                            <div 
                              className="absolute inset-0 rounded-2xl pointer-events-none border-2"
                              style={{
                                borderColor: feat.color,
                                filter: "blur(2.5px)",
                                opacity: 0.85
                              }}
                            />
                            {/* Glow Layer 2 (halo de rayonnement) */}
                            <div 
                              className="absolute inset-0 rounded-2xl pointer-events-none border-2"
                              style={{
                                borderColor: feat.color,
                                filter: "blur(7px)",
                                opacity: 0.45
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* CONTENU DE LA CARTE (relative z-10 - Lisibilité totale garantie) */}
                      <div 
                        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 relative z-10"
                        style={{ 
                          backgroundColor: isSelected ? `${feat.color}20` : '#171717',
                          color: isSelected ? feat.color : '#a3a3a3',
                          boxShadow: isSelected ? `0 0 15px ${feat.color}40` : 'none'
                        }}
                      >
                        <IconComponent className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="flex-1 min-w-0 relative z-10">
                        <h3 className="text-lg font-normal text-white uppercase tracking-wider mb-2 font-technical">
                          {feat.title}
                        </h3>
                        <p className="text-sm font-light text-neutral-400 leading-relaxed">
                          {feat.sub}
                        </p>
                        
                        {/* Détails toujours visibles et colorés */}
                        <div className="mt-3 overflow-hidden">
                          <div 
                            className="text-xs font-mono tracking-wider flex items-center gap-2.5 bg-black/55 px-3 py-1.5 rounded-lg border transition-all duration-300 w-fit"
                            style={{ 
                              color: feat.color,
                              textShadow: `0 0 8px ${feat.color}40`,
                              boxShadow: `inset 0 0 10px ${feat.color}05`,
                              borderColor: isSelected ? feat.color : `${feat.color}33`,
                              opacity: isSelected ? 1 : 0.7
                            }}
                          >
                            {/* Voyant LED néon pulsant */}
                            <div className="relative flex h-2 w-2">
                              {isSelected && (
                                <span 
                                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                  style={{ backgroundColor: feat.color }}
                                />
                              )}
                              <span 
                                className="relative inline-flex rounded-full h-2 w-2"
                                style={{ 
                                  backgroundColor: feat.color,
                                  boxShadow: isSelected ? `0 0 10px ${feat.color}, 0 0 20px ${feat.color}` : `0 0 5px ${feat.color}`
                                }}
                              />
                            </div>
                            
                            <span className="font-semibold uppercase text-[10px] tracking-widest opacity-90 flex items-center gap-1">
                              ⚡ Active : <span className="text-white font-normal capitalize tracking-normal">{feat.positionLabel}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Right Block: High-Tech Interactive Snowboard Mockup */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center items-center gap-4 lg:gap-8 relative min-h-[500px] lg:min-h-[600px] pb-4 lg:pb-16">
            


            <div 
              style={{ filter: "blur(130px)", backgroundColor: `${activeColor}15` }}
              className="absolute w-[400px] h-[400px] rounded-full transition-all duration-1000 ease-out z-0" 
            />

            {/* Wrapper for the card and its backglow (z-10 inside parent column - Zero Clipping!) */}
            <div className="relative w-[180px] sm:w-[220px] h-[520px] preserve-3d z-10">
              
              {/* 1. Volumetric Neon Backglow breathing behind the mockup (z-0 - Perfectly Aligned!) */}
              <motion.div
                style={{ 
                  backgroundColor: activeColor,
                  filter: "blur(50px)"
                }}
                animate={{ 
                  scale: [0.92, 1.05, 0.92],
                  opacity: [0.32, 0.52, 0.32]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-[45px] transition-colors duration-1000 z-0 pointer-events-none"
              />

              {/* 2. Snowboard visual canvas body (z-10, stable hover) */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateY: -35 }}
                animate={isInView ? { scale: 1, opacity: 1, rotateY: 10 } : { scale: 0.8, opacity: 0, rotateY: -35 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 rounded-[45px] flex flex-col justify-between px-4 py-8 border border-white/5 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing preserve-3d z-10"
                id="snowboard-mockup"
              >
                {/* Synced Visual Board Wrapper (z-20 - Constrained inset-y-8 to prevent glow clipping) */}
                <div className="absolute inset-y-8 inset-x-4 z-20 pointer-events-none">
                  {/* Board Deck Image (z-10 inside wrapper) */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <img 
                      src={getAssetPath("/board.webp")} 
                      alt="LumeBoard High-Tech Snowboard" 
                      className="w-full h-full object-contain transition-all duration-300"
                      style={{
                        filter: `drop-shadow(0 0 35px ${activeColor})`
                      }}
                    />
                  </div>

                  {/* Dynamic LED edge tracks following the snowboard contour (z-20 inside wrapper) */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none z-20"
                    viewBox="0 0 100 500"
                    preserveAspectRatio="none"
                  >
                    {/* LEFT RAIL (Layered Neon Glows) */}
                    <motion.path
                      d="M 40,22 C 34,35 27,48 29,65 C 31,85 38,150 38,250 C 38,350 31,415 29,435 C 27,452 34,465 40,478"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="12"
                      strokeLinecap="round"
                      className="opacity-[0.12] transition-colors duration-300"
                    />
                    <motion.path
                      d="M 40,22 C 34,35 27,48 29,65 C 31,85 38,150 38,250 C 38,350 31,415 29,435 C 27,452 34,465 40,478"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="6"
                      strokeLinecap="round"
                      className="opacity-40 transition-colors duration-300"
                    />
                    <motion.path
                      d="M 40,22 C 34,35 27,48 29,65 C 31,85 38,150 38,250 C 38,350 31,415 29,435 C 27,452 34,465 40,478"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="opacity-85 transition-colors duration-300"
                    />
                    <motion.path
                      d="M 40,22 C 34,35 27,48 29,65 C 31,85 38,150 38,250 C 38,350 31,415 29,435 C 27,452 34,465 40,478"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      strokeLinecap="round"
                      className="opacity-[0.95]"
                    />

                    {/* Left Flowing Energy Pulse (Desktop only) */}
                    <motion.path
                      d="M 40,22 C 34,35 27,48 29,65 C 31,85 38,150 38,250 C 38,350 31,415 29,435 C 27,452 34,465 40,478"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeDasharray="50 250"
                      animate={{ strokeDashoffset: [300, -300] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                      className="hidden lg:block opacity-90"
                      style={{
                        filter: `drop-shadow(0 0 6px ${activeColor})`
                      }}
                    />

                    {/* RIGHT RAIL (Layered Neon Glows) */}
                    <motion.path
                      d="M 60,22 C 66,35 73,48 71,65 C 69,85 62,150 62,250 C 62,350 69,415 71,435 C 73,452 66,465 60,478"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="12"
                      strokeLinecap="round"
                      className="opacity-[0.12] transition-colors duration-300"
                    />
                    <motion.path
                      d="M 60,22 C 66,35 73,48 71,65 C 69,85 62,150 62,250 C 62,350 69,415 71,435 C 73,452 66,465 60,478"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="6"
                      strokeLinecap="round"
                      className="opacity-40 transition-colors duration-300"
                    />
                    <motion.path
                      d="M 60,22 C 66,35 73,48 71,65 C 69,85 62,150 62,250 C 62,350 69,415 71,435 C 73,452 66,465 60,478"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="opacity-85 transition-colors duration-300"
                    />
                    <motion.path
                      d="M 60,22 C 66,35 73,48 71,65 C 69,85 62,150 62,250 C 62,350 69,415 71,435 C 73,452 66,465 60,478"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      strokeLinecap="round"
                      className="opacity-[0.95]"
                    />

                    {/* Right Flowing Energy Pulse (Desktop only) */}
                    <motion.path
                      d="M 60,22 C 66,35 73,48 71,65 C 69,85 62,150 62,250 C 62,350 69,415 71,435 C 73,452 66,465 60,478"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeDasharray="50 250"
                      animate={{ strokeDashoffset: [300, -300] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                      className="hidden lg:block opacity-90"
                      style={{
                        filter: `drop-shadow(0 0 6px ${activeColor})`
                      }}
                    />
                  </svg>
                </div>

              {/* 4. Top Binding Mount with Highlight (z-40) */}
              <div className="relative z-40 w-full flex justify-center py-6">
                <motion.div 
                  animate={activeFeature === 2 ? { scale: 1.15, borderColor: activeColor } : { scale: 1, borderColor: "rgba(255,255,255,0.1)" }}
                  className="w-16 h-16 rounded-full border bg-black/80 flex flex-col items-center justify-center relative transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-white text-[9px] font-mono">
                    B1
                  </div>
                  {activeFeature === 2 && (
                    <span className="absolute -top-6 text-[8px] font-mono whitespace-nowrap bg-black px-1.5 py-0.5 rounded border" style={{ color: activeColor, borderColor: activeColor }}>
                      BATTERY PACK
                    </span>
                  )}
                </motion.div>
              </div>

              {/* 5. Bottom Binding Mount with Highlight (z-40) */}
              <div className="relative z-40 w-full flex justify-center py-6">
                <motion.div 
                  animate={activeFeature === 2 ? { scale: 1.15, borderColor: activeColor } : { scale: 1, borderColor: "rgba(255,255,255,0.1)" }}
                  className="w-16 h-16 rounded-full border bg-black/80 flex flex-col items-center justify-center relative transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-white text-[9px] font-mono">
                    B2
                  </div>
                  {activeFeature === 2 && (
                    <span className="absolute -bottom-6 text-[8px] font-mono whitespace-nowrap bg-black px-1.5 py-0.5 rounded border" style={{ color: activeColor, borderColor: activeColor }}>
                      6H AUTONOMY
                    </span>
                  )}
                </motion.div>
              </div>

              {/* 6. Bluetooth / control light node (z-40) */}
              <motion.div 
                animate={activeFeature === 3 ? { opacity: 1, scale: 1.2 } : { opacity: 0.3, scale: 1 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center bg-black/60 border border-white/20 z-40"
              >
                <div 
                  style={{ backgroundColor: activeColor }}
                  className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] animate-ping" 
                />
              </motion.div>
            </motion.div>
          </div>

            {/* Horizontal Chroma Slider Controls (Now in document flow, not absolute) */}
            <div 
              className="relative z-30 bg-black/85 backdrop-blur-md px-6 py-4 rounded-3xl border transition-all duration-300 flex flex-col items-center gap-3 w-full max-w-[320px] mb-2 lg:mb-8"
              style={{
                borderColor: `${activeColor}20`,
                boxShadow: `0 15px 40px -15px rgba(0,0,0,0.8), 0 0 25px ${activeColor}15, inset 0 0 15px ${activeColor}05`
              }}
            >
              <div className="flex justify-between w-full items-center">
                <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
                  Couleur LED
                </span>
                <div className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: activeColor, color: activeColor }} />
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={sliderHue}
                onChange={(e) => {
                  const hue = Number(e.target.value);
                  setSliderHue(hue);
                  setActiveColor(`hsl(${hue}, 100%, 50%)`);
                }}
                aria-label="Ajuster la teinte des LED de la planche"
                className="w-full h-2 rounded-full appearance-none outline-none cursor-pointer focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)]
                  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none"
                style={{
                  background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
                }}
              />
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
