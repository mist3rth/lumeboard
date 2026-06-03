import { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  idSuffix?: string;
}

export const Modal = ({ isOpen, onClose, children, idSuffix = "modal" }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          id={`${idSuffix}-backdrop`}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            className="bg-[#090909] border border-neutral-800/80 rounded-[32px] p-8 max-w-md w-full relative overflow-hidden shadow-2xl"
            id={`${idSuffix}-card`}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-md"
              aria-label="Fermer la modale"
            >
              <X className="w-5 h-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
