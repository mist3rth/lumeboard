import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Hourglass, Lock, Mail, ShieldCheck, RefreshCw, Truck } from "lucide-react";

interface CTAProps {
  onPreOrderClick: (modelName: string, price: number) => void;
  onContactClick: () => void;
}

export default function Section08FinalCTA({ onPreOrderClick, onContactClick }: CTAProps) {
  // Timer Countdown state: 1st Nov 2026
  const targetDate = new Date("2026-11-01T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="cta" 
      className="relative z-10 bg-black shadow-[0_30px_60px_rgba(0,0,0,0.95)] min-h-[90vh] w-full py-24 px-6 md:px-16 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Option D: Ambient background animated auras (GPU optimized) */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.65, 0.4] // Opacité très prononcée (jusqu'à 65%) pour un éclat vibrant
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-25%] left-[-25%] w-[600px] h-[600px] rounded-full bg-[#00F5FF] filter blur-[90px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.58, 0.35] // Opacité jusqu'à 58%
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-25%] right-[-25%] w-[600px] h-[600px] rounded-full bg-[#FF006E] filter blur-[90px] pointer-events-none z-0"
      />

      {/* Visual background atmospheric particle rises */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute bottom-[10%] left-[20%] w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[35%] left-[75%] w-1 h-1 bg-[#8B00FF] rounded-full animate-ping" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-[20%] left-[45%] w-2 h-2 bg-[#FF006E] rounded-full animate-ping" style={{ animationDuration: '3.5s' }} />
        <div className="absolute bottom-[50%] left-[10%] w-1 h-1 bg-[#00FF88] rounded-full animate-ping" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[65%] left-[85%] w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDuration: '4s' }} />
      </div>

      <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black pointer-events-none z-0" />

      {/* Main Content Layout Block */}
      <div className="max-w-4xl mx-auto w-full text-center relative z-10 space-y-10" id="final-cta-content">
        
        {/* Title & intro block */}
        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest text-[#FF006E] uppercase mb-2 block font-semibold">
            SECTION 08 — Réservation
          </span>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display uppercase tracking-wide leading-none text-white select-none">
            La nuit vous appartient.
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 italic font-technical max-w-2xl mx-auto">
            Précommandez votre LUMEBOARD. Livraison automne 2026.
          </p>

          <p className="text-xs md:text-sm font-light text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Soyez parmi les premiers riders à illuminer la montagne. Production limitée pour la première saison. Dépôt de précommande remboursable à tout moment.
          </p>
        </div>

        {/* Countdown Timer Widget details */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-[32px] p-6 max-w-xl mx-auto grid grid-cols-4 gap-4 shadow-xl">
          <div className="col-span-4 pb-2 border-b border-neutral-900 flex justify-between items-center px-2">
            <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
              <Hourglass className="w-3 h-3 text-cyan-400 animate-spin" /> compte à rebours
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#00FF88] uppercase">
              // limited_run_2026
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-3xl md:text-4xl font-light font-technical text-white block">
              {timeLeft.days}
            </span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mt-1">
              jours
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-3xl md:text-4xl font-light font-technical text-white block">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mt-1">
              heures
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-3xl md:text-4xl font-light font-technical text-white block">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mt-1">
              mins
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-3xl md:text-4xl font-light font-technical text-[#FF006E] block animate-pulse">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mt-1">
              secs
            </span>
          </div>
        </div>

        {/* CTA Double action button set */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4" id="cta-button-row">
          
          <motion.button
            onClick={() => onPreOrderClick("LUMEBOARD APEX (All-Mountain)", 749)}
            animate={{
              boxShadow: [
                "0 0 15px 1px rgba(0, 245, 255, 0.4)",
                "0 0 25px 3px rgba(139, 0, 255, 0.3)",
                "0 0 15px 1px rgba(0, 245, 255, 0.4)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#00F5FF] text-black font-semibold rounded-full text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 "
            id="preorder-now-btn"
          >
            <Lock className="w-4 h-4" />
            <span>Précommander maintenant</span>
          </motion.button>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-neutral-800 hover:border-neutral-500 text-neutral-300 hover:text-white rounded-full text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
            id="contact-team-btn"
          >
            <Mail className="w-4 h-4" />
            <span>Contacter l'équipe</span>
          </button>
        </div>

        {/* Option C: Trust badges in cyberpunk HUD style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-neutral-900/60 max-w-3xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-900/50 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-technical text-white font-medium uppercase tracking-wider">Garantie 3 Ans</h4>
              <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed">
                Moulage haut de gamme réalisé à la main dans nos ateliers des Alpes françaises.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-900/50 flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-technical text-white font-medium uppercase tracking-wider">Dépôt Remboursable</h4>
              <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed">
                Annulation simple en un clic depuis votre espace. Dépôt remboursé sous 48h.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-900/50 flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#FF006E] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-technical text-white font-medium uppercase tracking-wider">Livraison Prioritaire</h4>
              <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed">
                Expédition garantie pour le début de la saison d'automne 2026.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
