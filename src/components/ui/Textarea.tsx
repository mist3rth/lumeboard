interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  focusColor?: "cyan" | "pink";
}

export const Textarea = ({ label, focusColor = "cyan", className = "", ...props }: TextareaProps) => {
  const ringColor = focusColor === "cyan" ? "focus:border-cyan-400 focus:ring-cyan-400/20" : "focus:border-pink-500 focus:ring-pink-500/20";

  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
        {label}
      </label>
      <textarea 
        className={`w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-4 transition-all ${ringColor} ${className}`}
        {...props}
      />
    </div>
  );
};
