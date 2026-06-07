import { Volume2, VolumeX } from "lucide-react";

// Import modular layouts
import Navbar from "./components/sections/Navbar";
import Section00Hero from "./components/sections/Section00Hero";
import Section01Problem from "./components/sections/Section01Problem";
import Section02Revelation from "./components/sections/Section02Revelation";
import Section03TechDetails from "./components/sections/Section03TechDetails";
import Section04NightRide from "./components/sections/Section04NightRide";
import Section05MobileApp from "./components/sections/Section05MobileApp";
import Section06Riders from "./components/sections/Section06Riders";
import Section07ProductRange from "./components/sections/Section07ProductRange";
import Section08FinalCTA from "./components/sections/Section08FinalCTA";
import Section09Footer from "./components/sections/Section09Footer";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { SEO } from "./components/SEO";

import { useAudioImmersion } from "./contexts/AudioContext";
import { useModals } from "./contexts/ModalContext";
import { PreorderModal } from "./components/modals/PreorderModal";
import { ContactModal } from "./components/modals/ContactModal";

export default function App() {
  const { soundEnabled, toggleSound } = useAudioImmersion();
  const { triggerPreOrder, openContactModal } = useModals();

  // Unified dynamic navigations anchor click
  const handleNavigate = (targetId: string) => {
    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Redirection intelligente pour la section sticky experience vers son ancrage statique
      const scrollTarget = targetId === "experience" ? "experience-anchor" : targetId;
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="relative bg-black min-h-screen text-white select-none selection:bg-[#00F5FF]/30 overflow-clip font-sans">
        <SEO />
        
        {/* Immersive Audio Ambient Toggle Pill */}
      <div className="fixed bottom-6 right-6 z-40" id="sound-immersion-pill">
        <button
          onClick={toggleSound}
          className="bg-neutral-900/90 hover:bg-neutral-800 backdrop-blur-md border border-neutral-800 hover:border-neutral-700 text-white rounded-full pl-3 pr-4 py-2.5 flex items-center gap-2 text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00FF88]"
          title="Activer l'univers sonore de la glisse de nuit"
          aria-label={soundEnabled ? "Désactiver l'univers sonore" : "Activer l'univers sonore"}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#00FF88] animate-pulse" />
              <span>AMB_ACTIVE</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
              <span>AMB_DESACTIVE</span>
            </>
          )}
        </button>
      </div>

      {/* Floating Glassy Header Menu */}
      <Navbar 
        onNavClick={handleNavigate} 
        onPreOrderClick={() => triggerPreOrder()} 
      />

      {/* Immersive sections in strict sequence */}
      <Section00Hero 
        onDiscoverClick={() => handleNavigate("problem")} 
        onPreOrderClick={() => triggerPreOrder()} 
      />
      
      <div className="relative z-10 bg-black shadow-[0_-30px_60px_rgba(0,0,0,1)] mt-[100vh]">
        <Section01Problem />

        <div className="relative z-30 lg:mt-[-100vh]">
          <Section02Revelation />

          <Section03TechDetails />

          {/* Ancrage statique invisible servant de cible de défilement pour la section sticky suivante */}
          <div id="experience-anchor" className="h-0 w-0 pointer-events-none" />
          <Section04NightRide />
        </div>

        <Section05MobileApp />

        <Section06Riders />

        <Section07ProductRange 
          onPreOrderClick={(name, price) => triggerPreOrder(name, price)} 
        />

        <div className="relative z-20 bg-black">
          {/* Conteneur opaque interne pour masquer le footer sous la section 8 */}
          <div className="relative z-10 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
            <Section08FinalCTA 
              onPreOrderClick={(name, price) => triggerPreOrder(name, price)} 
              onContactClick={() => openContactModal()} 
            />
          </div>

          {/* Le footer est positionné ici, à l'intérieur du conteneur parent z-20, devenant ainsi sticky uniquement à partir de la section 8 */}
          <Section09Footer 
            onNavClick={handleNavigate} 
            onContactClick={() => openContactModal()} 
          />
        </div>
      </div>

      <PreorderModal />
      <ContactModal />
    </div>
    </ErrorBoundary>
  );
}
