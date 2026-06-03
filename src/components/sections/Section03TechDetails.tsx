import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Sliders, Cpu, Battery, Layers } from "lucide-react";
import { getAssetPath } from "../../utils/assets";

export default function Section03TechDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  // Auto-activation de la première card à l'entrée en vue
  useEffect(() => {
    if (isInView && selectedPoint === null) {
      setSelectedPoint(0);
    }
  }, [isInView]);

  const points = [
    {
      id: 0,
      num: "①",
      title: "Système LED chromatique",
      icon: Layers,
      highlight: "Carres & chants polymères",
      layerColor: "#00F5FF",
      desc: "Des LEDs RGB haute densité sont encapsulées dans une résine technique ultra-résistante, directement moulée dans le chant de la planche. Résistance absolue aux chocs, à l'eau, à la neige. Fonctionne de -30°C à +5°C sans perte d'éclat.",
      metrics: ["Densité: 120 LEDs/m", "Étanchéité: IP68", "Résistance: Resine PU antichoc"]
    },
    {
      id: 1,
      num: "②",
      title: "Fixations-batteries",
      icon: Battery,
      highlight: "Cellules Lithium polymère compactes",
      layerColor: "#FF00AE",
      desc: "Chaque embase de fixation intègre une cellule lithium-ion ultra-plate et amovible. 3h par embase pour un total de 6h d'autonomie. Recharge complète par USB-C étanche en 2 heures. Surpoids imperceptible de seulement 180g.",
      metrics: ["Autonomie: 6 heures", "Poids: +180g", "Type: Connecteur USB-C IP67"]
    },
    {
      id: 2,
      num: "③",
      title: "Application LUMEBOARD",
      icon: Cpu,
      highlight: "Puce de contrôle Bluetooth 5.0",
      layerColor: "#007BFF",
      desc: "Contrôle total depuis votre application iOS & Android. Palette de 16 millions de couleurs. Plusieurs modes d'éclairages : statique, dégradé fluide, stroboscope lent, sensible aux mouvements (via gyroscope autonome) et synchronisation musicale active.",
      metrics: ["Couleurs: 16M possibles", "Portee: Bluetooth v5.0 (12m)", "Modes: Gyroscopique / Rythmique"]
    },
    {
      id: 3,
      num: "④",
      title: "Compatibilité universelle",
      icon: Sliders,
      highlight: "Noyau Bois & Chants ABS",
      layerColor: "#e5e5e5",
      desc: "La technologie lumineuse LUMEBOARD est moulée directement dans le cœur de nos modèles. Disponible sur notre gamme complète, des planches freestyle pures aux shapes freeride. S'adapte à tous les types d'embases de fixations standards du marché.",
      metrics: ["Gamme: Twin-tip, Directionnelles", "Composants: Noyau bois FSC léger", "Standard: Inserts 4x2 et Channel"]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="tech" 
      className="relative min-h-screen w-full bg-black py-24 px-6 md:px-16 flex flex-col justify-center overflow-hidden"
    >
      {/* Background grid matrix lines */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-technical tracking-widest text-[#00F5FF] uppercase mb-3 block font-semibold">
            SECTION 03 — La technologie
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wide leading-none text-white">
            L'ingénierie derrière la lumière.
          </h2>
          <div className="h-[1px] w-32 bg-gradient-to-r from-[#00F5FF]/60 to-transparent mt-6" />
        </div>

        {/* Blueprint & Specs Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="tech-blueprint-layout">
          
          {/* ─── TECH SCANNER VISUAL : board.webp + 4 calques interactifs ─── */}
          <div className="lg:col-span-7 relative rounded-[32px] overflow-hidden min-h-[500px] md:min-h-[620px] flex items-center justify-center"
               style={{ background: "linear-gradient(135deg, #03050a 0%, #060c14 60%, #030508 100%)" }}>

            {/* Scan-lines HUD — fond animé horizontal */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,245,255,0.015) 3px, rgba(0,245,255,0.015) 4px)",
                  animation: "scanlines 8s linear infinite"
                }}
              />
              {/* Vignette bords */}
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)" }} />
            </div>

            {/* Coin badge HUD */}
            <span className="absolute top-5 left-5 text-[9px] font-mono text-cyan-500/50 uppercase tracking-widest z-20 select-none">
              sys.scan_v1.07 // active
            </span>
            <div className="absolute top-5 right-5 flex items-center gap-1.5 z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">telemetry_linked</span>
            </div>

            {/* ── Zone centrale : board + calques SVG ── */}
            <div className="relative w-[160px] sm:w-[200px] h-[460px] sm:h-[540px] z-10">

              {/* Sweep scanner — passe au clic, reset ensuite */}
              {selectedPoint !== null && (
                <motion.div
                  key={`sweep-${selectedPoint}`}
                  initial={{ top: "-10%", opacity: 0.9 }}
                  animate={{ top: "110%", opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeIn" }}
                  className="absolute left-0 right-0 pointer-events-none z-40"
                  style={{
                    height: "60px",
                    background: `linear-gradient(to bottom, transparent, ${points[selectedPoint].layerColor}40, ${points[selectedPoint].layerColor}20, transparent)`,
                    boxShadow: `0 0 30px 10px ${points[selectedPoint].layerColor}25`
                  }}
                />
              )}

              {/* Board image */}
              <img
                src={getAssetPath("/board.webp")}
                alt="LumeBoard coupe technologique"
                className="absolute inset-0 w-full h-full object-contain z-10 transition-all duration-700"
                style={{ filter: `drop-shadow(0 0 40px ${selectedPoint !== null ? points[selectedPoint].layerColor + "60" : "#00f5ff20"})` }}
              />

              {/* ── Calque 1 : LEDs rails (traits le long des bords) ── */}
              <motion.svg
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                viewBox="0 0 100 460"
                preserveAspectRatio="none"
                animate={{ opacity: selectedPoint === 0 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Rail gauche LED — base + dashes */}
                <motion.path
                  d="M 33,28 C 28,50 24,80 25,120 C 26,180 28,280 25,340 C 24,380 28,410 33,430"
                  fill="none" stroke="#00F5FF" strokeWidth="3" strokeLinecap="round"
                  animate={selectedPoint === 0 ? { opacity: [0.6, 1, 0.6], filter: ["drop-shadow(0 0 4px #00F5FF)", "drop-shadow(0 0 10px #00F5FF)", "drop-shadow(0 0 4px #00F5FF)"] } : { opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 33,28 C 28,50 24,80 25,120 C 26,180 28,280 25,340 C 24,380 28,410 33,430"
                  fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity={selectedPoint === 0 ? 0.8 : 0}
                  strokeDasharray="6 4"
                  style={{ transition: "opacity 0.4s" }}
                />
                {/* Rail droit LED — base + dashes */}
                <motion.path
                  d="M 67,28 C 72,50 76,80 75,120 C 74,180 72,280 75,340 C 76,380 72,410 67,430"
                  fill="none" stroke="#00F5FF" strokeWidth="3" strokeLinecap="round"
                  animate={selectedPoint === 0 ? { opacity: [0.6, 1, 0.6], filter: ["drop-shadow(0 0 4px #00F5FF)", "drop-shadow(0 0 10px #00F5FF)", "drop-shadow(0 0 4px #00F5FF)"] } : { opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
                <motion.path
                  d="M 67,28 C 72,50 76,80 75,120 C 74,180 72,280 75,340 C 76,380 72,410 67,430"
                  fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity={selectedPoint === 0 ? 0.8 : 0}
                  strokeDasharray="6 4"
                  style={{ transition: "opacity 0.4s" }}
                />
                {/* Pulse énergie — Rail GAUCHE (Desktop uniquement) */}
                <motion.path
                  d="M 33,28 C 28,50 24,80 25,120 C 26,180 28,280 25,340 C 24,380 28,410 33,430"
                  fill="none" stroke="#00F5FF" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray="30 200"
                  animate={selectedPoint === 0 ? { strokeDashoffset: [230, -230] } : { strokeDashoffset: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  style={{ filter: "drop-shadow(0 0 8px #00F5FF)" }}
                  className="hidden lg:block"
                />
                {/* Pulse énergie — Rail DROIT (Desktop uniquement) */}
                <motion.path
                  d="M 67,28 C 72,50 76,80 75,120 C 74,180 72,280 75,340 C 76,380 72,410 67,430"
                  fill="none" stroke="#00F5FF" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray="30 200"
                  animate={selectedPoint === 0 ? { strokeDashoffset: [-230, 230] } : { strokeDashoffset: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  style={{ filter: "drop-shadow(0 0 8px #00F5FF)" }}
                  className="hidden lg:block"
                />
              </motion.svg>

              {/* ── Calque 2 : Batteries fixations ── */}
              <motion.svg
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                viewBox="0 0 100 460"
                preserveAspectRatio="none"
                animate={{ opacity: selectedPoint === 1 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Fixation haute */}
                <rect x="30" y="100" width="40" height="80" rx="8" fill="rgba(255,0,174,0.15)" stroke="#FF00AE" strokeWidth="1.5" strokeDasharray="4 3" />
                <motion.rect x="30" y="100" width="40" height="80" rx="8" fill="none" stroke="#FF00AE" strokeWidth="2.5"
                  animate={selectedPoint === 1 ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ filter: "drop-shadow(0 0 8px #FF00AE)" }}
                />
                <text x="50" y="148" textAnchor="middle" fill="#FF00AE" fontSize="7" fontFamily="monospace" opacity={selectedPoint === 1 ? 1 : 0}>USB-C</text>
                {/* Fixation basse */}
                <rect x="30" y="280" width="40" height="80" rx="8" fill="rgba(255,0,174,0.15)" stroke="#FF00AE" strokeWidth="1.5" strokeDasharray="4 3" />
                <motion.rect x="30" y="280" width="40" height="80" rx="8" fill="none" stroke="#FF00AE" strokeWidth="2.5"
                  animate={selectedPoint === 1 ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  style={{ filter: "drop-shadow(0 0 8px #FF00AE)" }}
                />
                <text x="50" y="328" textAnchor="middle" fill="#FF00AE" fontSize="7" fontFamily="monospace" opacity={selectedPoint === 1 ? 1 : 0}>3H EACH</text>
              </motion.svg>

              {/* ── Calque 3 : Puce BT ── */}
              <motion.svg
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                viewBox="0 0 100 460"
                preserveAspectRatio="none"
                animate={{ opacity: selectedPoint === 2 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.circle cx="50" cy="230" r="14" fill="rgba(0,123,255,0.2)" stroke="#007BFF" strokeWidth="1.5"
                  animate={selectedPoint === 2 ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ transformOrigin: "50px 230px" }}
                />
                <motion.circle cx="50" cy="230" r="8" fill="rgba(0,123,255,0.4)" stroke="#007BFF" strokeWidth="2"
                  animate={selectedPoint === 2 ? { opacity: [0.7, 1, 0.7] } : { opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ filter: "drop-shadow(0 0 10px #007BFF)" }}
                />
                <motion.circle cx="50" cy="230" r="30" fill="none" stroke="#007BFF" strokeWidth="0.8" strokeDasharray="3 6"
                  animate={selectedPoint === 2 ? { rotate: 360 } : {}}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle cx="50" cy="230" r="40" fill="none" stroke="#007BFF" strokeWidth="0.5" strokeDasharray="2 8"
                  animate={selectedPoint === 2 ? { rotate: -360 } : {}}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <text x="50" y="234" textAnchor="middle" fill="#007BFF" fontSize="5.5" fontFamily="monospace" fontWeight="bold" opacity={selectedPoint === 2 ? 1 : 0}>BT 5.0</text>
              </motion.svg>

              {/* ── Calque 4 : Inserts / Compatibilité ── */}
              <motion.svg
                className="absolute inset-0 w-full h-full z-20 pointer-events-none"
                viewBox="0 0 100 460"
                preserveAspectRatio="none"
                animate={{ opacity: selectedPoint === 3 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {[
                  [38, 105], [50, 105], [62, 105],
                  [38, 355], [50, 355], [62, 355],
                  [36, 120], [64, 120],
                  [36, 340], [64, 340],
                ].map(([cx, cy], i) => (
                  <motion.circle key={i} cx={cx} cy={cy} r="3.5" fill="rgba(255,255,255,0.1)" stroke="#e5e5e5" strokeWidth="1.2"
                    animate={selectedPoint === 3 ? { opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] } : { opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
                    style={{ filter: "drop-shadow(0 0 5px white)" }}
                  />
                ))}
                <text x="50" y="230" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" opacity={selectedPoint === 3 ? 1 : 0}>4x2 / CHANNEL</text>
              </motion.svg>

            </div>

            {/* ── 4 CTA latéraux avec lines leaders ── */}
            {/* Colonne gauche : ① et ③ */}
            <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
              {points.filter(p => p.id === 0 || p.id === 2).map((pt) => {
                const isActive = selectedPoint === pt.id;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPoint(pt.id)}
                    className="group flex items-center gap-2 cursor-pointer"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-all duration-300 ${
                      isActive ? "bg-black border-[#00F5FF] text-[#00F5FF] shadow-[0_0_18px_#00F5FF]" : "bg-black/60 border-neutral-700 text-neutral-500 group-hover:border-neutral-500 group-hover:text-neutral-300"
                    }`}>
                      {pt.num}
                    </div>
                    {/* Leader line */}
                    <motion.div
                      animate={{ width: isActive ? 24 : 8, opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.3 }}
                      className="h-px"
                      style={{ backgroundColor: isActive ? pt.layerColor : "#444" }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Colonne droite : ② et ④ */}
            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
              {points.filter(p => p.id === 1 || p.id === 3).map((pt) => {
                const isActive = selectedPoint === pt.id;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPoint(pt.id)}
                    className="group flex items-center gap-2 cursor-pointer flex-row-reverse"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-all duration-300 ${
                      isActive ? "bg-black border-[#00F5FF] text-[#00F5FF] shadow-[0_0_18px_#00F5FF]" : "bg-black/60 border-neutral-700 text-neutral-500 group-hover:border-neutral-500 group-hover:text-neutral-300"
                    }`}>
                      {pt.num}
                    </div>
                    {/* Leader line */}
                    <motion.div
                      animate={{ width: isActive ? 24 : 8, opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.3 }}
                      className="h-px"
                      style={{ backgroundColor: isActive ? pt.layerColor : "#444" }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Instruction hint */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20">
              <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-600 animate-pulse inline-block" />
                sélectionne un composant pour le scanner
              </span>
            </div>
          </div>

          {/* Interactive Information Specs Reader Block (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Quick bullet dot nav */}
              <div className="flex gap-2">
                {points.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPoint(pt.id)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      selectedPoint === pt.id ? "w-10" : "w-4 bg-neutral-800 hover:bg-neutral-700"
                    }`}
                    style={selectedPoint === pt.id ? { backgroundColor: pt.layerColor } : {}}
                    id={`tech-nav-dot-${pt.id}`}
                    aria-label={`Révéler les détails : ${pt.title}`}
                  />
                ))}
              </div>

              {/* Specs detailed reader panel */}
              <div 
                className="bg-neutral-950 border border-neutral-900 rounded-[32px] p-8 min-h-[300px] flex flex-col justify-between transition-all duration-500"
                id="tech-info-card"
                style={selectedPoint !== null ? { borderColor: `${points[selectedPoint].layerColor}30` } : {}}
              >
                {selectedPoint === null ? (
                  /* État initial — invite à cliquer */
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-10">
                    <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center">
                      <span className="text-neutral-600 text-xl">⊕</span>
                    </div>
                    <p className="text-xs font-mono text-neutral-600 uppercase tracking-widest leading-relaxed">
                      Sélectionne un composant<br />pour révéler les specs techniques
                    </p>
                    <div className="flex gap-3 mt-2">
                      {points.map(pt => (
                        <button key={pt.id} onClick={() => setSelectedPoint(pt.id)}
                          className="w-7 h-7 rounded-full border border-neutral-800 text-neutral-600 text-xs font-mono hover:border-neutral-500 hover:text-neutral-300 transition-all duration-200">
                          {pt.id + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-4" style={{ color: points[selectedPoint].layerColor }}>
                      {(() => {
                        const Icon = points[selectedPoint].icon;
                        return <Icon className="w-5 h-5" />;
                      })()}
                      <span className="text-xs uppercase font-mono tracking-widest">
                        {points[selectedPoint].highlight}
                      </span>
                    </div>

                    <h3 className="text-2xl font-technical text-white uppercase tracking-wide mb-4">
                      {points[selectedPoint].title}
                    </h3>
                    
                    <p className="text-sm font-light text-neutral-400 leading-relaxed font-sans mb-8">
                      {points[selectedPoint].desc}
                    </p>

                    {/* Sub Technical metrics */}
                    <div className="border-t border-neutral-900 pt-6 space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest mb-2 block" style={{ color: points[selectedPoint].layerColor }}>
                        technical_payload.hex
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {points[selectedPoint].metrics.map((met, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                            <span style={{ color: points[selectedPoint].layerColor }}>›</span>
                            <span>{met}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hint action call */}
            <div className="space-y-2 pt-6">
              <p className="text-xs text-neutral-500 font-mono italic">
                *Toutes nos batteries répondent aux certifications de vol internationales (UN38.3) autorisées en bagage cabine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
