import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Section06Riders() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // GSAP Timeline pour animer le slide horizontal au scroll avec Pinning natif
  useGSAP(() => {
    if (!containerRef.current || !cardsRef.current) return;

    // Timeline synchrone avec le défilement vertical du wrapper
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2, // Ajoute une inertie de 1.2s pour lisser les crans de la molette de souris
      }
    });

    // Déplacement horizontal : se termine à 85% (0.85) pour la pause stable
    tl.to(cardsRef.current, {
      x: "-52vw",
      ease: "none",
      duration: 0.85,
      force3D: true, // Force l'accélération matérielle (GPU)
    }, 0);

    // Fade in dynamique de l'ambiance lumineuse
    if (glowRef.current) {
      tl.fromTo(glowRef.current, 
        { opacity: 0.8 },
        { opacity: 1, ease: "none", duration: 0.8 },
        0
      );
    }

    // Gestion propre de will-change: transform uniquement pendant le scroll actif dans le viewport
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        if (cardsRef.current) cardsRef.current.style.willChange = "transform";
      },
      onLeave: () => {
        if (cardsRef.current) cardsRef.current.style.willChange = "auto";
      },
      onEnterBack: () => {
        if (cardsRef.current) cardsRef.current.style.willChange = "transform";
      },
      onLeaveBack: () => {
        if (cardsRef.current) cardsRef.current.style.willChange = "auto";
      }
    });

  }, { scope: containerRef });

  const riders = [
    {
      id: 0,
      name: "Lucas",
      age: 24,
      role: "Rider Freestyle",
      location: "Chamonix",
      team: "Chamonix Pro-Division",
      board: "LUMEBOARD SHADOW",
      lumens: "1800 LUMENS",
      specs: ["CAMBER: CAMBER-OUT", "STANCE: 54cm", "SPIN: 1080° ACTIVE"],
      quote: "La première fois que j'ai allumé les LEDs sur une piste de nuit, les autres riders se sont arrêtés pour regarder. C'est devenu mon identité sur la montagne.",
      image: "/rider_lucas.webp",
      accentColor: "#8B00FF",
      glowColor: "rgba(139, 0, 255, 0.4)",
      borderColor: "border-[#8B00FF]/30",
      accentText: "text-[#8B00FF]"
    },
    {
      id: 1,
      name: "Inès",
      age: 29,
      role: "Snowboardeuse Freeride",
      location: "Les Arcs",
      team: "Les Arcs Freeride Team",
      board: "LUMEBOARD AURORA",
      lumens: "2400 LUMENS",
      specs: ["CAMBER: POWDER ROCKER", "STANCE: 52cm", "POWDER: FLOATING NOSE"],
      quote: "Je pensais que c'était juste beau. En réalité c'est aussi fonctionnel, on me voit de loin, les autres skieurs m'évitent. C'est une sécurité en plus.",
      image: "/rider_ines.webp",
      accentColor: "#FF006E",
      glowColor: "rgba(255, 0, 110, 0.4)",
      borderColor: "border-[#FF006E]/30",
      accentText: "text-[#FF006E]"
    },
    {
      id: 2,
      name: "Théo",
      age: 19,
      role: "Compétiteur Halfpipe",
      location: "Tignes",
      team: "Tignes Competition Team",
      board: "LUMEBOARD APEX",
      lumens: "2400 LUMENS",
      specs: ["CAMBER: CAMBER CLASSIQUE", "STANCE: 56cm", "CARVING: EXTREME GRIP"],
      quote: "En compétition de nuit, c'est un avantage visuel énorme. Le jury te remarque, le public aussi. LUMEBOARD c'est du show.",
      image: "/rider_theo.webp",
      accentColor: "#0066FF",
      glowColor: "rgba(0, 102, 255, 0.4)",
      borderColor: "border-[#0066FF]/30",
      accentText: "text-[#0066FF]"
    }
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative h-[180vh] md:h-[230vh] bg-black"
      id="testi-wrapper"
    >
      {/* Conteneur Sticky bloqué de manière native par le navigateur (zéro lag) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-[#030303] z-10">
        
        {/* Lueur d'ambiance dynamique */}
        <div 
          ref={glowRef}
          className="absolute w-[450px] h-[450px] rounded-full bg-[#8B00FF]/5 filter blur-[150px] top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto w-full px-6 md:px-16 mb-10 relative z-10 flex-shrink-0">
          <span className="text-xs font-technical tracking-widest text-[#8B00FF] uppercase mb-3 block font-semibold">
            SECTION 06 — Témoignages & Team
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wide leading-none text-white">
            Ils ont vu la lumière.
          </h2>
          <p className="text-sm font-light text-neutral-400 font-technical mt-2">
            Faites glisser la montagne pour découvrir la team.
          </p>
        </div>

        {/* --- DESKTOP INTERACTION: STICKY SCROLL HORIZONTAL (md et supérieur) --- */}
        <div className="hidden md:block relative w-full overflow-hidden select-none">
          <div 
            ref={cardsRef}
            className="flex gap-8 px-16 w-[150vw]"
          >
            {riders.map((rider) => (
              <div
                key={rider.id}
                className={`relative w-[46vw] h-[55vh] min-h-[420px] aspect-[16/10] bg-neutral-950/90 border ${rider.borderColor} rounded-[36px] overflow-hidden flex flex-col justify-end p-8 md:p-10 shadow-2xl`}
              >
                {/* Rider Background image with parallax scale effect */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                    src={rider.image} 
                    alt={rider.name}
                    className="w-full h-full object-cover opacity-35 select-none pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent z-10" />
                </div>

                {/* HUD Telemetry Overlay (z-20) */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 items-end z-20">
                  <div 
                    className={`px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border ${rider.borderColor} text-[9px] font-mono tracking-widest flex items-center gap-1.5 ${rider.accentText}`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{rider.board}</span>
                  </div>
                  <div 
                    className="px-3 py-1 rounded-full bg-neutral-900/60 backdrop-blur border border-neutral-800 text-[8px] font-mono tracking-widest text-neutral-400"
                  >
                    💡 {rider.lumens}
                  </div>
                </div>

                <div className="absolute top-6 left-6 z-20">
                  <Quote className="w-12 h-12 text-white/5 stroke-[1.5]" />
                </div>

                {/* Card Content (z-20) */}
                <div className="relative z-20 space-y-4">
                  
                  {/* Quote text */}
                  <p className="text-base md:text-lg text-neutral-100 font-light italic leading-relaxed max-w-xl">
                    "{rider.quote}"
                  </p>

                  <div className="pt-5 border-t border-neutral-900 flex flex-wrap gap-4 items-center justify-between">
                    <div>
                      <h3 className="text-xl font-technical font-semibold tracking-wide text-white flex items-center gap-2">
                        {rider.name} 
                        <span className="text-xs font-light text-neutral-500 font-sans tracking-normal capitalize">{rider.age} ans</span>
                      </h3>
                      <p className="text-xs text-neutral-400 font-light mt-0.5">
                        {rider.role} — <span className="font-mono text-[10px] text-neutral-500">{rider.location}</span>
                      </p>
                    </div>

                    {/* Team tag & telemetry bullets */}
                    <div className="flex flex-col gap-1 items-end text-right">
                      <span className={`text-[10px] font-mono tracking-widest uppercase ${rider.accentText} font-semibold`}>
                        // {rider.team}
                      </span>
                      <div className="flex gap-2.5 mt-1">
                        {rider.specs.map((sp, idx) => (
                          <span 
                            key={idx} 
                            className="text-[8px] font-mono text-neutral-500 bg-neutral-900/60 px-2 py-0.5 rounded border border-neutral-900"
                          >
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- MOBILE RESPONSIVE LAYOUT: VERTICAL STACK / CAROUSEL (sm et inférieur) --- */}
        <div className="block md:hidden overflow-x-auto w-full px-6 select-none scrollbar-none py-4">
          <div className="flex gap-6 w-[270vw]">
            {riders.map((rider) => (
              <div
                key={rider.id}
                className={`relative w-[85vw] h-[50vh] min-h-[380px] bg-neutral-950/90 border ${rider.borderColor} rounded-[28px] overflow-hidden flex flex-col justify-end p-6 shadow-xl`}
              >
                {/* Mobile image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={rider.image} 
                    alt={rider.name}
                    className="w-full h-full object-cover opacity-65 select-none pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent z-10" />
                </div>

                {/* Mobile top HUD */}
                <div className="absolute top-5 right-5 flex flex-col gap-1 items-end z-20">
                  <span className={`px-2.5 py-1 rounded-full bg-black/60 border ${rider.borderColor} text-[8px] font-mono ${rider.accentText}`}>
                    {rider.board}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-900/60 text-[7px] font-mono text-neutral-400">
                    💡 {rider.lumens}
                  </span>
                </div>

                <div className="relative z-20 space-y-3">
                  <p className="text-sm text-neutral-200 font-light italic leading-relaxed">
                    "{rider.quote}"
                  </p>

                  <div className="pt-4 border-t border-neutral-900/80 flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-technical font-semibold text-white">
                        {rider.name}, {rider.age} ans
                      </h3>
                      <p className="text-[10px] text-neutral-400 font-light mt-0.5">
                        {rider.role}
                      </p>
                    </div>

                    <span className={`text-[8px] font-mono tracking-widest ${rider.accentText} uppercase`}>
                      {rider.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
