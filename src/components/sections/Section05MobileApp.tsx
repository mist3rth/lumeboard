import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Sliders, RefreshCw, Activity, Music, Battery, Share2, Smartphone } from "lucide-react";

export default function Section05MobileApp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });
  const [activeFunc, setActiveFunc] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const functionalities = [
    {
      id: 0,
      title: "Palette chromatique complète",
      desc: "Accès immédiat à 16 millions de teintes colorées précises. Réglez la luminosité et la saturation d'un glissement de doigt.",
      icon: Sliders,
      mockupBg: "bg-gradient-to-tr from-[#00F5FF] to-violet-700",
      accentColor: "#00F5FF",
      mockupUI: {
        title: "Palette RGB",
        detail: "Teinte : Cyan Arctique",
        metric: "16M nuances",
        visualWord: "COLOR_WHEEL_OK"
      }
    },
    {
      id: 1,
      title: "Mode automatique intelligent",
      desc: "Laissez votre LUMEBOARD faire le spectacle. Cycles de gradients dynamiques et fluides programmables en vitesse lente ou énergique.",
      icon: RefreshCw,
      mockupBg: "bg-gradient-to-tr from-violet-600 via-[#FF006E] to-amber-500",
      accentColor: "#8B00FF",
      mockupUI: {
        title: "Auto Cycle",
        detail: "Vitesse : 0.4 Hz (Fluide)",
        metric: "Gradient Actif",
        visualWord: "AUTOLOOP_ENGAGED"
      }
    },
    {
      id: 2,
      title: "Mode réactif (Gyroscopique)",
      desc: "Synchronisez l'angle et l'intensité de votre virage avec les carres LED. Plus vous appuyez votre courbe, plus la couleur s'intensifie.",
      icon: Activity,
      mockupBg: "bg-gradient-to-tr from-emerald-500 to-[#00F5FF]",
      accentColor: "#00FF88",
      mockupUI: {
        title: "Gyro Reactive",
        detail: "Gorce G : active",
        metric: "Sensibilité 95/100",
        visualWord: "GYROSCOPE_RUNNING"
      }
    },
    {
      id: 3,
      title: "Synchronisation musicale",
      desc: "Couplez votre musique Spotify ou Apple Music en Bluetooth. Les LED pulsent au rythme de vos basses préférées dans le casque.",
      icon: Music,
      mockupBg: "bg-gradient-to-tr from-[#FF006E] to-[#8B00FF]",
      accentColor: "#FF006E",
      mockupUI: {
        title: "Sound Sync",
        detail: "BPM Detect : 128",
        metric: "Bass Booster",
        visualWord: "AUDIO_BEATS_SYNC"
      }
    },
    {
      id: 4,
      title: "Autonomie en temps réel",
      desc: "Gardez un œil sur le pourcentage exact de chaque fixation d'une simple consultation. Profil de sécurité thermique inclus.",
      icon: Battery,
      mockupBg: "bg-gradient-to-tr from-green-500 to-emerald-800",
      accentColor: "#00FF88",
      mockupUI: {
        title: "Batterie Statut",
        detail: "Gauche : 88% | Droite : 89%",
        metric: "Temps restant : 5h 20m",
        visualWord: "CELL_STATUS_OPTIMAL"
      }
    },
    {
      id: 5,
      title: "Partage de presets communautaires",
      desc: "Découvrez les setups de lumière créés par d'autres pro-riders dans le monde entier. Sauvegardez et synchronisez en 1 clic.",
      icon: Share2,
      mockupBg: "bg-gradient-to-tr from-[#0066FF] to-[#00F5FF]",
      accentColor: "#0066FF",
      mockupUI: {
        title: "Social Cloud",
        detail: "Setup par Lucas Cham",
        metric: "1.2k téléchargements",
        visualWord: "CLOUD_SYNC_SUCCESS"
      }
    }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef<number>(280);

  // Mettre en cache la largeur du bouton de la liste pour éviter Forced Reflow au scroll
  useEffect(() => {
    const measureCard = () => {
      if (scrollContainerRef.current) {
        const card = scrollContainerRef.current.querySelector("button");
        if (card) {
          cardWidthRef.current = card.clientWidth;
        }
      }
    };
    const timer = setTimeout(measureCard, 100);
    window.addEventListener("resize", measureCard);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measureCard);
    };
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current || window.innerWidth >= 1024) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = cardWidthRef.current;
    const gap = 16; // gap-4 est de 16px
    const index = Math.round(scrollLeft / (cardWidth + gap));
    if (index >= 0 && index < functionalities.length && index !== activeFunc) {
      setActiveFunc(index);
    }
  };

  const handleCardClick = (id: number) => {
    setActiveFunc(id);
    if (scrollContainerRef.current && window.innerWidth < 1024) {
      const container = scrollContainerRef.current;
      const cardWidth = cardWidthRef.current;
      const gap = 16;
      container.scrollTo({
        left: id * (cardWidth + gap),
        behavior: "smooth"
      });
    }
  };

  const currentSetting = functionalities[activeFunc];

  return (
    <section 
      ref={containerRef}
      id="app" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-black py-24 px-6 md:px-16 flex flex-col justify-center overflow-hidden z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.9)]"
    >
      {/* Background aurora matching active state */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full filter blur-[150px] opacity-15 transition-all duration-1000 ease-out z-0 pointer-events-none"
        style={{
          backgroundColor: currentSetting.accentColor,
          left: "60%",
          top: "40%"
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-technical tracking-widest text-emerald-400 uppercase mb-3 block font-semibold">
            SECTION 05 — L'application mobile
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wide leading-none text-white mb-6">
            Votre planche. Votre couleur. Votre identité.
          </h2>
          <p className="text-xl text-neutral-400 font-light font-technical">
            Tout le contrôle dans votre poche.
          </p>
        </div>

        {/* Content Columns: Features click list left vs Interactive Phone on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: clickable functionality list */}
          <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
            <p className="text-sm font-light text-neutral-400 max-w-xl leading-relaxed mb-6">
              L'application LUMEBOARD transforme votre smartphone en régie lumière. Interface épurée, réponse instantanée via Bluetooth 5.0. Changez de couleur en pleine descente ou partagez à la communauté.
            </p>
            
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex lg:grid overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none no-scrollbar lg:grid-cols-2 gap-4 pb-6 -mx-6 px-6 lg:mx-0 lg:px-0 scroll-smooth"
            >
              {functionalities.map((func, index) => {
                const Icon = func.icon;
                const isSelected = activeFunc === func.id;

                return (
                  <button
                    key={func.id}
                    onClick={() => handleCardClick(func.id)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-[150px] cursor-pointer snap-center flex-shrink-0 w-[80vw] sm:w-[280px] lg:w-auto lg:flex-shrink ${
                      isSelected 
                        ? "bg-neutral-900 border-neutral-700 shadow-xl" 
                        : "bg-neutral-950/40 border-neutral-900/60 hover:bg-neutral-950 hover:border-neutral-800"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                        style={{
                          backgroundColor: isSelected ? `${func.accentColor}15` : '#171717',
                          color: isSelected ? func.accentColor : '#888888'
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-600">0{func.id + 1}</span>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-white tracking-wide uppercase font-technical mb-1">
                        {func.title}
                      </h3>
                      <p className="text-[11px] font-light text-neutral-500 line-clamp-2">
                        {func.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Block: Floating smartphone mockup (Perspective hover) */}
          <div 
            className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2"
            style={{ perspective: 1200 }}
          >
            
            {/* Custom 3D perspective wrapper */}
            <motion.div
              initial={{ rotateY: -15, rotateX: 10, scale: 1, y: 30, opacity: 0 }}
              animate={isInView 
                ? { 
                    rotateY: typeof window !== "undefined" && window.innerWidth >= 1024 ? mousePos.x * 40 - 5 : 0,
                    rotateX: typeof window !== "undefined" && window.innerWidth >= 1024 ? -mousePos.y * 40 + 5 : 0, 
                    scale: isHovered && typeof window !== "undefined" && window.innerWidth >= 1024 ? 1.05 : 1, 
                    y: 0, 
                    opacity: 1 
                  } 
                : { rotateY: -15, rotateX: 10, scale: 1, y: 30, opacity: 0 }
              }
              transition={{ type: "spring", stiffness: 100, damping: 22, mass: 0.5 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-[240px] h-[480px] bg-neutral-950 border-[6px] border-neutral-800 rounded-[38px] p-3 shadow-2xl flex flex-col justify-between select-none"
              style={{
                boxShadow: `0 25px 60px -15px ${currentSetting.accentColor}25, 0 0 1px 1px ${currentSetting.accentColor}20`,
                transformStyle: "preserve-3d",
                perspective: 1000
              }}
              id="smartphone-mockup"
            >
              {/* Phone Speaker Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-800 rounded-b-xl z-20 flex justify-center items-center">
                <div className="w-10 h-1 bg-black rounded-full" />
              </div>

              {/* Real-time reactive screen UI */}
              <div className="relative w-full h-full bg-neutral-900 rounded-[28px] overflow-hidden flex flex-col justify-between py-6 px-4 border border-neutral-800">
                
                {/* Glass shine sweep reflection */}
                <div className="absolute inset-0 pointer-events-none rounded-[28px] overflow-hidden z-30">
                  <motion.div 
                    animate={{
                      left: ["-100%", "200%"]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 4
                    }}
                    className="absolute top-0 w-1/2 h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[25deg] origin-top-left -translate-y-1/4"
                  />
                </div>

                {/* Header Status of App */}
                <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 mt-2 z-20">
                  <span>LUMEBOARD OS</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>BLE_LIVE</span>
                  </div>
                </div>

                {/* Simulated UI Content */}
                <div className="flex-1 flex flex-col justify-center items-center text-center py-4 z-20">
                  <div className="mb-3">
                    <Smartphone className="w-6 h-6 text-neutral-400 mb-1 mx-auto" />
                    <span className="text-[9px] uppercase font-mono tracking-widest text-[#FF006E]">
                      active_module
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSetting.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2 w-full flex flex-col items-center"
                    >
                      {/* Interactive Visual Element: SVG Snowboard with bluetooth waves */}
                      <div className="w-full h-36 flex items-center justify-center relative overflow-hidden bg-black/40 rounded-2xl border border-neutral-800/50">
                        
                        {/* Radiating wave rings behind the board (Bluetooth/Energy pulse) - Desktop only */}
                        <div className="hidden lg:flex absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                          <motion.div 
                            animate={{ scale: [0.8, 1.8, 0.8], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="w-16 h-16 rounded-full border border-dashed absolute"
                            style={{ borderColor: currentSetting.accentColor }}
                          />
                          <motion.div 
                            animate={{ scale: [1, 2.2, 1], opacity: [0.15, 0, 0.15] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="w-16 h-16 rounded-full border absolute"
                            style={{ borderColor: currentSetting.accentColor }}
                          />
                        </div>

                        {/* Interactive Board representation */}
                        <motion.div
                          animate={{
                            rotate: currentSetting.id === 2 
                              ? [0, -10, 10, -10, 0] // Gyro Reactive tilt loop
                              : 0,
                            scale: currentSetting.id === 3
                              ? [1, 1.05, 0.95, 1.05, 1] // Sound Sync beat pulse
                              : 1
                          }}
                          transition={{
                            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            scale: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
                          }}
                          className="relative z-10 w-12 h-28 flex items-center justify-center"
                        >
                          {/* The Snowboard Shape */}
                          <svg className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]" viewBox="0 0 50 120">
                            {/* Board Base Outline */}
                            <path 
                              d="M 25,5 C 33,5 34,20 33,40 C 32,60 32,60 33,80 C 34,100 33,115 25,115 C 17,115 16,100 17,80 C 18,60 18,60 17,40 C 16,20 17,5 25,5 Z" 
                              fill="#111111" 
                              stroke="#222222" 
                              strokeWidth="1.5" 
                            />

                            {/* Left LED Edge neon strip */}
                            <motion.path 
                              d="M 17,40 C 18,60 18,60 17,80" 
                              fill="none" 
                              animate={{
                                stroke: currentSetting.accentColor,
                                opacity: currentSetting.id === 5 ? [0.3, 1, 0.3] : 1
                              }}
                              transition={{ duration: 1, repeat: Infinity }}
                              strokeWidth="2.5" 
                              className="blur-[1px]"
                            />
                            <path 
                              d="M 17,40 C 18,60 18,60 17,80" 
                              fill="none" 
                              stroke="#ffffff" 
                              strokeWidth="1" 
                            />

                            {/* Right LED Edge neon strip */}
                            <motion.path 
                              d="M 33,40 C 32,60 32,60 33,80" 
                              fill="none" 
                              animate={{
                                stroke: currentSetting.accentColor,
                                opacity: currentSetting.id === 5 ? [0.3, 1, 0.3] : 1
                              }}
                              transition={{ duration: 1, repeat: Infinity }}
                              strokeWidth="2.5" 
                              className="blur-[1px]"
                            />
                            <path 
                              d="M 33,40 C 32,60 32,60 33,80" 
                              fill="none" 
                              stroke="#ffffff" 
                              strokeWidth="1" 
                            />

                            {/* Dynamic charging wave animation for Battery mode (id === 4) */}
                            {currentSetting.id === 4 && (
                              <motion.circle 
                                cx="25" 
                                r="3"
                                fill="#00FF88"
                                initial={{ cy: 115 }}
                                animate={{ cy: 5 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                className="blur-[1px]"
                              />
                            )}
                          </svg>
                        </motion.div>
                      </div>

                      <h4 className="text-white text-xs font-technical uppercase font-semibold tracking-wider mt-2">
                        {currentSetting.mockupUI.title}
                      </h4>
                      <p className="text-neutral-400 text-[10px] font-light max-w-[150px] leading-tight">
                        {currentSetting.mockupUI.detail}
                      </p>
                      <p className="text-[8px] font-mono text-neutral-500 bg-black/60 rounded px-2 py-0.5 inline-block">
                        {currentSetting.mockupUI.visualWord}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Quick Interactive Slide Bar at the bottom of device */}
                <div className="space-y-2 z-20">
                  <div className="h-1 bg-neutral-800 rounded-full w-full overflow-hidden">
                    <motion.div 
                      key={currentSetting.id}
                      initial={{ width: "20%" }}
                      animate={{ width: "90%" }}
                      className="h-full"
                      style={{ backgroundColor: currentSetting.accentColor }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[8px] font-mono text-neutral-400">
                    <span>{currentSetting.mockupUI.metric}</span>
                    <span>v2.1</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
