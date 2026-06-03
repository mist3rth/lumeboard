import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Cpu, Sparkles } from "lucide-react";

interface RangeProps {
  onPreOrderClick: (modelName: string, price: number) => void;
}

export default function Section07ProductRange({ onPreOrderClick }: RangeProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeModel, setActiveModel] = useState<number | null>(null);

  const boards = [
    {
      id: 0,
      name: "LUMEBOARD SHADOW",
      spec: "Freestyle",
      tag: "Pour les parcs, les modules & street sessions.",
      desc: "Profil twin pur, flex medium tolérant et réactif. Structure renforcée contre les impacts de rails.",
      ledLabel: "Violet & Cyan chrome",
      price: 649,
      colors: ["#8B00FF", "#00F5FF"], // Violet & Cyan
      specs: ["Flex : 5/10", "Profil : Camber-Out", "Carres : Radial Symmetrical"],
      accentGlow: "rgba(139, 0, 255, 0.2)",
      glowColor: "#8B00FF",
      image: "/board_shadow_raw.webp"
    },
    {
      id: 1,
      name: "LUMEBOARD APEX",
      spec: "All-Mountain",
      tag: "Polyvalence totale, du freeride au carving glacé.",
      desc: "Noyau bois ultra-léger renforcé de bandes carbone. Performance maximale sur neige dure.",
      ledLabel: "Blanc pur & Bleu électrique",
      price: 749,
      colors: ["#FFFFFF", "#0066FF"], // Blanc & Bleu
      specs: ["Flex : 7/10", "Profil : Camber classique", "Carres : Dual Progressive"],
      accentGlow: "rgba(0, 102, 255, 0.2)",
      glowColor: "#0066FF",
      image: "/board_apex_raw.webp"
    },
    {
      id: 2,
      name: "LUMEBOARD AURORA",
      spec: "Freeride",
      tag: "Pour la grosse poudreuse et les couloirs raides.",
      desc: "Shape directionnel effilé avec nose rocker prononcé pour flotter naturellement en neige vierge.",
      ledLabel: "Pink magenta & Gold doré",
      price: 849,
      colors: ["#FF006E", "#FFD700"], // Rose & Or
      specs: ["Flex : 8/10", "Profil : Powder Rocker", "Carres : Tapered Back"],
      accentGlow: "rgba(255, 0, 110, 0.2)",
      glowColor: "#FF006E",
      image: "/board_aurora_raw.webp"
    }
  ];

  return (
    <section 
      id="gamme" 
      className="relative min-h-screen w-full bg-[#050505] py-24 px-6 md:px-16 flex flex-col justify-center overflow-hidden"
    >
      {/* 1. Trame technique / Grid de fond ultra-premium (effet blueprint spatial) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03] pointer-events-none z-0" />

      {/* 2. Lueur d'ambiance dynamique qui suit le modèle actif (uniquement si sélectionné) */}
      {activeModel !== null && (
        <div 
          className="absolute w-[500px] h-[500px] rounded-full filter blur-[180px] opacity-10 transition-all duration-1000 ease-out z-0 pointer-events-none"
          style={{
            backgroundColor: boards[activeModel].glowColor,
            left: activeModel === 0 ? "10%" : activeModel === 1 ? "40%" : "75%",
            top: "30%"
          }}
        />
      )}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Title configuration */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-technical tracking-widest text-[#00FF88] uppercase mb-3 block font-semibold">
            SECTION 07 — La gamme
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wide leading-none text-white mb-6">
            Choisissez votre ride.
          </h2>
          <p className="text-neutral-400 text-sm font-light leading-relaxed">
            Trois shapes de snowboard premium moulés à la main aux Alpes, dotés du système chromatique LUMEBOARD intégré sous résine. Garantie 3 ans.
          </p>
        </div>

        {/* 3 model cards lineup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" id="boards-grid-layout">
          {boards.map((board) => {
            const isHovered = hoveredCard === board.id;
            const isSelected = activeModel === board.id;
            
            return (
              <div
                key={board.id}
                onMouseEnter={() => setHoveredCard(board.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setActiveModel(board.id)}
                className={`relative bg-neutral-950/80 border rounded-[32px] p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 cursor-pointer ${
                  isSelected 
                    ? "border-neutral-500 shadow-2xl scale-[1.01]" 
                    : isHovered 
                      ? "border-neutral-700 shadow-xl" 
                      : "border-neutral-900/60"
                }`}
                style={{
                  boxShadow: isSelected 
                    ? `0 25px 60px -20px ${board.accentGlow}` 
                    : isHovered 
                      ? `0 20px 40px -25px ${board.accentGlow}` 
                      : "none"
                }}
                id={`board-card-${board.id}`}
              >
                {/* Visual Snowboard design preview within card */}
                <div className="relative h-[280px] bg-neutral-900/20 rounded-2xl mb-8 flex justify-center items-center overflow-hidden border border-neutral-900/50">
                  
                  {/* Dynamic LED stripes on card edge */}
                  <div 
                    style={{ 
                      backgroundColor: board.colors[0], 
                      boxShadow: isSelected || isHovered ? `0 0 15px 3px ${board.colors[0]}` : "none",
                      opacity: isSelected || isHovered ? 1 : 0.2
                    }}
                    className="absolute left-6 top-[15%] bottom-[15%] w-1 rounded-full transition-all duration-500" 
                  />
                  <div 
                    style={{ 
                      backgroundColor: board.colors[1], 
                      boxShadow: isSelected || isHovered ? `0 0 15px 3px ${board.colors[1]}` : "none",
                      opacity: isSelected || isHovered ? 1 : 0.2
                    }}
                    className="absolute right-6 top-[15%] bottom-[15%] w-1 rounded-full transition-all duration-500" 
                  />

                  {/* Real Snowboard Detouré Image with elegant lévitation and tilt */}
                  <motion.div
                    animate={{ 
                      y: isSelected || isHovered ? [0, -8, 0] : 0, 
                      rotate: isSelected || isHovered ? 5 : 0 
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 w-24 h-56 flex items-center justify-center pointer-events-none select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                  >
                    <img 
                      src={board.image} 
                      alt={board.name} 
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>

                  {/* Tech overlay specifications badge */}
                  <div className="absolute top-4 right-4 bg-neutral-900/90 border border-neutral-800 px-2.5 py-1 rounded-full text-[9px] font-mono text-neutral-400 capitalize flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-[#00FF88]" />
                    <span>{board.spec}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                    <span className="text-[9px] font-mono text-neutral-400">{board.ledLabel}</span>
                  </div>
                </div>

                {/* Model Info block */}
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#00FF88] flex items-center gap-1.5">
                    <span>0{board.id + 1} // MODEL_SERIES</span>
                    {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#00FF88]" />}
                  </span>

                  <h3 className="text-2xl font-technical text-white uppercase tracking-wide">
                    {board.name}
                  </h3>

                  <p className="text-xs text-[#00FF88] font-technical italic font-light">
                    {board.tag}
                  </p>

                  <p className="text-xs font-light text-neutral-400 leading-relaxed min-h-[50px]">
                    {board.desc}
                  </p>

                  {/* Bullet Tech details metrics */}
                  <div className="bg-neutral-900/20 p-4 rounded-2xl border border-neutral-900/50 space-y-2">
                    {board.specs.map((sp, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs font-mono text-neutral-400">
                        <span>{sp.split(" : ")[0]}</span>
                        <span className="text-neutral-200 font-sans">{sp.split(" : ")[1] || sp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Hoverable pre-order CTA */}
                  <div className="pt-6 border-t border-neutral-900/60 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                        tarif ttc
                      </span>
                      <span className="text-2xl font-light text-white font-technical">
                        {board.price}€
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreOrderClick(board.name, board.price);
                      }}
                      className={`p-3.5 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? "bg-[#00FF88] text-black scale-110 shadow-lg shadow-[#00FF88]/20" 
                          : "bg-white text-black hover:bg-[#00FF88] hover:scale-105"
                      }`}
                      title="Précommander"
                      id={`preorderboard-btn-${board.id}`}
                    >
                      <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
