import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "cyan" | "pink";
  children: ReactNode;
}

export const Button = ({ variant = "primary", children, className = "", ...props }: ButtonProps) => {
  const baseStyles = "font-semibold text-xs uppercase tracking-wider transition-colors duration-300 transform active:scale-95 cursor-pointer flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#090909]";
  
  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles = "w-full py-4 bg-white text-black hover:bg-neutral-200 rounded-xl";
      break;
    case "cyan":
      variantStyles = "w-full py-4 bg-white hover:bg-[#00F5FF] text-black focus:ring-[#00F5FF] rounded-xl";
      break;
    case "pink":
      variantStyles = "w-full py-4 bg-white hover:bg-[#FF006E] text-black hover:text-white focus:ring-[#FF006E] rounded-xl";
      break;
    case "secondary":
      variantStyles = "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 focus:ring-neutral-500 rounded-full px-6 py-2 w-auto";
      break;
    case "ghost":
      variantStyles = "bg-transparent text-white hover:bg-white/10";
      break;
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};
