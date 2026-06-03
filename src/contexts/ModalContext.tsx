import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  preorderModalOpen: boolean;
  contactModalOpen: boolean;
  selectedModel: string;
  selectedPrice: number;
  triggerPreOrder: (modelName?: string, priceVal?: number) => void;
  openContactModal: () => void;
  closeModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [preorderModalOpen, setPreorderModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  const [selectedModel, setSelectedModel] = useState("LUMEBOARD APEX (All-Mountain)");
  const [selectedPrice, setSelectedPrice] = useState(749);

  const triggerPreOrder = (modelName?: string, priceVal?: number) => {
    if (modelName) setSelectedModel(modelName);
    if (priceVal) setSelectedPrice(priceVal);
    setPreorderModalOpen(true);
  };

  const openContactModal = () => setContactModalOpen(true);

  const closeModals = () => {
    setPreorderModalOpen(false);
    setContactModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{
      preorderModalOpen,
      contactModalOpen,
      selectedModel,
      selectedPrice,
      triggerPreOrder,
      openContactModal,
      closeModals
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModals = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
};
