import { useState, useEffect, useRef } from "react";
import { Instagram, Youtube, Compass, ArrowUp, Send } from "lucide-react";
import useVideoController from "../../hooks/useVideoController";
import { getAssetPath } from "../../utils/assets";

interface FooterProps {
  onNavClick: (anchor: string) => void;
  onContactClick: () => void;
}

export default function Section09Footer({ onNavClick, onContactClick }: FooterProps) {
  const [isNearFooter, setIsNearFooter] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hook de contrôle automatique de lecture du média selon sa visibilité
  useVideoController(videoRef);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Détecteur de proximité pour précharger la vidéo à l'approche de la Section 7/8
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNearFooter(true);
            observer.disconnect(); // Une fois chargé, on garde l'élément
          }
        });
      },
      {
        rootMargin: "800px", // Déclenche 800px avant d'entrer dans l'écran
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative lg:sticky lg:bottom-0 z-10 lg:z-0 w-full bg-black border-t border-neutral-900/60 pt-20 pb-20 md:pb-64 px-6 md:px-16 overflow-hidden">
      
      {/* Background soft ambiance reflection */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#00F5FF]/5 filter blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10" id="footer-main-container">
        
        {/* Main Grid: Info + Link blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
          
          {/* Logo & branding */}
          <div className="md:col-span-4 space-y-4">
            <div 
            onClick={() => onNavClick("hero")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <svg viewBox="0 0 256 256" className="h-6 w-6 overflow-visible transform group-hover:rotate-12 transition-transform duration-300">
              <path 
                d="M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z" 
                className="fill-white transition-all duration-500 ease-out group-hover:fill-[#00F5FF] group-hover:drop-shadow-[0_0_10px_rgba(0,245,255,0.8)]" 
              />
              <path 
                d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" 
                className="fill-white transition-all duration-500 ease-out delay-75 group-hover:fill-[#FF006E] group-hover:drop-shadow-[0_0_10px_rgba(255,0,110,0.8)]" 
              />
              <path 
                d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z" 
                className="fill-white transition-all duration-500 ease-out delay-150 group-hover:fill-[#00FF88] group-hover:drop-shadow-[0_0_10px_rgba(0,255,136,0.8)]" 
              />
              <path 
                d="M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" 
                className="fill-white transition-all duration-500 ease-out delay-200 group-hover:fill-[#8B00FF] group-hover:drop-shadow-[0_0_10px_rgba(139,0,255,0.8)]" 
              />
            </svg>
            
            <span 
              className="text-xl font-display uppercase tracking-widest text-white transition-colors duration-300 group-hover:text-white/90"
            >
              LUMEBOARD
            </span>
          </div>

            <p className="text-xs font-technical tracking-wider italic text-neutral-400">
              Ride the light. La montagne n'a plus de nuit.
            </p>

            <p className="text-xs font-light text-neutral-500 max-w-xs leading-relaxed">
              Design futuriste breveté intégrant notre cœur de technologie d’éclairage chromatique au service des snowboarders.
            </p>
          </div>

          {/* Column Links: Navigation (sur 2 colonnes pour réduire la hauteur) */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00F5FF] font-semibold">
              // Navigation
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-xs font-light text-neutral-400">
              <li>
                <a href="#hero" onClick={(e) => { e.preventDefault(); onNavClick("hero"); }} className="hover:text-white transition-colors">
                  LUMEBOARD Intro
                </a>
              </li>
              <li>
                <a href="#problem" onClick={(e) => { e.preventDefault(); onNavClick("problem"); }} className="hover:text-white transition-colors">
                  L'éveil
                </a>
              </li>
              <li>
                <a href="#product" onClick={(e) => { e.preventDefault(); onNavClick("product"); }} className="hover:text-white transition-colors">
                  L'innovation
                </a>
              </li>
              <li>
                <a href="#tech" onClick={(e) => { e.preventDefault(); onNavClick("tech"); }} className="hover:text-white transition-colors">
                  La technologie
                </a>
              </li>
              <li>
                <a href="#experience" onClick={(e) => { e.preventDefault(); onNavClick("experience"); }} className="hover:text-white transition-colors">
                  La nuit
                </a>
              </li>
              <li>
                <a href="#app" onClick={(e) => { e.preventDefault(); onNavClick("app"); }} className="hover:text-white transition-colors">
                  Application
                </a>
              </li>
              <li>
                <a href="#gamme" onClick={(e) => { e.preventDefault(); onNavClick("gamme"); }} className="hover:text-white transition-colors">
                  Les planches
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Quick Newsletter submit */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF006E] font-semibold">
              // Réseaux
            </h3>
            <div className="flex items-center gap-4 text-neutral-400">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 border border-neutral-900 rounded-full hover:border-[#FF006E] hover:text-[#FF006E] transition-all"
                aria-label="Suivez LUMEBOARD sur Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 border border-neutral-900 rounded-full hover:border-[#FF006E] hover:text-[#FF006E] transition-all"
                aria-label="Regardez LUMEBOARD sur YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 border border-neutral-900 rounded-full hover:border-[#FF006E] hover:text-[#FF006E] transition-all flex items-center justify-center text-xs font-mono font-bold"
                aria-label="Suivez LUMEBOARD sur TikTok"
              >
                𝓣
              </a>
            </div>

            <button 
              onClick={onContactClick} 
              className="text-[10px] uppercase font-mono tracking-wider text-white bg-neutral-900 px-3 py-1.5 rounded-full hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3 h-3" /> Contact direct
            </button>
          </div>
        </div>

        {/* Lower row: Copy notes & Scroll-to-top */}
        <div className="bg-black pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-neutral-600">
          <div>
            <span>© 2026 LUMEBOARD inc. — L'illumination de la glisse. <span className="mx-2 text-neutral-800">|</span> Made by <a href="https://mist3rth.github.io/presentMe/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-neutral-800 underline-offset-4">T.THIESSON</a></span>
          </div>

          <button
            onClick={scrollToTop}
            className="group px-3 py-2 border border-neutral-900 hover:border-[#00F5FF]/10 rounded-full hover:text-white transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>RETOUR EN HAUT</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Ambient background video at the bottom of the footer */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] md:h-[400px] overflow-hidden pointer-events-none z-0">
        {/* Gradients to blend seamless with black background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-10" />
        {isNearFooter && (
          <video
            ref={videoRef}
            src={getAssetPath("/footer.webm")}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
          />
        )}
      </div>
    </footer>
  );
}
