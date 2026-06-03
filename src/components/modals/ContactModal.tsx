import { FormEvent, useState } from "react";
import { Mail, Check } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { useModals } from "../../contexts/ModalContext";

export const ContactModal = () => {
  const { contactModalOpen, closeModals } = useModals();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  const submitContactForm = (e: FormEvent) => {
    e.preventDefault();
    if (contactEmail.trim() && contactName.trim()) {
      setContactSuccess(true);
    }
  };

  const handleClose = () => {
    closeModals();
    setTimeout(() => {
      setContactSuccess(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 300);
  };

  return (
    <Modal isOpen={contactModalOpen} onClose={handleClose} idSuffix="contact-modal">
      {!contactSuccess ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#FF006E]">
            <Mail className="w-4 h-4 animate-bounce" />
            <span>Support & Questions</span>
          </div>

          <h3 className="text-3xl font-display uppercase tracking-wider text-white">
            Contacter l’équipe
          </h3>
          
          <p className="text-xs font-light text-neutral-400">
            Une question technique sur nos batteries, nos planches ou pour une demande presse ? Laissez-nous un message, réponse sous 24h.
          </p>

          <form onSubmit={submitContactForm} className="space-y-4">
            <Input 
              label="Nom complet"
              type="text"
              required
              placeholder="Lucas"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              focusColor="pink"
            />

            <Input 
              label="E-mail de contact"
              type="email"
              required
              placeholder="rider@lumeboard.ch"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              focusColor="pink"
            />

            <Textarea
              label="Message"
              required
              rows={3}
              placeholder="Votre question ou demande d'information supplémentaire..."
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              focusColor="pink"
            />

            <Button type="submit" variant="pink">
              Envoyer mon message
            </Button>
          </form>
        </div>
      ) : (
        <div className="text-center py-6 space-y-6">
          <div className="w-14 h-14 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto text-pink-500 border border-pink-500/20">
            <Check className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-display uppercase tracking-wider text-white">
              Message envoyé !
            </h3>
            <p className="text-xs font-light text-neutral-400 leading-relaxed max-w-xs mx-auto">
              Merci <span className="text-white font-medium">{contactName}</span>, notre équipe vous adressera un retour complet à <span className="text-pink-500 font-medium">{contactEmail}</span> dans un délai de 24h.
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
