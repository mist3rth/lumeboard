import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, HelpCircle, ShoppingCart } from "lucide-react";

interface NavbarProps {
  onNavClick: (anchor: string) => void;
  onPreOrderClick: () => void;
}

const getSectionColor = (id: string) => {
  switch (id) {
    case "problem": return "#00F5FF"; // Cyan
    case "product": return "#FF006E"; // Pink
    case "tech": return "#00F5FF";    // Cyan
    case "experience": return "#8B00FF"; // Violet
    case "app": return "#10B981";     // Emerald Green
    case "gamme": return "#00FF88";   // Neon Green
    default: return "#FFFFFF";
  }
};

export default function Navbar({ onNavClick, onPreOrderClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
      if (window.innerWidth >= 1000) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // initial check
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["problem", "product", "tech", "experience", "app", "gamme"];
      
      if (window.scrollY < 150) {
        setActiveSection("");
        return;
      }

      let currentActive = "";
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // Exception pour la section sticky 'experience' : 
          // Si l'utilisateur a déjà défilé jusqu'à l'application (#app) ou plus bas, 'experience' n'est plus active
          if (sectionId === "experience") {
            const appElement = document.getElementById("app");
            if (appElement) {
              const appRect = appElement.getBoundingClientRect();
              if (appRect.top <= window.innerHeight * 0.45) {
                continue;
              }
            }
          }

          // If the section is currently in view (takes up the middle part of screen)
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.3) {
            currentActive = sectionId;
          }
        }
      }
      
      // Met à jour la section active (permet également de réinitialiser à "" pour les sections hors navigation comme la 06)
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run immediately

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled 
          ? "bg-black/80 backdrop-blur-md border-b border-white/5" 
          : "bg-transparent border-b border-transparent"
      }`}
      id="global-navbar"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Branding Pill */}
        <div 
          onClick={() => onNavClick("hero")}
          className="flex items-center gap-2 cursor-pointer bg-neutral-900/90 backdrop-blur border border-neutral-800 hover:border-neutral-700 rounded-full pl-3 pr-5 py-2 transition-all duration-300 group"
          id="navbar-brand-pill"
        >
          <svg viewBox="0 0 256 256" className="h-5 w-5 overflow-visible">
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
          <span className="text-white text-xs font-semibold tracking-[0.2em] font-display group-hover:text-white/90 transition-colors">
            LUMEBOARD
          </span>
        </div>

        {/* Center Anchored pill menu on Desktop */}
        {!isMobile && (
          <div 
            className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur border border-neutral-800/80 rounded-full px-2 py-1.5 relative"
            id="navbar-menu-pill"
          >
            {[
              { id: "problem", label: "L'éveil" },
              { id: "product", label: "L'innovation" },
              { id: "tech", label: "La technologie" },
              { id: "experience", label: "La nuit" },
              { id: "app", label: "Application" },
              { id: "gamme", label: "Les planches" }
            ].map((item) => {
              const isActive = activeSection === item.id;
              const activeColor = getSectionColor(item.id);
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(item.id);
                  }}
                  className={`text-neutral-400 hover:text-white transition-all duration-300 text-xs font-technical tracking-wide px-4 py-1.5 relative z-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-full`}
                  style={{
                    color: isActive ? "#FFFFFF" : undefined,
                  }}
                  id={`nav-item-${item.id}`}
                >
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavNeonLine"
                      className="absolute -bottom-1.5 left-2 right-2 h-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, ${activeColor} 50%, transparent 100%)`,
                        boxShadow: `0 0 10px ${activeColor}, 0 0 20px ${activeColor}80`
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {/* L'astuce du CSS Grid : on superpose le texte normal et le texte en gras (invisible).
                      Ainsi, le bouton prend toujours la largeur du texte gras, et rien ne bouge ! */}
                  <span className="relative inline-grid place-items-center">
                    <span className={`col-start-1 row-start-1 transition-all duration-300 ${isActive ? 'font-semibold' : 'font-normal'}`}>
                      {item.label}
                    </span>
                    <span className="col-start-1 row-start-1 font-semibold invisible pointer-events-none" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        )}

        {/* Right action button spacer or premium burger button */}
        {!isMobile ? (
          <div id="navbar-cta-right" className="w-[150px] hidden md:block" />
        ) : (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-neutral-900/90 backdrop-blur border border-neutral-800 hover:border-neutral-700 active:scale-95 transition-all duration-300 relative z-50 cursor-pointer overflow-hidden group"
            aria-expanded={isMenuOpen}
            aria-label="Menu principal"
          >
            {/* Lueur d'arrière-plan au hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* 3 lignes animées */}
            <div className="flex flex-col gap-[5px] relative z-10 w-5 items-start">
              <motion.div
                animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-[2px] w-full rounded-full bg-gradient-to-r from-[#00F5FF] to-[#FF006E]"
              />
              <motion.div
                animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="h-[2px] w-3/4 rounded-full bg-[#00FF88]"
              />
              <motion.div
                animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-[2px] w-full rounded-full bg-gradient-to-r from-[#8B00FF] to-[#00F5FF]"
              />
            </div>
          </button>
        )}

      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-black border-t border-white/5 z-40 flex flex-col justify-start gap-12 px-8 py-12 overflow-y-auto"
          >
            {/* Subtle premium background glow to add depth */}
            <div className="absolute -left-1/4 -bottom-1/4 w-96 h-96 rounded-full bg-[#00F5FF]/10 blur-3xl pointer-events-none" />
            <div className="absolute -right-1/4 -top-1/4 w-96 h-96 rounded-full bg-[#FF006E]/10 blur-3xl pointer-events-none" />
            
            {/* Menu Links */}
            <div className="flex flex-col gap-6 relative z-10">
              {[
                { id: "problem", label: "L'éveil" },
                { id: "product", label: "L'innovation" },
                { id: "tech", label: "La technologie" },
                { id: "experience", label: "La nuit" },
                { id: "app", label: "Application" },
                { id: "gamme", label: "Les planches" }
              ].map((item, index) => {
                const isActive = activeSection === item.id;
                const activeColor = getSectionColor(item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavClick(item.id);
                        setIsMenuOpen(false);
                      }}
                      className="text-2xl font-display font-light tracking-wider flex items-center justify-between group py-2"
                      style={{
                        color: isActive ? activeColor : "#a3a3a3",
                      }}
                    >
                      <span className="group-hover:text-white transition-colors duration-300">
                        {item.label}
                      </span>
                      <span 
                        className="w-2.5 h-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          backgroundColor: activeColor,
                          boxShadow: `0 0 10px ${activeColor}`
                        }}
                      />
                    </a>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Mobile menu footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="border-t border-white/10 pt-8 flex flex-col gap-4"
            >
              <div className="text-xs text-neutral-500 font-technical tracking-widest">
                LUMEBOARD — RIDE THE LIGHT.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
