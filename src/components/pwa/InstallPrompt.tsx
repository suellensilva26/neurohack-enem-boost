import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!localStorage.getItem("pwa-installed")) {
        setOpen(true);
      }
    };

    const onAppInstalled = () => {
      localStorage.setItem("pwa-installed", "true");
      setIsInstalled(true);
      setOpen(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      localStorage.setItem("pwa-installed", "true");
      setIsInstalled(true);
    }
    setOpen(false);
  };

  if (isInstalled) return null;

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>📱 Instale o App ENEM 30 Dias</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>Aproveite: acesso offline, notificações e experiência nativa.</p>
          {isIOS ? (
            <div>
              <p>No Safari iOS:</p>
              <ol className="list-decimal ml-5">
                <li>Toque no botão Compartilhar.</li>
                <li>Escolha "Adicionar à Tela de Início".</li>
              </ol>
            </div>
          ) : (
            <Button onClick={handleInstall} className="w-full">Instalar Agora</Button>
          )}
          <Button variant="ghost" className="w-full" onClick={() => setOpen(false)}>Ver depois</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};