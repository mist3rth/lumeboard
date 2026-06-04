import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getAssetPath } from "../../utils/assets";

gsap.registerPlugin(ScrollTrigger);

export default function Section01Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const contentLayerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  const isHeadingInView = useInView(sectionRef, { once: false, amount: 0.15 });

  // GSAP SCROLL ANIMATION (Super smooth with scrub)
  useGSAP(() => {
    if (!containerRef.current || !contentLayerRef.current || !textLayerRef.current) return;

    // Set initial state for the text layer so it's ready before scroll
    gsap.set(textLayerRef.current, { y: "100vh", opacity: 0, scale: 0.8 });

    // Timeline mapped to the scroll progress of the container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true, // Synchro parfaite avec le scroll natif
      }
    });

    // 0.0 -> 0.25 : Fade out de la section 1 initiale
    tl.to(contentLayerRef.current, { opacity: 0, ease: "none", duration: 0.25 }, 0);

    // 0.05 -> 0.30 : Le texte "NEW RULES" remonte du bas vers le centre
    tl.to(textLayerRef.current, { 
      y: "0vh", 
      opacity: 1, 
      scale: 1, 
      ease: "power1.out",
      force3D: true,
      duration: 0.25 
    }, 0.05);

    // 0.30 -> 0.55 : Enchaînement immédiat ! Dès qu'il arrive, il explose sans aucune pause.
    tl.to(textLayerRef.current, { 
      scale: 12, 
      opacity: 0, 
      ease: "power2.in",
      force3D: true, 
      duration: 0.25 
    }, 0.30);

  }, { scope: containerRef });

  const paragraphs = [
    "La montagne est magnifique de nuit.",
    "Les pistes sont désertes. La neige est parfaite.",
    "Pourtant, chaque soir, les riders rentrent.",
    "Non pas par manque d'envie,",
    "mais par manque de lumière.",
    "Jusqu'à maintenant."
  ];

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-black" id="problem-wrapper">
      
      {/* Anchor node for Navbar active tracking */}
      <div id="problem" className="absolute top-0 w-full h-[100vh] pointer-events-none" />

      {/* Sticky Frame Viewer - locks Section 1 static in viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-10">

        {/* Ambient deep dark background space */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#00F5FF]/4 via-transparent to-transparent pointer-events-none" />

        {/* --- LAYER 1: SECTION 01 CONTENT (Editorial Intro) --- */}
        <div
          ref={contentLayerRef}
          className="max-w-7xl mx-auto w-full px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 will-change-transform"
        >
          {/* Left Block: Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center" ref={sectionRef}>
            <span className="text-xs font-technical tracking-widest text-[#00F5FF] uppercase mb-4 block font-semibold">
              SECTION 01 — L'éveil
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-3xl xl:text-6xl font-display uppercase tracking-wide text-white leading-tight mb-8">
              Le snowboard s'arrête <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-white to-neutral-500">
                quand le soleil se couche.
              </span>
            </h2>

            <div className="space-y-2">
              {paragraphs.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.12,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`text-base md:text-md lg:text-lg font-light text-neutral-300 leading-snug ${
                    line === "Jusqu'à maintenant." ? "text-[#00F5FF] font-normal tracking-wide pt-1.5" : ""
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right Block: Image with Ambient Scanning Laser */}
          <div className="lg:col-span-6 w-full flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isHeadingInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[500px] h-[320px] md:h-[420px] bg-neutral-950 border border-neutral-900/80 rounded-[32px] overflow-hidden group shadow-2xl transition-all duration-700 hover:border-[#00F5FF]/60 hover:shadow-[0_0_45px_rgba(0,245,255,0.3)] cursor-pointer"
            >
              <img 
                src={getAssetPath("/hero_image.webp")} 
                alt="Snowboarder climbing mountain in the dark" 
                className="absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-110 select-none pointer-events-none opacity-80"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00F5FF]/5 to-[#00F5FF]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-screen" />

              <div className="absolute inset-0 blur-sm pointer-events-none mix-blend-screen opacity-50">
                <motion.div 
                  animate={{
                    x: ["0%", "100%", "0%"],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-[4px] h-[200%] bg-gradient-to-b from-cyan-400 via-transparent to-transparent origin-top rotate-[25deg]"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-6 left-6 right-6">
                <p className="text-xs font-mono uppercase tracking-widest text-[#00F5FF]">
                  // MOUNTAIN NIGHT SHIFT
                </p>
              </div>
            </motion.div>
          </div>
        </div>


        {/* --- LAYER 2: CINEMATIC "NEW RULES" TEXT INTRO SPECTACULAR --- */}
        {/* z-40 pour que le texte puisse grossir et passer PAR-DESSUS la section 2 qui arrive */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-40 px-6">
          <div
            ref={textLayerRef}
            className="flex flex-col items-center"
            style={{ willChange: "transform, opacity", transformStyle: "preserve-3d" }}
          >
            <h2 
              className="text-[12vw] sm:text-[13vw] font-display font-black tracking-tight uppercase leading-none text-center text-white select-none"
            >
              NEW RULES
            </h2>

            <div 
              className="h-[2px] w-24 bg-[#00F5FF] mt-6" 
            />

            <p className="text-xs md:text-sm font-technical uppercase tracking-[0.4em] text-[#00F5FF] mt-5 opacity-95">
              // BRISER LES CODES DE LA NUIT
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
