import { FormEvent, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { useModals } from "../../contexts/ModalContext";

export const PreorderModal = () => {
  const { preorderModalOpen, closeModals, selectedModel, selectedPrice, triggerPreOrder } = useModals();
  const [emailInput, setEmailInput] = useState("");
  const [preorderSuccess, setPreorderSuccess] = useState(false);

  const submitPreorder = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes("@")) {
      setPreorderSuccess(true);
    }
  };

  const handleClose = () => {
    closeModals();
    setTimeout(() => {
      setPreorderSuccess(false);
      setEmailInput("");
    }, 300);
  };

  return (
    <Modal isOpen={preorderModalOpen} onClose={handleClose} idSuffix="preorder-modal">
      {!preorderSuccess ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#00F5FF]">
            <Sparkles className="w-4 h-4" />
            <span>Lancement officiel 2026</span>
          </div>

          <h3 className="text-3xl font-display uppercase tracking-wider text-white">
            Pré-Commander
          </h3>
          
          <p className="text-xs font-light text-neutral-400">
            Garantissez la production de votre planche pour la saison d'automne. Aucun paiement débité immédiatement. Ajustez vos caractéristiques de taille et flex par e-mail après validation.
          </p>

          <form onSubmit={submitPreorder} className="space-y-4">
            <Select 
              label="Modèle sélectionné"
              value={selectedModel}
              onChange={(e) => {
                const val = e.target.value;
                let price = 749;
                if (val.includes("SHADOW")) price = 649;
                if (val.includes("APEX")) price = 749;
                if (val.includes("AURORA")) price = 849;
                triggerPreOrder(val, price);
              }}
              options={[
                { value: "LUMEBOARD SHADOW (Freestyle)", label: "LUMEBOARD SHADOW — Violet & Cyan (649€)" },
                { value: "LUMEBOARD APEX (All-Mountain)", label: "LUMEBOARD APEX — Blanc & Bleu (749€)" },
                { value: "LUMEBOARD AURORA (Freeride)", label: "LUMEBOARD AURORA — Rose & Or (849€)" }
              ]}
            />

            <Input 
              label="VOTRE ADRESSE E-MAIL"
              type="email"
              required
              placeholder="nom@example.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              focusColor="cyan"
            />

            {/* Price and Deposit specs */}
            <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-900 flex justify-between items-center text-xs">
              <div>
                <span className="text-neutral-500 block">Tarif de la planche :</span>
                <span className="text-white font-medium font-technical">{selectedPrice}€ TTC</span>
              </div>
              <div className="text-right">
                <span className="text-neutral-500 block">Acompte de réservation :</span>
                <span className="text-[#00FF88] font-medium uppercase font-mono">0€ (Remboursable)</span>
              </div>
            </div>

            <Button type="submit" variant="cyan">
              Valider ma précommande
            </Button>
          </form>
        </div>
      ) : (
        <div className="text-center py-6 space-y-6">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/20">
            <Check className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-display uppercase tracking-wider text-white">
              Demande enregistrée
            </h3>
            <p className="text-xs font-light text-neutral-400 leading-relaxed max-w-xs mx-auto">
              Merci pour votre confiance. Un ticket de précommande nominatif pour votre <span className="text-white font-semibold">{selectedModel}</span> a été transmis avec succès à <span className="text-cyan-400 font-medium">{emailInput}</span>.
            </p>
          </div>

          <Button variant="secondary" onClick={handleClose} className="mx-auto block">
            Fermer l'accueil
          </Button>
        </div>
      )}
    </Modal>
  );
};
