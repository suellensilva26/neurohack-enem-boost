import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface InstallBannerProps {
  onClose?: () => void;
}

const STORAGE_KEY = "install_banner_hidden_until";
const HIDE_DAYS = 7;

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone;
}

export const InstallBanner = ({ onClose }: InstallBannerProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hiddenUntil = localStorage.getItem(STORAGE_KEY);
    const isHidden = hiddenUntil ? Date.now() < Number(hiddenUntil) : false;
    if (!isStandalone() && !isHidden) {
      setVisible(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // iOS (Safari) não dispara o evento; instruir manualmente
      alert("Para instalar: Compartilhar > Adicionar à Tela de Início.");
      return;
    }
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setVisible(false);
    }
  };

  const handleClose = () => {
    const hideUntil = Date.now() + HIDE_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(hideUntil));
    setVisible(false);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 right-4 z-50"
          aria-live="polite"
        >
          <div className="border rounded-xl bg-card shadow-lg p-4 w-[320px]">
            <div className="mb-2">
              <h3 className="font-bold">Instale o app NeuroHack ENEM</h3>
              <p className="text-sm text-muted-foreground">
                Acesso offline, desempenho máximo e experiência premium.
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleInstall} aria-label="Instalar aplicação">
                Instalar App
              </Button>
              <Button variant="outline" onClick={handleClose} aria-label="Fechar banner">
                Fechar
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};